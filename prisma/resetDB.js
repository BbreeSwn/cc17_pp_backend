require('dotenv').config()
const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database cc17_webkids_personal_project')
  await prisma.$executeRawUnsafe('CREATE Database cc17_webkids_personal_project')
}
console.log('Reset DB..')
run()