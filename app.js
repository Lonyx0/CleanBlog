const express = require('express');
require ('dotenv').config();

const connectDB = require('./config/db');
const ejs = require('ejs');

const app = express();
connectDB();
app.set('view engine', 'ejs');
const Post = require('./models/Post');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    const posts = await Post.find({});
    res.render('index', {
        posts
    });
});

app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {
        post
    });
})

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add_post', (req, res) => {
    res.render('add_post');
});

app.post('/posts', async (req, res) => {
    await Post.create(req.body);
    res.redirect('/');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});