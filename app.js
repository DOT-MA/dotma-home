let express = require('express');
let path = require('path');
let lessMiddleware = require('less-middleware');
let cors = require('cors');
let package = require('./package.json');

let app = express();

app.locals.appVersion = package.version;
app.locals.appAuthor = package.author;
  
app.use(lessMiddleware(__dirname + '/public', [{
  render: {
    compress: true
  }
}]));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/showcases', express.static(__dirname + '/views/showcases'))

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;