import { prisma } from "../../lib/prisma"
import { ICategoy } from "./category.interface"



const createCategoryIntoDB = async (payload: ICategoy) => {

  const { title } = payload
  // const isCat = await prisma.category.findUnique({
  //   where: { title }
  // })

  const result = await prisma.category.create({
    data: {
      ...payload
    }
  })
  return result
}




const getCategoryFromDB = async () => {
  const result = await prisma.category.findMany()
  return result
}




export const categoryService = {
  createCategoryIntoDB,
  getCategoryFromDB
}