import express from 'express';
//const express=require('express');
import morgan from 'morgan';
//const morgan=require('morgan');
import cors from 'cors';
//const cors=require('cors');
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';

//Conexión a la base de datos MongoDB
mongoose.Promise=global.Promise;
const dbUrl = 'mongodb+srv://root:shinobu2019@delucious-iwnqb.mongodb.net/delucious?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser: true})
.then(mongoose => console.log('Conectado a la BD en el puerto 27017'))
.catch(err => console.log(err));


const app=express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/', (req, res) => {
    res.status(200).json({ name: 'hello b-sokoban' })
})

app.use('/api',router);
app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
    console.log('server on port ' + app.get('port'));
}); 