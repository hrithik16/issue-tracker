console.log('Hola')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jarvis:dBa7jXhQsW9KDZcm@cluster1.s081pi1.mongodb.net/').then(() => console.log('Connected!'));

const db = mongoose.connection