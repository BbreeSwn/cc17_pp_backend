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
{firstName: 'canny', lastName: 'baemon', userName: 'CannyBaemon', password},
{firstName: 'pharita', lastName: 'baemon', userName: 'PharitaBaemon', password},
{firstName: 'Ruka', lastName: 'baemon', userName: 'RukaBaemon', password},
  ]

  const catagoryData = [
    {catagory_name: "Art for kids"},
    {catagory_name: "English for kids"},
    {catagory_name: "Chinese for kids"},
    {catagory_name: "Japanese for kids"},
    {catagory_name: "Cooking with Kids"},
    {catagory_name: "A class natural"},
  ]
  



const run = async () => {
  // await prisma.users.createMany({ data : userData })
  // await prisma.admin.createMany({ data : adminData })
  await prisma.catagories.createMany({ data : catagoryData })
}

run()