import { prisma } from "../../lib/prisma"
import { IService, IServiceUpdate } from "./service.interface"



//& create service 
const createService = async (payload: IService) => {

  const { title } = payload
  const ser = await prisma.service.findUnique({
    where: { title }
  })

  if (ser) {
    return 'exist'
  }
  const result = await prisma.service.create({
    data: {
      ...payload
    }
  })

  return result
}


//& get all services 
const getService = async () => {
  const result = await prisma.service.findMany()
  return result
}



//& updated service 
const updateService = async (id: string, payload: IServiceUpdate) => {

  const ser = await prisma.service.findUnique({
    where: { id }
  })

  if (!ser) {
    return null
  }
  const result = await prisma.service.update({
    where: { id },
    data: {
      ...payload
    }
  })

  return result
}


export const serviceService = {
  createService,
  getService,
  updateService,

}