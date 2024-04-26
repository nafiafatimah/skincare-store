const express = require ('express');
const router = express.Router();
const connection = require('../config/db.js');
const {body, validationResult } = require('express-validator');


//routes untuk mencari/memanggil data di tabel merek
router.get('/', function (req, res){
    connection.query('select * from merek order by id_merek desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data merek',
                data: rows
            })
        }
    })
});

//routes untuk menambah data di tabel merek
router.post('/store',[
    //validation
    body('nama_merek').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_merek: req.body.nama_merek
    }
    connection.query('insert into merek set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Success..!',
                data: rows[0]
            })
        }
    })
})

//routes untuk mencari data merek lewat id
router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`select * from merek where id_merek = ${id}`, function(err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }
        if(rows.lenght <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            })
        }
        else{
            return res.status(200).json({
                status: true,
                message: 'Data merek',
                data: rows[0]
            })
        }
    })
})

//routes untuk mengedit data lewat id
router.patch('/update/:id', [
    body('nama_merek').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_merek: req.body.nama_merek
    }
    connection.query(`update merek set ? where id_merek = ${id}`, Data, function(err, rows) {
        if(err){
            return res.req.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Update Success...!'
            })
        }
    })
})


//routes untuk mendelete data lewat id
router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id;
    connection.query(`delete from merek where id_merek = ${id}`, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data has ben delete !',
            })
        }
    })
})

module.exports = router;