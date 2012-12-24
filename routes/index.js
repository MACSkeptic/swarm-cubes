
/*
 * GET home page.
 */

exports.index = function(req, res){
  var name = req.query.name;
  res.render('index', { title: 'swarm cubes', name: name, url: process.env.URL || 'http://localhost:3000' });
};
