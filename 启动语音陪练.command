#!/bin/zsh
cd -- "${0:A:h}" || exit 1
node_bin=$(command -v node)
if [[ -z "$node_bin" ]]; then
  node_bin="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
fi
if [[ ! -x "$node_bin" ]]; then
  print '未找到 Node.js。请安装 Node.js 22 或更新版本后再试。'
  exit 1
fi
print '请使用阿里云百炼北京地域的按量 API 密钥。输入内容不会显示，也不会写入文件。'
read -rs 'MINGLI_DASHSCOPE_API_KEY?密钥（直接回车可进入演示模式）：'
print
if [[ -n "$MINGLI_DASHSCOPE_API_KEY" ]]; then
  read -r 'MINGLI_DASHSCOPE_WORKSPACE?北京地域业务空间 ID（使用通用接入地址可直接回车）：'
fi
export MINGLI_DASHSCOPE_API_KEY MINGLI_DASHSCOPE_WORKSPACE
export MINGLI_PORT=4188
print '启动后请在 Chrome 打开 http://127.0.0.1:4188/#xiezhi'
exec "$node_bin" server.mjs
