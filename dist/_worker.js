const MAX_UPLOAD = 6 * 1024 * 1024;
const AUDIO_TYPES = new Set(['audio/wav', 'audio/mpeg', 'audio/webm', 'audio/mp4', 'audio/ogg']);
const VOICE_SAMPLE_RATE = 24000;

function json(body, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export function coachReady(env) {
  return Boolean((env.MINGLI_DASHSCOPE_API_KEY || env.DASHSCOPE_API_KEY || '').trim());
}

async function complete(env, payload) {
  const workspace = env.MINGLI_DASHSCOPE_WORKSPACE || '';
  if (workspace && !/^[a-z\d-]{3,70}$/.test(workspace)) throw new Error('百炼业务空间 ID 格式有误。');
  const host = workspace ? `${workspace}.cn-beijing.maas.aliyuncs.com` : 'dashscope.aliyuncs.com';
  const key = (env.MINGLI_DASHSCOPE_API_KEY || env.DASHSCOPE_API_KEY).trim();
  const result = await fetch(`https://${host}/compatible-mode/v1/chat/completions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, stream: false }),
    signal: AbortSignal.timeout(55000)
  });
  if (result.status === 401 || result.status === 403) throw new Error('百炼鉴权失败，请核对密钥、接入地域和模型授权。');
  if (result.status === 429) throw new Error('百炼暂时限流或额度不足，请稍后再试。');
  if (!result.ok) throw new Error(`百炼处理失败（${result.status}），请核对模型与录音格式。`);
  return (await result.json()).choices?.[0]?.message?.content;
}

async function readForm(request) {
  const type = request.headers.get('Content-Type') || '';
  if (!type.startsWith('multipart/form-data;') || !request.body) return null;
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > MAX_UPLOAD) { await reader.cancel(); return null; }
      chunks.push(value);
    }
    return await new Response(new Blob(chunks), { headers: { 'Content-Type': type } }).formData();
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

export async function handleCoach(request, env, admit = async () => true) {
  const origin = new URL(request.url).origin;
  if (request.headers.get('Origin') !== origin) return json({ error: '请从本站页面提交。' }, 403);
  if (!coachReady(env)) return json({ error: '语音陪练服务尚未配置。' }, 503);
  const form = await readForm(request);
  const term = form?.get('term');
  const audio = form?.get('audio');
  if (typeof term !== 'string' || !term.trim() || term.length > 60 || !audio?.size || !AUDIO_TYPES.has(audio.type)) {
    return json({ error: '录音格式无效或文件过大。请重新录制。' }, 400);
  }
  if (!(await admit())) return json({ error: '陪练请求较多，请稍后再试。' }, 429);
  try {
    const bytes = new Uint8Array(await audio.arrayBuffer());
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += 16384) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 16384));
    }
    const transcript = await complete(env, {
      model: env.MINGLI_ASR_MODEL || 'qwen3-asr-flash',
      messages: [{ role: 'user', content: [{ type: 'input_audio', input_audio: { data: `data:${audio.type};base64,${btoa(binary)}` } }] }],
      asr_options: { language: 'zh', enable_itn: true }
    });
    if (typeof transcript !== 'string' || transcript.trim().length < 2) {
      return json({ error: '识别到的内容太少。请靠近麦克风再试。' }, 422);
    }
    const excerpt = transcript.trim().slice(0, 4500);
    const reply = await complete(env, {
      model: env.MINGLI_COACH_MODEL || 'qwen3.7-flash',
      enable_thinking: false,
      max_tokens: 850,
      messages: [
        { role: 'system', content: '你是明理·法观的中文语音助手獬豸。录音是用户实际说的话。用户如果提出明确的问题，无论是否与抽取的词条有关，直接用自然、准确的中文回答实际问题。用户如果在做词条口述练习，则针对其原话给出具体表达建议。其他发言按其实际意图回应，意图不清时提出一个简短的澄清问题。抽到的词条只是可选背景，不要把无关问题强行拉回词条。用普通文本自然组织，不采用固定模板或 JSON。不要编造事实、法律条文或来源，确有不确定之处时说明。' },
        { role: 'user', content: JSON.stringify({ practiceTerm: term, spokenWords: excerpt }) }
      ]
    });
    if (typeof reply !== 'string' || !reply.trim()) throw new Error('模型没有返回回复，请稍后重试。');
    return json({ transcript: excerpt, reply: reply.trim().slice(0, 2800) });
  } catch (error) {
    const message = error.name === 'TimeoutError' ? '模型处理超时，请稍后再试。' : error instanceof TypeError ? '暂时无法连接百炼。' : error.message;
    return json({ error: message }, 502);
  }
}

function dylanWave(chunks, size) {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  for (const [offset, word] of [[0, 'RIFF'], [8, 'WAVEfmt '], [36, 'data']]) {
    for (let i = 0; i < word.length; i++) view.setUint8(offset + i, word.charCodeAt(i));
  }
  view.setUint32(4, size + 36, true);
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, VOICE_SAMPLE_RATE, true);
  view.setUint32(28, VOICE_SAMPLE_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  view.setUint32(40, size, true);
  return new Response(new Blob([header, ...chunks]), {
    headers: { 'Content-Type': 'audio/wav', 'Cache-Control': 'no-store' }
  });
}

async function synthesizeDylan(text, env) {
  const key = (env.MINGLI_DASHSCOPE_API_KEY || env.DASHSCOPE_API_KEY).trim();
  const response = await fetch('https://dashscope.aliyuncs.com/api-ws/v1/realtime?model=qwen3-tts-flash-realtime', {
    headers: { Upgrade: 'websocket', Authorization: 'Bearer ' + key },
    signal: AbortSignal.timeout(10000)
  });
  const socket = response.webSocket;
  if (!socket) throw new Error('Voice connection failed: ' + response.status);
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let finished = false;
    const send = (type, fields = {}) => socket.send(JSON.stringify({ event_id: crypto.randomUUID(), type, ...fields }));
    function settle(error) {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      if (socket.readyState === 1) socket.close(1000);
      if (error || !size) reject(error || new Error('Empty voice response'));
      else resolve(dylanWave(chunks, size));
    }
    const timeout = setTimeout(() => settle(new Error('Voice timeout')), 45000);
    socket.addEventListener('error', () => settle(new Error('Voice connection interrupted')));
    socket.addEventListener('close', () => settle(new Error('Voice connection closed')));
    socket.addEventListener('message', event => {
      try {
        const packet = JSON.parse(event.data);
        if (packet.type === 'session.created') {
          send('session.update', {
            session: { voice: 'Dylan', mode: 'commit', language_type: 'Chinese', response_format: 'pcm', sample_rate: VOICE_SAMPLE_RATE }
          });
        } else if (packet.type === 'session.updated') {
          send('input_text_buffer.append', { text });
          send('input_text_buffer.commit');
        } else if (packet.type === 'response.audio.delta') {
          const chunk = Uint8Array.from(atob(packet.delta), character => character.charCodeAt(0));
          size += chunk.length;
          if (size > 12 * 1024 * 1024) settle(new Error('Voice output too large'));
          else chunks.push(chunk);
        } else if (packet.type === 'session.finished') {
          settle();
        } else if (packet.type === 'error' || packet.response?.status === 'failed') {
          settle(new Error('Voice synthesis rejected: ' + (packet.error?.code || packet.response?.status_details?.error?.code || packet.type)));
        } else if (packet.type === 'response.done') {
          send('session.finish');
        }
      } catch (error) {
        settle(error);
      }
    });
    socket.accept();
  });
}

async function handleVoice(request, env) {
  if (request.headers.get('Origin') !== new URL(request.url).origin) return json({ error: '请从本站页面提交。' }, 403);
  if (!coachReady(env)) return json({ error: '云端朗读尚未配置。' }, 503);
  const length = Number(request.headers.get('Content-Length'));
  if (!Number.isInteger(length) || length < 1 || length > 14000) return json({ error: '朗读文本过长或为空。' }, 400);
  const payload = await request.json().catch(() => null);
  const text = typeof payload?.text === 'string' ? payload.text.trim() : '';
  if (!text || text.length > 3200) return json({ error: '朗读文本过长或为空。' }, 400);
  if (!(await admitCloudRequest(request, 'voice', 15000))) return json({ error: '朗读请求较多，稍后可以重试。' }, 429);
  try {
    return await synthesizeDylan(text, env);
  } catch (error) {
    console.warn('Dylan TTS:', error.message);
    return json({ error: '晓东音色暂时无法播放，可以重试或切换系统音色。' }, 502);
  }
}

async function admitCloudRequest(request, channel = 'coach', duration = 60000) {
  const ip = request.headers.get('CF-Connecting-IP');
  if (!ip || !globalThis.caches?.default) return false;
  const window = Math.floor(Date.now() / duration);
  const key = new Request(`${new URL(request.url).origin}/.coach-rate/${channel}/${window}/${encodeURIComponent(ip)}`);
  const cache = caches.default;
  if (await cache.match(key)) return false;
  await cache.put(key, new Response('1', { headers: { 'Cache-Control': 'public, max-age=' + duration / 1000 } }));
  return true;
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/coach/status' && request.method === 'GET') return json({ ready: coachReady(env) });
    if (pathname === '/api/coach' && request.method === 'POST') return handleCoach(request, env, () => admitCloudRequest(request));
    if (pathname === '/api/coach/voice' && request.method === 'POST') return handleVoice(request, env);
    if (pathname.startsWith('/api/') || pathname.startsWith('/_worker.js') || pathname.startsWith('/.coach-rate/')) return json({ error: '找不到页面。' }, 404);
    return env.ASSETS.fetch(request);
  }
};
