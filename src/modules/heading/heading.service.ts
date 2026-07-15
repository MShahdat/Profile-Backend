import { prisma } from "../../lib/prisma"
import { IHeading, IHeadingUpdate } from "./heading.interface"



//& CREATE HEADING
const createHeadingIntoDB = async (payload: IHeading) => {

  const result = await prisma.heading.create({
    data: {
      ...payload
    }
  })

  return result
}




//& GET HEADING BY ID
const getHeadingFromDB = async (id: number) => {

  const result = await prisma.heading.findUnique({
    where: {id}
  })

  return result
}




//& UPDATED HEADING
const updateHeadingIntoDB = async (id: number, payload: IHeadingUpdate) => {

  const isHeading = await prisma.heading.findUnique({
    where: {id}
  })

  if(!isHeading){
    return null
  }

  const result = await prisma.heading.update({
    where: {id},
    data: {
      ...payload
    }
  })

  return result
}




export const headingService = {
  createHeadingIntoDB,
  getHeadingFromDB,
  updateHeadingIntoDB,

}