const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const Pool = require('pg').Pool
const port = 8001
var cors = require('cors')
var cookieParser = require('cookie-parser')
const app = express();

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var uploadRouter = require('./routes/upload');


app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
  )
  
  
const db = new Pool()
  



app.use('/upload-csv', uploadRouter(db));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error', err.status);
});




app.listen(port, () => {    
  console.log(`App running on port ${port}.`)
})

module.exports = app