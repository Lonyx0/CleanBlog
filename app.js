const express = require('express');
const methodOverride = require('method-override');

const pageController = require('./controllers/pageController');
const postController = require('./controllers/postController');
require ('dotenv').config();

const connectDB = require('./config/db');
const ejs = require('ejs');

const app = express();
connectDB();
app.set('view engine', 'ejs');
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.delete('/posts/:id', postController.deletePost);
app.put('/posts/:id', postController.updatePost);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPostPage);
app.get('/posts/edit/:id', pageController.getEditPostPage);





const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});