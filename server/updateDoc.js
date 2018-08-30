var mongo = require('./mongo')

function updateDoc (subject) {
  return new Promise((resolve, reject) => {
    (async () => {
      const client = await mongo.MongoClient.connect(mongo.connectionString, { useNewUrlParser: true })
      const dbo = client.db('todos')
      try {
        await dbo.collection('todo').updateOne({ id: Number(subject.id) }, { $set: { 'todo': subject.todo } })
        dbo.collection('todo').find({}).toArray(function (err, result) {
          if (err) throw new Error('更新失败')
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

module.exports = updateDoc
