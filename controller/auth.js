const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const bcrypt = require ('bcrypt')

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
    } else {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(data.password, salt)
      data.password = hash
      const query = await prisma.users.create({
        data: data
      })
    res.json ({
      status: true,
      msg: 'berhasil registrasi'
    })

    }
    
  } catch (error) {
    console.log(error)
    res.json ({
      status: false,
      msg: 'terjadi kesalahan pada server'
    })
    
  }
}

exports.loginuser = async(req, res)=> {
  try {
    const data = req.body
    const cekuser = await prisma.users.findFirst({
      where: {
        username: data.username
      }
    })
    if(!cekuser) return res.json({status: false, msg: 'username tidak terdaftar'})
    if(!bcrypt.compareSync(data.password, cekuser.password)) return res.json({status: false, msg: 'password anda salah!'})
    delete cekuser.password
    res.json({
      status: true,
      msg: 'berhasil login',
      data: cekuser
    })
  } catch (error) {
    res.json ({
      status: false,
      msg: 'terjadi kesalahan pada server'
    })
  }
}