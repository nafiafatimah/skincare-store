const express = require ('express');
const router = express.Router();
const connection = require('../config/db.js');
const {body, validationResult } = require('express-validator');

router.get('/', function (req, res){
    connection.query(`SELECT m.nama_merek, k.nama_kategori,h.harga
    FROM harga h INNER JOIN merek m ON h.id_merek = m.id_merek
    INNER JOIN kategori k ON h.id_kategori = k.id_kategori`, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data harga',
                data: rows
            })
        }
    })
});
router.post('/store',[
    //validation
    body('id_merek').notEmpty(),
    body('id_kategori').notEmpty(),
    body('harga').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        id_merek: req.body.id_merek,
        id_kategori: req.body.id_kategori,
        harga: req.body.harga
    }
    connection.query('insert into harga set ?', Data, function(err, rows){
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
    connection.query(`SELECT m.nama_merek, k.nama_kategori,h.harga
    FROM harga h INNER JOIN merek m ON h.id_merek = m.id_merek
    INNER JOIN kategori k ON h.id_kategori = k.id_kategori where id_harga = ${id}`, function(err, rows) {
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
                message: 'Data harga',
                data: rows[0]
            })
        }
    })
})
router.patch('/update/:id', [
    body('id_merek').notEmpty(),
    body('id_kategori').notEmpty(),
    body('harga').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        id_merek: req.body.id_merek,
        id_kategori: req.body.id_kategori,
        harga: req.body.harga
    }
    connection.query(`update harga set ? where id_harga = ${id}`, Data, function(err, rows) {
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
    connection.query(`delete from harga where id_harga = ${id}`, function (err, rows){
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