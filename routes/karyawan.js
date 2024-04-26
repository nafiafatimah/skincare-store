const express = require ('express');
const router = express.Router();
const connection = require('../config/db.js');
const {body, validationResult } = require('express-validator');

//routes untuk mencari/ menampilkan data karyawan
router.get('/', function (req, res){
    connection.query('select * from karyawan order by id_karyawan desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data karyawan',
                data: rows
            })
        }
    })
});

//routes untuk menambah karyawan
router.post('/store',[
    //validation
    body('nama_karyawan').notEmpty(),
    body('alamat').notEmpty(),
    body('no_hp').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_karyawan: req.body.nama_karyawan,
        alamat: req.body.alamat,
        no_hp: req.body.no_hp
    }
    connection.query('insert into karyawan set ?', Data, function(err, rows){
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

//routes untuk mencari karyawan lewat id
router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`select * from karyawan where id_karyawan = ${id}`, function(err, rows) {
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
                message: 'Data karyawan',
                data: rows[0]
            })
        }
    })
})

//routes untuk update data karyawan lewat id
router.patch('/update/:id', [
    body('nama_karyawan').notEmpty(),
    body('alamat').notEmpty(),
    body('no_hp').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_karyawan: req.body.nama_karyawan,
        alamat: req.body.alamat,
        no_hp: req.body.no_hp
    }
    connection.query(`update karyawan set ? where id_karyawan = ${id}`, Data, function(err, rows) {
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

//routes untuk mendelete data karyawan lewat id 
router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id;
    connection.query(`delete from karyawan where id_karyawan = ${id}`, function (err, rows){
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