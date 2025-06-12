const index = (req, res) => {
  res.status(200).json({
    message: 'Welcome to the User API',
  });
}

module.exports = {
  index,
}