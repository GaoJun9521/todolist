var mongo = require('./mongo')

function doneDoc (subject) {
  return new Promise((resolve, reject) => {
    (async () => {
      const client = await mongo.MongoClient.connect(mongo.connectionString, { useNewUrlParser: true })
      const dbo = client.db('todos')
      try {
        var finish = Date.now() - subject.id
        await dbo.collection('todo').updateOne({ id: Number(subject.id) }, { $set: { 'done': true } })
        await dbo.collection('todo').updateOne({ id: Number(subject.id) }, { $set: { 'finish': finish } })
        dbo.collection('todo').find({}).toArray(function (err, result) {
          if (err) throw new Error('完成失败')
          resolve(result)
        })
      } catch (err) {
        var except = {
          data: err,
          code: 400
        }
        reject(except)
      } finally {
        client.close()
      }
    })().catch(err => console.error(err))
  })
}

module.exports = doneDoc
