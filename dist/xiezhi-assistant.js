let coachSession = null;
let coachMuted = true;

function xiezhiAssistantMarkup() {
  return `<aside class="xiezhi-coach" data-xiezhi-coach>
    <button class="coach-mobile-open" type="button" data-coach-open>请獬豸帮忙 <span>语音陪练 ↗</span></button>
    <div class="coach-body" role="region" aria-label="獬豸语音陪练">
      <header><div><p class="training-kicker">先自己想，再一起改</p><h2>请獬豸帮忙</h2></div><div class="coach-header-actions"><button type="button" data-coach-mute aria-pressed="${coachMuted}">${coachMuted ? '已静音' : '朗读开启'}</button><button type="button" data-coach-close aria-label="关闭语音陪练">×</button></div></header>
      <div class="coach-scroll"><p class="coach-intro">查阅后，试着用自己的话讲清词义。也可以直接说出其他问题，獬豸会按你实际说的内容回应。</p>
        <div class="coach-output" data-coach-output hidden></div>
        <div class="coach-empty" data-coach-empty><span aria-hidden="true">言</span><b>思考由你开始</b><p>说出你的理解、一个例子，<br>以及它为什么与你有关。</p></div>
      </div>
      <footer class="coach-footer"><p class="coach-status" aria-live="polite" data-coach-status>抽取一个词条，完成查阅后开启。</p><button class="training-button" type="button" data-coach-start disabled>请獬豸帮忙 · 录音 3 分钟</button><button type="button" class="coach-example-link" data-coach-example>查看演示反馈</button><small>点击录音即请求麦克风权限；录音将发送至百炼转写并生成点评。默认静音，可手动朗读。</small></footer>
    </div><dialog class="coach-dialog" aria-label="獬豸语音陪练"></dialog>
  </aside>`;
}

function syncXiezhiAssistant() {
  const section = document.querySelector('[data-xiezhi-coach]');
  if (!section) return;
  const ready = ['ready', 'done'].includes(state.xiezhi.phase);
  section.querySelector('[data-coach-start]').disabled = !ready || Boolean(coachSession) || Boolean(xiezhiShuffle);
  section.querySelector('[data-coach-example]').disabled = Boolean(coachSession);
  const newTerm = section.dataset.term !== state.xiezhi.term;
  if (newTerm) {
    section.dataset.term = state.xiezhi.term;
    section.querySelector('[data-coach-output]').hidden = true;
    section.querySelector('[data-coach-empty]').hidden = false;
    section.querySelector('[data-coach-status]').textContent = state.xiezhi.term ? '先完成资料查阅，再开始三分钟口述。' : '抽取一个词条，完成查阅后开启。';
    section.querySelector('.coach-scroll').scrollTop = 0;
  } else if (!coachSession && ready && !section.querySelector('[data-coach-status]').textContent) {
    coachStatus('准备好了。开启录音，讲出你自己的理解。');
  }
}

function coachStatus(message) {
  const status = document.querySelector('[data-coach-status]');
  if (status) status.textContent = message;
}

function releaseCoachMedia(session) {
  session.stream?.getTracks().forEach(track => track.stop());
  session.stream = null;
  clearTimeout(session.cutoff);
}

