import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';
import { coachReady, handleCoach } from './dist/_worker.js';

const root = fileURLToPath(new URL('./dist/', import.meta.url));
const port = Number(process.env.MINGLI_PORT || 4187);
const origin = 'http://127.0.0.1:' + port;
const mimeTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.m4a': 'audio/mp4' };
let active = false;
let requests = 0;

function json(response, status, data) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(data));
}

async function coach(request, response) {
  if (active) return json(response, 429, { error: '已有练习正在处理。' });
  active = true;
  try {
    const input = new Request(new URL(request.url, origin), {
      method: 'POST', headers: request.headers, body: Readable.toWeb(request), duplex: 'half'
    });
    const result = await handleCoach(input, process.env, async () => {
      if (requests >= 20) return false;
      requests++;
      return true;
    });
    json(response, result.status, await result.json());
  } finally {
    active = false;
  }
}

const server = createServer(async (request, response) => {
  if (request.headers.host !== '127.0.0.1:' + port) return json(response, 403, { error: '仅供本机预览。' });
  try {
    const path = decodeURIComponent(new URL(request.url, origin).pathname);
    if (path === '/api/coach/status' && request.method === 'GET') return json(response, 200, { ready: coachReady(process.env) });
    if (path === '/api/coach' && request.method === 'POST') return await coach(request, response);
    if (path.startsWith('/_worker.js') || path.startsWith('/api/')) return json(response, 404, { error: '找不到页面。' });
    if (!['GET', 'HEAD'].includes(request.method)) return json(response, 405, { error: '请求方式无效。' });
    const file = resolve(root, '.' + (path === '/' ? '/index.html' : path));
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep) || !mimeTypes[extname(file)]) {
      return json(response, 404, { error: '找不到页面。' });
    }
    const content = await readFile(file);
    response.writeHead(200, { 'Content-Type': mimeTypes[extname(file)], 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch {
    if (!response.headersSent) json(response, 404, { error: '找不到页面。' });
  }
});
server.listen(port, '127.0.0.1', () => {
  console.log('明理·法观本地样板 ' + origin + '/');
  console.log(coachReady(process.env) ? '已配置百炼密钥。开始录音后才会调用模型。' : '演示模式。真实口述点评需要配置百炼密钥。');
});
