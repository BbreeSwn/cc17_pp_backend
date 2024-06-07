const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456')
const userData = [
  { userName : 'andy', password, email: 'andy@ggg.mail' },
  { userName : 'bobby', password, email: 'bobby@ggg.mail' },
  { userName : 'candy', password, email: 'candy@ggg.mail' },
]

const adminData = [
    { userName : 'bbb', password, email: 'bbb@ggg.mail' },
    { userName : 'mmm', password, email: 'mmm@ggg.mail' },
    { userName : 'ddd', password, email: 'ddd@ggg.mail' },
  ]
  



const run = async () => {
  await prisma.users.createMany({ data : userData })
  await prisma.admin.createMany({ data : adminData })
}

run()