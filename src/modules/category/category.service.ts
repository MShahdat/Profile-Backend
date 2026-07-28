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



//& get category
const getCategoryFromDB = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      order: "asc"
    }
  })
  return result
}


//& updated category
const updateCategoryIntoDB = async (id: number, payload: ICategoy) => {

  const isCat = await prisma.category.findUnique({
    where: { id }
  })

  if (!isCat) {
    return null
  }

  const result = await prisma.category.update({
    where: { id },
    data: {
      ...payload
    }
  })
  return result
}


export const categoryService = {
  createCategoryIntoDB,
  getCategoryFromDB,
  updateCategoryIntoDB,

}