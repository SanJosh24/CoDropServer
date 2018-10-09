// routes/auth-routes.js

const express = require('express');
const messageRoutes = express.Router();
const mongoose = require('mongoose');

// require the user model & blog model !!!!

const user = require('../models/user');
const blog = require('../models/blogs');
const Message = require('../models/message')

// GET route => to get all messages that user has

messageRoutes.get('/profile/:id/messages', (req, res, next) => {
	user
		.findById(req.user._id).populate('messages')
		.then((res) => {
			res.json(res);
		})
		.catch(next);
});

// GET route => to get specific private message

messageRoutes.get('/profile/:id/messages/:msgid', (req, res, next) => {
	Message
		.findById(req.params.msgid)
		.then((res) => {
			res.json(res);
		})
		.catch(next);
});

// POST route => to create a private message to the current user profile

messageRoutes.post('/profile/:id/messages', (req, res, next) => {
	Message
		.create({
			title: req.body.title,
			body: req.body.body,
			senderId: req.user._id,
			recieverId: req.params.id
		})
		.then((response) => {
			user
				.findByIdAndUpdate(req.user._id, { $push: { messages: response._id } })
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

// PUT route => to update a specific message on sender user can update

messageRoutes.put('/profile/:id/messages/:msgid', (req, res, next) => {
	Message.findById(req.params.msgid)
	.then((themessage)=>{
		if (!req.user._id.equals(themessage.senderId)) {
			return res.json({
				message: 'nah bruh you dont have permission to do this action'
			})
		}
			themessage.title = req.body.title
			themessage.body = req.body.body

			themessage.save()
			.then((res)=>{
				res.json(res);
			})
			.catch((err)=>{
				res.json(err);
			})
	})
	.catch((err)=>{
		res.json(err)
	})
});

// DELETE route => to delete a specific message on sender user can update

messageRoutes.delete('/profile/:id/messages/:msgid', (req, res, next) => {
	Message.findById(req.params.msgid)
	.then((themessage)=>{
		if (!req.user._id.equals(themessage.senderId)) {
			return res.json({
				message: 'nah bruh you dont have permission to do this action'
			})
		}
		Message
		.findByIdAndRemove(req.params.msgid)
			.then((res)=>{
				res.json(res);
			})
			.catch((err)=>{
				res.json(err);
			})
	})
	.catch((err)=>{
		res.json(err)
	})
});


module.exports = messageRoutes;