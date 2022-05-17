const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/Users");

//각 타입을 분석해서 가져오게 해줌
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose=require('mongoose')
mongoose.connect(config.mongoURI, {
    //useNewUrlParser: true, useUnifiedTepology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 새해복 많이 받으세요~~~')
})



app.post('/register', (req, res)=>{
    //회원가입 할때 필요한 정보들을 클라이언트에서 가져오면
    //그것들을 데베에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo)=>{
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})