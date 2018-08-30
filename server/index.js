const Koa = require('koa')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const doneDoc = require('./doneDoc')
const insertDoc = require('./insertDoc')
const removeDoc = require('./removeDoc')
const getDoc = require('./getDoc')
const updateDoc = require('./updateDoc')
const app = new Koa()

app.use(cors())
app.use(koaBody())

function handle (func, params) {
  return new Promise((resolve, reject) => {
    func(params).then(res => {
      resolve({
        data: res,
        code: 200
      })
    }).catch(res => {
      var except = {
        data: res,
        code: 400
      }
      reject(except)
    })
  })
}

app.use(async (ctx, next) => {
  await next()
  let result
  if (ctx.url === '/add') {
    result = await handle(insertDoc, ctx.request.body)
  } else if (ctx.url === '/remove') {
    result = await handle(removeDoc, ctx.request.body)
  } else if (ctx.url === '/get') {
    result = await handle(getDoc, ctx.request.body)
  } else if (ctx.url === '/update') {
    result = await handle(updateDoc, ctx.request.body)
  } else if (ctx.url === '/done') {
    result = await handle(doneDoc, ctx.request.body)
  }
  ctx.body = JSON.stringify(result)
})

app.listen(8081)
