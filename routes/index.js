var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.json({message: 'yes'})
});

router.post('/addtask', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getTasks', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/updateTask', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/deleteTask', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
