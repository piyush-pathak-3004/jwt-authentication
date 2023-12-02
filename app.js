// app.js

const express = require('express');
const userController = require('./UserControllers/userController');
const { authenticateToken } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-undef
authenticateToken.unless = unless({ path: ['/login', '/signup'] });

app.use(express.json());
app.use(authenticateToken);

require('./Userdb/db');

app.use('/api', userController);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
