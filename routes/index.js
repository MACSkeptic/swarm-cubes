
/*
 * GET home page.
 */

exports.index = function (req, res) {
  var name = req.query.name;
  res.render('index', { title: 'swarm cubes', name: name, url: process.env.URL || 'http://localhost:3000' });
};

exports.webGL = function (req, res) {
  var name = req.query.name;
  res.render('3d', { title: 'Swarm Cubes webGL sandbox', name: name, url: process.env.URL || 'http://localhost:3000' });
};