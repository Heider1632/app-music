const express = require('express')
const exhbs = require('express-handlebars')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const methodOverride = require('method-override')
const flash = require('connect-flash')


// Initializations
const app = express();
require('./database');
require('./config/passport');

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./helpers'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

// routes
app.use(require('./routes'));
app.use(require('./routes/users'));
app.use(require('./routes/foro'));
app.use(require('./routes/songs'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

const port = app.get('port');

// Server is listening
app.listen(app.get('port'), () => {
  console.log(`Server on port ${port}`);
});

