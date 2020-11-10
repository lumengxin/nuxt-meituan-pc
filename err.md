## server
### 1.Error: Request failed with status code 400
      at createError (D:\Home\projects\nuxt-meituan-pc\node_modules\axios\lib\core\createError.js:16:15)
      at settle (D:\Home\projects\nuxt-meituan-pc\node_modules\axios\lib\core\settle.js:17:12)
      at IncomingMessage.handleStreamEnd (D:\Home\projects\nuxt-meituan-pc\node_modules\axios\lib\adapters\http.js:244:11)
      at IncomingMessage.emit (events.js:215:7)
      at IncomingMessage.EventEmitter.emit (domain.js:475:20)
      at endReadableNT (_stream_readable.js:1184:12)
      at processTicksAndRejections (internal/process/task_queues.js:80:21)

数据库创建成功。

`请求到服务器了，但是出现解析数据的时候出现问题。`

**解决：**
log排查到登录接口语法书写错误
```
} else {
      if (user) {
```

**node端接口调试**：
 - 浏览器node调试：起服务命令加上 --inspect
 - vscode调试，配置launch.json