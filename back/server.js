const app = require('./index')

app.listen(process.env.SERVER_PORT || 3001, (err) => {
    if (err) throw err
    console.log(`Server is running on http://127.0.0.1:3001`)
})