function cancelXiezhiAssistant() {
  const session = coachSession;
  coachSession = null;
  if (session) {
    session.controller.abort();
    if (session.recorder?.state !== 'inactive') session.recorder?.stop();
    releaseCoachMedia(session);
    syncXiezhiAssistant();
  }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

async function startXiezhiAssistant() {
  if (coachSession || !['ready', 'done'].includes(state.xiezhi.phase)) return;
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder || location.protocol === 'file:') {
    coachStatus('请通过本地预览网址用支持麦克风的浏览器打开，也可以先查看演示反馈。');
    return;
  }
  const session = { controller: new AbortController(), term: state.xiezhi.term, chunks: [] };
  coachSession = session;
  syncXiezhiAssistant();
  coachStatus('正在检查陪练服务…');
  try {
    const response = await fetch('/api/coach/status', { signal: session.controller.signal, cache: 'no-store' });
    const { ready } = response.ok ? await response.json() : {};
    if (!ready) throw new Error('语音陪练服务尚未配置。你可以先查看演示反馈。');
    coachStatus('请允许浏览器使用麦克风。');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1 }, video: false });
    if (coachSession !== session) {
      stream.getTracks().forEach(track => track.stop());
      return;
    }
    session.stream = stream;
    const type = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus'].find(item => MediaRecorder.isTypeSupported(item));
    const recorder = new MediaRecorder(stream, { ...(type ? { mimeType: type } : {}), audioBitsPerSecond: 64000 });
    session.recorder = recorder;
    recorder.addEventListener('dataavailable', event => { if (event.data.size) session.chunks.push(event.data); });
    recorder.addEventListener('stop', () => submitXiezhiRecording(session), { once: true });
    recorder.addEventListener('error', () => {
      if (coachSession !== session) return;
      cancelXiezhiAssistant();
      finishXiezhiSpeaking();
      coachStatus('录音中断。请检查麦克风后再试。');
    }, { once: true });
    recorder.start(1000);
    session.cutoff = setTimeout(() => {
      if (coachSession === session) finishXiezhiSpeaking();
    }, 180000);
    state.xiezhi.phase = 'speaking';
    state.xiezhi.remaining = 180;
    runXiezhiTimer();
    updateXiezhiPanel();
    coachStatus('录音中。三分钟到时自动停止，也可提前结束。');
  } catch (error) {
    if (coachSession !== session) return;
    cancelXiezhiAssistant();
    coachStatus(error.name === 'NotAllowedError' ? '麦克风未获授权。请在浏览器设置里检查权限。' : error.message);
  }
}

function finishXiezhiSpeaking() {
  stopXiezhiTimer();
  state.xiezhi.phase = 'done';
  state.xiezhi.remaining = 0;
  const session = coachSession;
  if (session?.recorder?.state === 'recording') {
    session.recorder.stop();
    releaseCoachMedia(session);
  }
  updateXiezhiPanel();
}

