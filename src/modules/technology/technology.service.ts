import { prisma } from "../../lib/prisma"
import { ITechnology, ITechnologyUpdate } from "./technology.interface"



//& technology create
const createTechnologyIntoDB = async(payload: ITechnology) => {
  
  const result = await prisma.technology.create({
    data: {
      ...payload
    }
  })

  return result
}


//& technology get
const getTechnologyFromDB = async() => {
  
  const result = await prisma.technology.findMany()

  return result
}


//& technology update
const updateTechnologyIntoDB = async(id: number, payload: ITechnologyUpdate) => {
  const tech = await prisma.technology.findUnique({
    where: {id}
  })

  if(!tech){
    return null
  }
  const result = await prisma.technology.update({
    where: {id},
    data:{
      ...payload
    }
  })

  return result
}


export const technologyService = {
  createTechnologyIntoDB,
  getTechnologyFromDB,
  updateTechnologyIntoDB,
  
}