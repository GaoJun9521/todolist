var mongo = require('./mongo')

function removeDoc (subject) {
  return new Promise((resolve, reject) => {
    (async () => {
      const client = await mongo.MongoClient.connect(mongo.connectionString, { useNewUrlParser: true })
      const dbo = client.db('todos')
      try {
        await dbo.collection('todo').deleteOne({ 'id': Number(subject.id) })
        dbo.collection('todo').find({}).toArray(function (err, result) {
          if (err) throw new Error('删除失败')
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

module.exports = removeDoc