async function prepareCoachAudio(blob) {
  const audioContext = new AudioContext();
  try {
    const decoded = await audioContext.decodeAudioData(await blob.arrayBuffer());
    const sampleRate = 16000;
    const frames = Math.max(1, Math.ceil(Math.min(decoded.duration, 180) * sampleRate));
    const offline = new OfflineAudioContext(1, frames, sampleRate);
    const source = offline.createBufferSource();
    source.buffer = decoded;
    source.connect(offline.destination);
    source.start();
    const samples = (await offline.startRendering()).getChannelData(0);
    const buffer = new ArrayBuffer(44 + frames * 2);
    const view = new DataView(buffer);
    const writeText = (offset, text) => {
      for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
    };
    writeText(0, 'RIFF');
    view.setUint32(4, buffer.byteLength - 8, true);
    writeText(8, 'WAVE');
    writeText(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeText(36, 'data');
    view.setUint32(40, frames * 2, true);
    for (let i = 0; i < frames; i++) {
      view.setInt16(44 + i * 2, Math.max(-1, Math.min(1, samples[i])) * 32767, true);
    }
    return new Blob([buffer], { type: 'audio/wav' });
  } finally {
    await audioContext.close();
  }
}

async function submitXiezhiRecording(session) {
  releaseCoachMedia(session);
  if (coachSession !== session) return;
  const blob = new Blob(session.chunks, { type: session.recorder.mimeType.split(';')[0] });
  session.chunks = [];
  if (!blob.size) {
    coachSession = null;
    syncXiezhiAssistant();
    coachStatus('没有录到声音，可以重新录制。');
    return;
  }
  coachStatus('正在转写录音并生成回复…');
  try {
    const audio = await prepareCoachAudio(blob);
    if (coachSession !== session) return;
    const form = new FormData();
    form.append('audio', audio, 'practice.wav');
    form.append('term', session.term);
    const response = await fetch('/api/coach', { method: 'POST', body: form, signal: session.controller.signal });
    const result = await response.json();
    if (coachSession !== session) return;
    if (!response.ok) throw new Error(result.error || '点评暂时不可用。');
    showXiezhiFeedback(result, false);
    coachStatus('本次口述已完成。');
  } catch (error) {
    if (coachSession === session) coachStatus(error.message);
  } finally {
    if (coachSession === session) {
      coachSession = null;
      syncXiezhiAssistant();
    }
  }
}

function speakCoachFeedback(output) {
  if (!('speechSynthesis' in window) || coachMuted || !output) return;
  speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(output.dataset.speech);
  speech.lang = 'zh-CN';
  const voice = speechSynthesis.getVoices().find(item => item.localService && /^zh(?:[-_]|$)/i.test(item.lang));
  if (!voice) {
    coachStatus('当前浏览器没有可用的本机中文语音，可以阅读文字反馈。');
    return;
  }
  speech.voice = voice;
  speech.rate = 0.95;
  speechSynthesis.speak(speech);
}

function showXiezhiFeedback(result, example) {
  const output = document.querySelector('[data-coach-output]');
  if (!output) return;
  output.hidden = false;
  document.querySelector('[data-coach-empty]').hidden = true;
  document.querySelector('.coach-scroll').scrollTop = 0;
  const fields = result.reply
    ? [['獬豸回复', result.reply]]
    : [['术语与用词', result.wording], ['表达结构', result.structure], ['下一轮怎么练', result.nextStep]];
  output.dataset.speech = result.reply || fields.map(([name, copy]) => name + '。' + copy).join('。');
  output.innerHTML = `<p class="training-kicker">${example ? '演示样例 · 编辑预设' : '獬豸反馈 · AI 生成'}</p><details><summary>查看${example ? '样例' : '语音'}转写</summary><p>${esc(result.transcript)}</p></details><div class="coach-feedback-grid">${fields.map(([name, copy]) => `<div><b>${name}</b><p class="coach-reply-text">${esc(copy)}</p></div>`).join('')}</div><button class="training-secondary" type="button" data-coach-play>朗读回复</button>`;
  speakCoachFeedback(output);
}

document.addEventListener('click', event => {
  const section = event.target.closest('[data-xiezhi-coach]');
  if (!section) return;
  if (event.target.closest('[data-coach-open]')) { const dialog=section.querySelector('.coach-dialog'); dialog.append(section.querySelector('.coach-body')); section.classList.add('coach-open'); dialog.onclose=()=>{section.append(dialog.querySelector('.coach-body'));section.classList.remove('coach-open');}; dialog.showModal(); return; }
  if (event.target.closest('[data-coach-close]')) { section.querySelector('.coach-dialog').close(); return; }
  if (event.target.closest('[data-coach-start]')) startXiezhiAssistant();
  if (event.target.closest('[data-coach-example]')) {
    coachStatus('展示预设样例。');
    showXiezhiFeedback({
      transcript: '我理解一刻钟便民生活圈，就是社区附近有超市，十五分钟能买到东西。',
      wording: '你说了“十五分钟能买到东西”。试着交代这里的十五分钟是步行尺度，并补充日常服务和社区场景。',
      structure: '先用一句话定义，再举一个社区居民能走到的服务例子，最后说明还有谁的需求容易被漏掉。',
      nextStep: '试着重新讲一分钟。保留一个具体例子，再问自己：对行动不便的人，这个距离仍然方便吗？'
    }, true);
  }
  if (event.target.closest('[data-coach-mute], [data-coach-play]')) {
    coachMuted = event.target.closest('[data-coach-play]') ? false : !coachMuted;
    const button = section.querySelector('[data-coach-mute]');
    button.textContent = coachMuted ? '已静音' : '朗读开启';
    button.setAttribute('aria-pressed', String(coachMuted));
    if (coachMuted && 'speechSynthesis' in window) speechSynthesis.cancel();
    const output = section.querySelector('[data-coach-output]');
    if (!output.hidden) speakCoachFeedback(output);
  }
});

window.addEventListener('pagehide', cancelXiezhiAssistant);

document.addEventListener('keydown', event => { if (event.key === 'Escape') document.querySelector('.coach-dialog[open]')?.close(); });
