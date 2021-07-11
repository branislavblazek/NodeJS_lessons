const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('blogs/index', {
                title: 'All blogs',
                blogs: result,
            })
        })
        .catch(err => {
            console.log(err);
        });
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            if (!result) throw new Error('problem');
            res.render('blogs/details', { title: 'blog Details', blog: result });
        })
        .catch(err => {
            res.status(404).render('404', { title: 'Blog not found' });
        });
};

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });
};

const blog_create_post = (req, res) => {
    const newBlog = new Blog(req.body);

    newBlog.save()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
};

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({
                redirect: '/',
            });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
};