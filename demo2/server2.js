const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./template.html', 'utf-8')
})
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `
    <div>
      <div>访问的 URL 是： {{ url }}</div>
      <h1>hello world</h1>
    </div>
   `
  })
  const context = {
    title: 'hello',
    meta: `
      <meta ...>
      <meta ...>
    `
  }

  renderer.renderToString(app, context,(err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})
server.listen(8080);
