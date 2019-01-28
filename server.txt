var express=require('express')
var routes=require('./routes')
var app=express()

app.use(routes)

app.get('/',(req,res)=>{
    res.send('<h1>Express ♥ MySQL</h1>')
})

app.listen(1247,()=>{console.log('Server aktif @ port 1247')})