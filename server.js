const express = require('express');
const PORT = 4000;
const path = require('path');
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const productsRouter = require('./routes/products.router');
const { default : mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static',express.static(path.join(__dirname, 'public')))

app.use(express.json());

mongoose.connect(`mongodb+srv://000110altjd:chldkssk12!@express-cluster.koayg.mongodb.net/?retryWrites=true&w=majority&appName=express-cluster`)
.then(() => console.log('mongodb connected'))
.catch(err => console.log(err))

app.use((req,res,next)=> {
    const start = Date.now();
    console.log(`start : ${req.method} ${req.url}`);
    next();

    const diffTime = Date.now() - start;
    console.log(`end : ${req.method} ${req.baseUrl} ${req.url} ${diffTime}ms`)
})

app.get('/', (req,res,next) => {
    setImmediate(() => { next(new Error('It is an error')) }) 
    // res.render('index', {
    //     imageTitle: "It is a Kiwi2"
    // })
})

app.use((error, req, res, next) => {
    res.json({message : error.message});
})

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/products', productsRouter)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})