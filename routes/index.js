var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index', { title: 'La Loco', values: req.body });
});

router.post('/control', function(req, res, next) {
    console.log(JSON.stringify(req.body));
    // Check if request is AJAX / XHR
    var isAjaxRequest = req.xhr;
    if (isAjaxRequest) {
        res.json(req.body);
    }
    else {
        // If request is synchrone POST, send HTML render
        res.render('index', { title: 'La Loco', values: req.body });
    }

});

module.exports = router;
