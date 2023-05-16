const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

exports.registrasiUser = async (req, res) => {
  try {
    const data = req.body
    const cekuser = await prisma.users.findUnique({
      where: { 
        username: data.username
      }
    })
    if (cekuser) {
      res.json({
        status: false,
        msg: 'username telah digunakan'
      })
    } else {const query = await prisma.users.create({
      data: data
      })
    res.json ({
      status: true,
      msg: 'berhasil registrasi'
    })

    }
    
  } catch (error) {
    res.json ({
      status: false,
      msg: 'terjadi kesalahan pada server'
    })
    
  }
}