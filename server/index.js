const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/users');
const quizRoutes = require('./routes/quizzes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 80;

// middleware

app.use(cors());
app.use(bodyParser.urlencoded({extended: true, limit: '20mb'}));
app.use(bodyParser.json({limit: '20mb'}));

app.use('/api/users', userRoute);
app.use('/api/quizzes', quizRoutes);

mongoose.connect(process.env.DB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log('Database connected'))
.catch(er=> console.log('Error connecting database'));

app.listen(PORT, () =>{
    console.log('server running on port:' + PORT);
});