const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

exports.inputDataKopi = async (req, res)=> {
try {
    const data = req.body
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