import { Prisma } from "../../../generated/prisma/client";
import config from "../../config/env";
import { prisma } from "../../lib/prisma"
import bcrypt from 'bcrypt'
import { IPassword } from "./admin.interface";


//^ GET ADMIN
const getProfileFromDB = async (id: string) => {

  const result = await prisma.admin.findUnique({
    where: {id},
    omit: {
      password: true
    }
  })
  return result
}



//^ PASSWORD UPDATE
const updatePassIntoDB = async (id: string, payload: IPassword) => {

  const { password } = payload

  if (!password) {
    return 'not'
  }

  // console.log('pass', password)

  const hasPass = await bcrypt.hash(password as string, Number(config.solt_or_rounds))

  await prisma.admin.update({
    where: { id },
    data: {
      password: hasPass
    }
  })
}




export const adminService = {
  getProfileFromDB,
  updatePassIntoDB,

}