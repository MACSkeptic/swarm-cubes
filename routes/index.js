
/*
 * GET home page.
 */

exports.index = function(req, res){
  var name = req.params
  res.render('index', { title: 'swarm cubes', url: process.env.URL || 'http://localhost:3000' });
};
