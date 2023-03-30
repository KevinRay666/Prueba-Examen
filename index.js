const express = require('express')
const mysql   = require('mysql')
const app     = express()
const port    = 3000

app.use(express.json())
var con = mysql.createConnection({
    host:"localhost",
    port:3307,
    user:"root",
    password:"example",
    database:"test"

})
con.connect( function (err){
    if (err){ throw err}
        console.log("Hola")
})


app.listen(port, () =>{
    console.log('la app escucha el puerto '+port)
})

app.get("/alumnos",(req,res) => {
    con.query("select * from `Alumno`",
    function (err,result){
        if(err) {throw err}
        res.status(200).json(result)
    }
    )  }
)

app.post("/alumnos",(req,res) => {

    const alumno = {
            id:req.body.id,
            nombre:req.body.nombre,
            apepat:req.body.apepat,
            apemat:req.body.apemat
    }

    let insert = "insert into `Alumno` set ?"
    //let insert = "INSERT INTO `Alumno` (id, nombre, apepat, apemat) VALUES (?,?,?,?)"
    con.query(insert,alumno,
    function (err,result){
        if(err) {throw err}
        res.status(200).json({"resultado":"con exito"})
    }
    )  }
)

app.put("/alumnos/:id",(req,res) => {

    const alumno = {
            id:req.body.id,
            apemat:req.body.apemat
    }

    const {apemat} = req.body
    const {id} = req.params

    let insert = "update alumno set apemat = ? where id = ?"
    con.query(insert,[apemat,id],
    function (err,result){
        if(err) {throw err}
        res.status(200).json({"resultado":"con exito"})
    }
    )  }
)


app.delete("/alumnos/:id",(req,res) => {

    const {id} = req.params
    let insert = "delete from alumno  where id = ?"
    con.query(insert,[id],
    function (err,result){
        if(err) {throw err}
        res.status(200).json({"resultado":"borrado con exito"})
    }
    )  }
)


app.get('/', function (req, res) {
    res.send(""+req.body.id);
    // conslose.log(req)
  });