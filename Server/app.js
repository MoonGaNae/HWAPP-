
const express = require('express');
const path = require('path');
const request = require('request');
const cors = require('cors');

//Router
const kitRouter = require('./routes/kit');

//DataBase
const { sequelize } = require('./models');

const app = express();
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.set('port', process.env.PORT || 8002);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res, next) => {
  res.send('Hello World');
  next();
});
app.use('/kit', kitRouter);

// Heroku 무료버전은 30분뒤에 꺼지기 때문에 20분마다 자기자신을 호출해줘야한다.
app.use((req, res, next) =>{
  console.log(req.url, '20분마다 실행');
  setTimeout(() =>{
      console.log(req.url, '20분마다 실행');
      const options = {
          method : 'GET',
          //url : 'http://localhost:8002/'
          url: 'http://hwapp-2020.herokuapp.com/'
      };
  
      request(options, (err, res, body) => {
      });
  }, 1200000);
  next();
});

app.use((req, res, next) =>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})
module.exports = app;
