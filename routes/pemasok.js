const express = require ('express');
const router = express.Router();
const connection = require('../config/db.js');
const {body, validationResult } = require('express-validator');

//routes untuk menampilkan data yang ada di tabel pemasok
router.get('/', function (req, res){
    connection.query('select * from pemasok order by id_pemasok desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data pemasok',
                data: rows
            })
        }
    })
});

//routes untuk menambah data di tabel pemasok
router.post('/store',[
    //validation
    body('nama_toko').notEmpty(),
    body('alamat_toko').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_toko: req.body.nama_toko,
        alamat_toko: req.body.alamat_toko
    }
    connection.query('insert into pemasok set ?', Data, function(err, rows){
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

//routes untuk mencari data lewat id
router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`select * from pemasok where id_pemasok = ${id}`, function(err, rows) {
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
                message: 'Data pemasok',
                data: rows[0]
            })
        }
    })
})

//routes untuk update data dari id
router.patch('/update/:id', [
      //validation
      body('nama_toko').notEmpty(),
      body('alamat_toko').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_toko: req.body.nama_toko,
        alamat_toko: req.body.alamat_toko
    }
    connection.query(`update pemasok set ? where id_pemasok = ${id}`, Data, function(err, rows) {
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

//routes untuk delete lewat id
router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id;
    connection.query(`delete from pemasok where id_pemasok = ${id}`, function (err, rows){
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