// routes/auth-routes.js

const express = require('express');
const profileRoutes = express.Router();
const mongoose = require('mongoose');

// require the user model & blog model !!!!

const user = require('../models/user');
const Blog = require('../models/blogs');

// GET route => to get user information

profileRoutes.get('/profile/:id', (req, res, next) => {
	user
		.findById(req.user._id)
		.then((user) => {
			res.json(user);
		})
		.catch(next);
});

// // GET route => to get all the blogs created by user & blogs of the users that are on current profile's favorites

profileRoutes.get('/profile/:id/blogs', (req, res, next) => {
	const tempArray = [];
	user
	.findById(req.params.id).populate({
		path: 'favoriteUsers', 
		populate: {
			path: 'blogs', 
			model: 'Blog'
		}
	}).populate('blogs')
	.then((blah) => {
		res.json(blah)
	})
	.catch(err=> res.json(err))


});

// POST route => to have the user post a blog

profileRoutes.post('/profile/post', (req, res, next) => {
	console.log("-=-=-=-=-=-=-=--=-=-=-=-",req.user);
	
	Blog
		.create({
			title: req.body.title,
			description: req.body.description,
			owner: req.user._id,
			likes: [],
			public: true
		})
		.then((response) => {
			console.log('---------------', response);
			user
				.findByIdAndUpdate(req.user._id, { $push: { blogs: response._id } })
				.then((theResponse) => {
					console.log('====================', theResponse);
					res.json(theResponse);
				})
				.catch((err) => {
					res.json(err);
				});
			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

// POST route => to have the user post a PRIVATE blog

profileRoutes.post('/profile/postPrivate', (req, res, next) => {
	blog
		.create({
			title: req.body.title,
			description: req.body.description,
			owner: req.user._id,
			likes: [],
			public: false
		})
		.then((response) => {
			console.log('---------------', response);
			user
				.findByIdAndUpdate(req.user._id, { $push: { blogs: response._id } })
				.then((theResponse) => {
					console.log('====================', theResponse);
					res.json(theResponse);
				})
				.catch((err) => {
					res.json(err);
				});
			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

// POST route => to have the current user favorite current profile's user
profileRoutes.post('/profile/:id/favorite', (req, res, next) => {
	user
		.findById(req.params.id)
		.then((theFavoritedAccount) => {
			if (theFavoritedAccount.favoritedBy.toString().includes(req.user._id.toString())) {
				// see if any of them are equal to req.user._id
				req.user.favoriteUsers.pull(theFavoritedAccount._id);
				theFavoritedAccount.favoritedBy.pull(req.user._id); // if there is one pull from array
			} else {
				req.user.favoriteUsers.push(theFavoritedAccount._id);
				theFavoritedAccount.favoritedBy.push(req.user._id); // if not push to likes array
			}
			theFavoritedAccount.save(); // theFavoritedAccount.save .then
			req.user
				.save()
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

module.exports = profileRoutes;
