import { prisma } from "../../lib/prisma"
import { IAbout } from "./about.interface"



//& CREATE ABOUT
const createAbout = async(payload: IAbout) => {
  const result = await prisma.about.upsert({
    where: {id: 1},
    create: {
      ...payload
    },
    update: {
      ...payload
    }
  })

  return result
}


//& get about
const getAbout = async() => {
  const result = await prisma.about.findFirst()
  return result
}


export const aboutService = {
  createAbout,
  getAbout,
  
}