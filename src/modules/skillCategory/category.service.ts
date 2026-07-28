import { prisma } from "../../lib/prisma"
import { ICategory, ICategoryUpdate } from "./category.interface"



const createCategoryIntoDB = async (payload: ICategory) => {

  const result = await prisma.skillCategory.create({
    data: {
      ...payload
    }
  })

  return result
}




const getCategoryFromDB = async () => {

  const result = await prisma.skillCategory.findMany({
    orderBy: {
      order: "asc"
    }
  })

  return result
}



//& UPDATE
const updateCategoryIntoDB = async (id: number, payload: ICategoryUpdate) => {

  const cate = await prisma.skillCategory.findUnique({
    where: { id }
  })

  if (!cate) {
    return null
  }

  const result = await prisma.skillCategory.update({
    where: { id },
    data: {
      ...payload
    },
  })

  return result
}

export const categoryService = {
  createCategoryIntoDB,
  getCategoryFromDB,
  updateCategoryIntoDB,

}