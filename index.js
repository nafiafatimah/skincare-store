const express = require ('express')
const app = express()
const port = 3700
//membuat route baru dengan method GET yang isinya hallo...
const bodyPs = require('body-parser'); //import body-paarser
app.use(bodyPs.urlencoded({ extended: false}));
app.use(bodyPs.json());

const  mhsRouterharga = require('./routes/harga');
app.use('/api/harga', mhsRouterharga);

const  mhsRouterkaryawan = require('./routes/karyawan');
app.use('/api/karyawan', mhsRouterkaryawan);

const  mhsRouterkategori = require('./routes/kategori');
app.use('/api/kategori', mhsRouterkategori);

const  mhsRoutermenu = require('./routes/menu');
app.use('/api/menu', mhsRoutermenu);

const  mhsRoutermerek = require('./routes/merek');
app.use('/api/merek', mhsRoutermerek);

const  mhsRouterpelanggan = require('./routes/pelanggan');
app.use('/api/pelanggan', mhsRouterpelanggan);

const  mhsRouterpemasok = require('./routes/pemasok');
app.use('/api/pemasok', mhsRouterpemasok);

app.listen(port, () => {
    console.log(`Aplikasi berjalan di http:://localhost:${port}`)
})
