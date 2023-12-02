// controllers/userController.js

const express = require('express');
const userService = require('../UserService/userService');
const { getJWTTokken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const newUser = await userService.create(req.body);
    const token = getJWTTokken(newUser.username);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = userService.authenticateUser(username, password);
    const token = getJWTTokken(user.username);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/users/:userId', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/users/all', async (req, res) => {
  try {
    const users = await userService.getAllusers();
    if (!users) {
      res.status(404).json({ message: 'No User Found' });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.patch('/users/:userId', async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.userId, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
