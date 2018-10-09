// routes/auth-routes.js

const express = require('express');
const clanRoutes = express.Router();
const mongoose = require('mongoose');

// require the user model & blog model !!!!
const user = require('../models/user');
const blog = require('../models/blogs');
const clan = require('../models/clan');

// POST route => to have the user create a clan

clanRoutes.post('/clan/create', (req, res, next) => {
	var users;

	clan
		.create({
			name: req.body.name,
			description: req.body.description,
			owner: req.user._id,
			users: users
		})
		.then((response) => {
			user
				.findByIdAndUpdate(req.user._id, { $push: {clan: req.body.name } })
				.then((theResponse) => {
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

// GET route => to get a specific clan/detailed view

clanRoutes.get('/clan/:id', (req, res, next) => {
	clan
		.findById(req.params.id)
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

// PUT route => to update a specific clan and neglet unauthorized users

clanRoutes.put('/clan/:id', (req, res, next) => {
	clan
		.findById(req.params.id)
		.then((x) => {
			if (!req.user._id.equals(x.owner)) {
        return res.json({
          redirectUrl: '/'
        })
			}
		})
		.catch((err) => {
			res.json(err);
		});
	clan
		.findByIdAndUpdate(req.params.id, req.body)
		.then(() => {
			res.json({ message: `clan with ${req.params.id} is updated successfully.` });
		})
		.catch((err) => {
			res.json(err);
		});
});

// DELETE route => to delete a specific clan

clanRoutes.delete('/clan/:id', (req, res, next) => {
  clan
  .findById(req.params.id)
  .then((x) => {
    if (!req.user._id.equals(x.owner)) {
      return res.json({
        redirectUrl: '/'
      })
    }
  })
  .catch((err) => {
    res.json(err);
  });
	clan
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.json({ message: `clan with ${req.params.id} is removed successfully.` });
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = clanRoutes;
