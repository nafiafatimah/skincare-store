const express = require('express');
const app = express();
const port = 3700;

// Import modul body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Membuat route baru untuk setiap path dengan method GET yang mengembalikan pesan "hallo..."
// Catatan: Ini hanya sebagai contoh dan perlu digantikan dengan logika bisnis yang sesuai
const mhsRouterharga = require('./routes/harga');
app.use('/api/harga', mhsRouterharga);

const mhsRouterkaryawan = require('./routes/karyawan');
app.use('/api/karyawan', mhsRouterkaryawan);

const mhsRouterkategori = require('./routes/kategori');
app.use('/api/kategori', mhsRouterkategori);

const mhsRoutermenu = require('./routes/menu');
app.use('/api/menu', mhsRoutermenu);

const mhsRoutermerek = require('./routes/merek');
app.use('/api/merek', mhsRoutermerek);

const mhsRouterpelanggan = require('./routes/pelanggan');
app.use('/api/pelanggan', mhsRouterpelanggan);

const mhsRouterpemasok = require('./routes/pemasok');
app.use('/api/pemasok', mhsRouterpemasok);

// Mulai aplikasi Express dengan mendengarkan port yang ditentukan
app.listen(port, () => {
    console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
