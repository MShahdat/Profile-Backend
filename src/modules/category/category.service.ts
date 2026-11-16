import { prisma } from "../../lib/prisma"
import { ICategoy } from "./category.interface"
import { AppError } from "../../utility/appError"



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
    include: {
      skill: {
        orderBy: {
          order: "asc"
        },
        omit: {
          isPublished: true,
          createdAt: true,
          uddatedAt: true
        }
      }
    },
    orderBy: {
      order: "asc"
    },
  })
  return result
}


//& updated category
const updateCategoryIntoDB = async (id: number, payload: ICategoy) => {

  const isCat = await prisma.category.findUnique({
    where: { id }
  })

  if (!isCat) {
    throw new AppError(404, "Category not found")
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