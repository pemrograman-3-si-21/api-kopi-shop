const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

exports.inputDataKopi = async (req, res)=> {
try {
    const data = JSON.parse(req.body.data)
    data.gambar = req.file.filename
    await prisma.data_kopi.create({
        data: data
    })
    res.json({
        status: true,
        msg: 'berhasil input data kopi!'
    })
} catch (error) {
    res.json ({
        status: false,
        msg: 'terjadi kesalahan pada server'
      })
}
}

exports.getDataKopi = async (req, res)=> {
    try {
        const query = await prisma.data_kopi.findMany({})
        if(query.length < 0) return res.json({status: false, msg: 'tidak ada data kopi!'})
        res.json({
            status: true,
            msg: 'berhasil mengambil data!',
            data: query
        })
    } catch (error) {
        res.json ({
            status: false,
            msg: 'terjadi kesalahan pada server'
        })
        
    }
}

exports.getDataById = async (req, res) => {
    try {
        const query = await prisma.data_kopi.findUnique ({
        where: {
            id: Number(req.params.id)
        }
        })

        if(!query) return res.json ({status: false, msg: `Data dengan id =>  ${req.params.id} tidak ditemukan!!`})
        res.json({
            status: true,
            msg: 'berhasil mengambil data',
            data: query
     })
    } catch (error){
        res.json({
            status: false,
            msg: 'terjadi kesalahan pada server'
        })

    }
}
exports.hapusDataKopi = async (req, res) => {
    try {
        await prisma.data_kopi.delete({
          where: {
            id: Number(req.params.id)
          }  
        })
        res.json({
            status: true,
            msg: `data dengan id => ${req.params.id} berhasil dihapus!`
        })
    } catch (error) {
        res.json({
            status: false,
            msg: 'terjadi kesalahan pada server!'
        })
        
    }
}
exports.updateKopi = async (req, res) => {
    try {
        const data = JSON.parse(req.body.data)
        if(req.file){
            data.gambar = req.file.filename
        }
        await prisma.data_kopi.update({
            where: {
                id: Number (req.params.id)
            },
            data: data
        })
        res.json({
            status: true,
            msg: 'berhasil merubah data!'
        })
    } catch (error) {
        res.json({
            status: false,
            msg: 'kesalahan pada server!'
        })
    }
}