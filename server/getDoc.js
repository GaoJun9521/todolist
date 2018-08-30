var mongo = require('./mongo')

function getDoc (subject) {
  return new Promise((resolve, reject) => {
    (async () => {
      const client = await mongo.MongoClient.connect(mongo.connectionString, { useNewUrlParser: true })
      const dbo = client.db('todos')
      try {
        dbo.collection('todo').find({}).toArray(function (err, result) {
          if (err) throw new Error('获取失败')
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

module.exports = getDoc
