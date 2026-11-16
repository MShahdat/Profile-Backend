import { prisma } from "../../lib/prisma"
import { IService, IServiceUpdate } from "./service.interface"
import { AppError } from "../../utility/appError"



//& create service 
const createService = async (payload: IService) => {

  const { title } = payload
  const ser = await prisma.service.findUnique({
    where: { title }
  })

  if (ser) {
    throw new AppError(400, 'Service already exists')
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
  const result = await prisma.service.findMany({
    orderBy: {
      order: "asc"
    }
  })
  return result
}



//& updated service 
const updateService = async (id: string, payload: IServiceUpdate) => {

  const ser = await prisma.service.findUnique({
    where: { id }
  })

  if (!ser) {
    throw new AppError(404, "Service not found")
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