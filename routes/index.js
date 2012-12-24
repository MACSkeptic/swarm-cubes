
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'swarm cubes', url: process.env.URL || 'http://localhost:3000' });
};
