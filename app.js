import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json()); // For parsing JSON data
app.use(express.static(path.join(path.dirname(''), 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(path.dirname(''), 'views'));

// In-memory store for blog posts
let posts = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const { index } = req.body;
    posts.splice(index, 1);
    res.redirect('/');
});

app.post('/update', (req, res) => {
    const { index, title, content } = req.body;
    posts[index] = { title, content };
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
