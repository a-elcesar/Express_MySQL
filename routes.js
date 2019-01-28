var router=require('express').Router()
var mysql=require('mysql')
var bodyParser=require('body-parser')

router.use(bodyParser.json())

var connector=mysql.createConnection({
    host:'localhost',
    user:'elcesar',
    password:'Qwe123!@#',
    database:'sekolahku'
})

connector.connect(()=>{
    console.log('Terhubung ke MySQL')
})

//tes GET all data from users
// router.get('/users',(req,res)=>{
//     var dbStat='select * from users'
//     connector.query(dbStat,(err,output)=>{
//         res.send({output})
//     })
// })

// test POST /signup
// router.post('/signup',(req,res)=>{
//     var dbStat='insert into users set ?'
//     var data={
//         "username":req.body.username,
//         "email":req.body.email,
//         "password":req.body.password
//     }
// })

//Route utk SignUp
router.post('/signup',(req,res)=>{
    var data=req.body
    //pelengkap
    if ((req.body.hasOwnProperty('email') && req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password'))==false){
        res.send('Silahkan input username, email dan password')
    }
    else {
        var sql=`select * from users where username='${req.body.username}' or email='${req.body.email}'`
        connector.query(sql,(err,result)=>{
            if (err){
                throw err
            }
            else if (result.length>0){ //pelengkap
                res.send({
                    "signup":"failed",
                    "status":"email sudah terdaftar"
                })
            }
            else { //sesuai soal
                var sql=`insert into users set ?`
                connector.query(sql,data,(err,result)=>{
                    res.send({
                        "username":req.body.username,
                        "email":req.body.email,
                        "status":"signup sukses"
                    })
                })
            }
        })
    }
})

//Route utk LogIn
router.post('/login',(req,res)=>{
    if (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('email')){ //sesuai soal
        res.send('Silahkan gunakan username ATAU email saja')
    }
    else if (!req.body.hasOwnProperty('password')){ //pelengkap
        res.send('Silahkan masukkan password')
    }
    else {
        var sql=`select * from users where username='${req.body.username}' or email='${req.body.email}'`
        connector.query(sql,(err,result)=>{
            if (err){
                throw err
            }
            else if (result==0){ //sesuai soal
                res.send({
                    "login":"failed",
                    "status":"akun tidak terdaftar"
                })
            }
            else {
                if (req.body.password != result[0].password){ //sesuai soal
                    res.send({
                        "login":"failed",
                        "status":"password salah"
                    })
                }
                else {
                    res.send({ //sesuai soal
                        "login":"ok",
                        "status":"login sukses"
                    })
                }
            }
        })
    }
})

module.exports=router