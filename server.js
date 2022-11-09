const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParse = require('body-parser')

app.use(bodyParse.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/static'))

app.set('views', __dirname + '/views')

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/manadaDB', {useNewUrlParser: true})

const ManadaSchema = new mongoose.Schema({
    nombreAnimal: {type: String, require: [true, 'Nombre requerido'],},
    tipoAnimal: {type: String, require: [true, 'tipo requerido']},
    edad: {type: String, require: [true, 'Edad requerido']},
})

const Manada = mongoose.model('manada', ManadaSchema)

app.get('/', (req, res) => {
    
    Manada.find({})
    
    .then(manada => {
        res.render("index",{infoAnimales: manada})
        // lógica con otros resultados
    })
    .catch(err => res.json(err));
            
})

app.get('/nuevo', (req, res) => {

    res.render('nuevo', {mensaje: " "})
})

app.get('/detalle/:id', (req, res) => {
    
    Manada.findOne({_id: req.params.id})
    
    .then(manada => {
        res.render("detalle",{infoAnimales: manada})
        // lógica con otros resultados
    })
    .catch(err => res.json(err));
            
})

app.get('/editar/:id', (req, res) => {
    
    Manada.findOne({_id: req.params.id})
    
    .then(manada => {
        res.render("editar",{infoAnimales: manada})
        // lógica con otros resultados
    })
    .catch(err => res.json(err));
            
})

app.post('/editar/:id', (req, res) => {
    Manada.updateOne({_id: req.params.id},req.body)

    .then(manada => {
        res.redirect("/")
        
    })
    .catch(err => res.json(err));
            
})




app.get('/destruir/:id', (req, res) => {
    
    Manada.deleteOne({_id: req.params.id})
    .then(manada => {
        res.redirect("/")
        // lógica con otros resultados
    })
    .catch(err => res.json(err));
            
})

app.post('/editar', function(req, res) {

})



app.post('/nuevo', function(req, res) {
    console.log(req.body)
    const { nombreAnimal, tipoAnimal, edad } = req.body
    const manada = new Manada()
    manada.nombreAnimal = nombreAnimal
    manada.tipoAnimal = tipoAnimal
    manada.edad = edad
    manada.save()
    .then(
        () => res.render('nuevo',{mensaje: "agregado con exito"})
    )
    
    .catch (
        (error) =>{ console.log(error)
        },    
    )
})
    
    
    

app.listen(8000, function() {
    console.log ("listening in port 8000");
})