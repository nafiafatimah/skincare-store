const express = require ('express');
const router = express.Router();
const connection = require('../config/db.js');
const {body, validationResult } = require('express-validator');

router.get('/', function (req, res){
    connection.query(`SELECT pelanggan.nama_pelanggan AS nama_pelanggan, 
    karyawan.nama_karyawan AS nama_karyawan, 
    pemasok.nama_toko AS nama_toko, 
    merek.nama_merek AS nama_merek, 
    kategori.nama_kategori AS nama_kategori, 
    harga.harga FROM menu 
    INNER JOIN pelanggan ON menu.id_pelanggan = pelanggan.id_pelanggan 
    INNER JOIN karyawan ON menu.id_karyawan = karyawan.id_karyawan 
    INNER JOIN pemasok ON menu.id_pemasok = pemasok.id_pemasok 
    INNER JOIN merek ON menu.id_merek = merek.id_merek 
    INNER JOIN kategori ON menu.id_kategori = kategori.id_kategori 
    INNER JOIN harga ON menu.id_merek = harga.id_merek AND menu.id_kategori = harga.id_kategori`, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data menu',
                data: rows
            })
        }
    })
});
router.post('/store',[
    //validation
    body('id_pelanggan').notEmpty(),
    body('id_pemasok').notEmpty,
    body('id_karyawan').notEmpty(),
    body('id_merek').notEmpty(),
    body('id_kategori').notEmpty(),
    body('id_harga').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        id_pelanggan: req.body.id_pelanggan,
        id_pemasok: req.body.id_pemasok,
        id_karyawan: req.body.id_karyawan,
        id_merek: req.body.id_merek,
        id_kategori: req.body.id_kategori,
        id_harga: req.body.id_harga
    }
    connection.query('insert into menu set ?', Data, function(err, rows){
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
router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`SELECT pelanggan.nama_pelanggan AS nama_pelanggan, 
    karyawan.nama_karyawan AS nama_karyawan, 
    pemasok.nama_toko AS nama_toko, 
    merek.nama_merek AS nama_merek, 
    kategori.nama_kategori AS nama_kategori, 
    harga.harga FROM menu 
    INNER JOIN pelanggan ON menu.id_pelanggan = pelanggan.id_pelanggan 
    INNER JOIN karyawan ON menu.id_karyawan = karyawan.id_karyawan 
    INNER JOIN pemasok ON menu.id_pemasok = pemasok.id_pemasok 
    INNER JOIN merek ON menu.id_merek = merek.id_merek 
    INNER JOIN kategori ON menu.id_kategori = kategori.id_kategori 
    INNER JOIN harga ON menu.id_merek = harga.id_merek AND menu.id_kategori = harga.id_kategori where id_menu = ${id}`, function(err, rows) {
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
                message: 'Data menu',
                data: rows[0]
            })
        }
    })
})
router.patch('/update/:id', [
    body('id_pelanggan').notEmpty(),
    body('id_pemasok').notEmpty(),
    body('id_karyawan').notEmpty(),
    body('id_merek').notEmpty(),
    body('id_kategori').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        id_pelanggan: req.body.id_pelanggan,
        id_pemasok: req.body.id_pemasok,
        id_karyawan: req.body.id_karyawan,
        id_merek: req.body.id_merek,
        id_kategori: req.body.id_kategori
    }
    connection.query(`update menu set ? where id_menu = ${id}`, Data, function(err, rows) {
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

router.delete('/delete/(:id)', function(req, res){
    let id = req.params.id;
    connection.query(`delete from menu where id_menu = ${id}`, function (err, rows){
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