const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session')


//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'clave',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//Gloval Values
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    next();
});
//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
