var express = require('express');
var router = express.Router();
var SerialPort = require('serialport');

// On ouvre une nouvelle liaison série
// '/dev/tty-usbserial1' à modifier selon la carte arduino
var port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600 //vitesse de transmission de la liason série (voir sketch Arduino)
});

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('login');
      req.session.flash = [];
});

router.post('/login', function(req, res, next) {
    // you might like to do a database look-up or something more scalable here

    if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
        console.log("AUTH OK");
        req.session.authenticated = true;
        console.log('auth session: ', req.session);
        res.redirect('/trainconfig');
    } else {
        console.log("AUTH KO");
        req.flash('danger', 'Utilisateur et/ou mot de passe incorrect(s)');
        res.redirect('/');
    }
});

router.get('/logout', function(req, res, next) {
		delete req.session.authenticated;
    req.flash('info', 'Vous êtes déconnecté.');
		res.redirect('/');
});

router.get('/trainconfig', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    user: req.session
  });
});


router.post('/control', function(req, res, next) {
    console.log(JSON.stringify(req.body));
    var dataTrains = JSON.parse(req.body);

    port.write(dataTrains, function(){
      console.log('Train A : ' + 'Vitesse = ' + dataTrains.speed0 + 'Light = ' + dataTrains.speed0 +
      ' - Train B :' + 'Vitesse = ' + dataTrains.speed1 + 'Light = ' + dataTrains.speed1);
    });
});

module.exports = router;
