const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const conn = require('./db/conn')


const app = express()

// Models

const User = require('./model/User')

// Import Routes

const authRoutes = require('./routes/authRoutes')

// Import Controller

const AuthController = require('./controllers/AuthController')



// configuração da engine handlebars

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//receber resposta do body

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

// Pasta public

app.use(express.static('public'))

// Session middleware

app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true,
        }
    })
)

// flash messages

app.use(flash())

//set session to res

app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

// Routes


app.use('/', authRoutes)

app.get('/', (req, res) =>{
    res.render("home")
})

//conexão com o banco de dados

conn.sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(e => console.log(e.message)) 