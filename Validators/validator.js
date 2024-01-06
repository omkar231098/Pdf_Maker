// validator.js

// Function to validate username using regex
const isValidUsername = (username) => {
    // Implement your custom username validation logic
    // For simplicity, this example checks if the username is at least 3 characters long
    return username.length >= 3;
  };
  
  // Function to validate password
  const isValidPassword = (password) => {
    // Implement your custom password validation logic
    // For simplicity, this example checks if the password is at least 6 characters long
    return password.length >= 6;
  };
  
  const validateUsernameAndPassword = (req, res, next) => {
    const { username, password } = req.body;
  
    // Validate username
    if (!isValidUsername(username)) {
      return res.status(400).json({ success: false, message: 'Invalid username format, username is at least 3 characters long' });
    }
  
    // Validate password
    if (!isValidPassword(password)) {
      return res.status(400).json({ success: false, message: 'Invalid password format, Password is at least 6 characters long' });
    }
  
    // If both username and password are valid, continue to the next middleware or route handler
    next();
  };
  
  module.exports = { validateUsernameAndPassword };
  