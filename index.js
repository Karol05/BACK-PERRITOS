const conn = require("./configmysql")  

var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var cors = require('cors')
const { query } = require("./configmysql")



app.use(express.json());
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))


app.get('/user', (req,res) => {
    res.send("user")
})

app.get('/',(req,res) => {
    res.send("hola");
});


app.post('/e',(req,res) => {
    res.send("hello");
})
app.post('/nuevamascota',(req,res) => {
    console.log(req.body);
  
    const nombreDueno    = req.body.nameDueno1;
    const razaPet        = req.body.razaPet1;
    const namePet        = req.body.namePet1;
    const numberTelefono = req.body.numberphone1;
    const fecha = req.body.fecha1;
    //consulta
    conn.query("insert into mascota(nombremascota,raza,fecha) values('"+namePet+"','"+razaPet+"','"+fecha+"')",)
    let lastid = conn.query("SELECT MAX(id_mascota) AS id FROM mascota", (err,data,faileds) => {
        console.log(data[0].id)
        conn.query("insert into dueno(id_mascota,nombreDueno,numerocelular) values('"+data[0].id+"','"+nombreDueno+"','"+numberTelefono+"')", (err,data,faileds) =>{   
            console.log(err+"malo ahi"); 
        })
    })
    res.send("se creo")
});
app.get('/listaduenos',(req,res) => {
    
    conn.query("select d.nombredueno, d.numerocelular, m.nombremascota, m.fecha FROM dueno d, mascota m WHERE d.id_mascota = m.id_mascota;", (err,data,faileds) =>{
        res.send(data)
    })
})

  app.listen(8000, () =>{
      console.log("Inicio servidor")
  } )