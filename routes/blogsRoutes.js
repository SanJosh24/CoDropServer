// routes/auth-routes.js

const express = require('express');
const blogsRoutes = express.Router();
const mongoose = require('mongoose');

// require the user model & blog model !!!!
const user = require('../models/user');
const blog = require('../models/blogs');

// GET route => to get all the blogs created by users

blogsRoutes.get('/blogs', (req, res, next) => {
	var tempArray = [];
	blog.find()
		.then((blogs) => {
			blogs.forEach((oneBlog) => {
				if (oneBlog.public === true) {
					tempArray.push(oneBlog);
				}
			});
			res.json({ tempArray });
		})
		.catch((err) => {
			res.json(err);
		});
});

// GET route => to get a specific blog/detailed view

blogsRoutes.get('/blogs/:id', (req, res, next) => {
	blog
		.findById(req.params.id)
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

// POST route => to get a like on a blog

blogsRoutes.post('/blogs/:id', (req, res, next) => {
	blog
		.findById(req.params.id)
		.then((theblog) => {
			if (theblog.likes.includes(req.user.username)) {
				// see if any of them are equal to req.user.username
				theblog.likes.pull(req.user.username); // if there is one pull from array
			} else {
				theblog.likes.push(req.user.username); // if not push to likes array
			}
			theblog
				.save() // theblog.save .then
				.then((res) => {
					res.json(res);
				})
				.catch((err) => {
					res.json(err);
				});
		})
		.catch((err) => {
			res.json(err);
		});
});

// PUT route => to update a specific blog

blogsRoutes.put('/blogs/:id', (req, res, next) => {
	blog
		.findByIdAndUpdate(req.params.id, req.body)
		.then(() => {
			res.json({ message: `blog with ${req.params.id} is updated successfully.` });
		})
		.catch((err) => {
			res.json(err);
		});
});

// DELETE route => to delete a specific blog

blogsRoutes.delete('/blogs/:id', (req, res, next) => {
	blog
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.json({ message: `blog with ${req.params.id} is removed successfully.` });
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = blogsRoutes;
