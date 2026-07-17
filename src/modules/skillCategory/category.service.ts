import { prisma } from "../../lib/prisma"
import { ICategory } from "./category.interface"



const createCategoryIntoDB = async(payload: ICategory) => {

  const result = await prisma.skillCategory.create({
    data: {
      ...payload
    }
  })

  return result
}




const getCategoryFromDB = async() => {

  const result = await prisma.skillCategory.findMany({
    orderBy: {
      order: "asc"
    }
  })

  return result
}



export const categoryService = {
  createCategoryIntoDB,
  getCategoryFromDB
}