import { Prisma } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"
import { ISkill, ISkillUpdate, SkillQuery } from "./skill.interface"
import { AppError } from "../../utility/appError"



//& create
const createSkill = async (payload: ISkill) => {
  const { categoryId } = payload

  const category = prisma.category.findUnique({
    where: { id: categoryId }
  })

  if (!category) {
    throw new AppError(404, 'Category Not found')
  }

  const result = await prisma.skill.create({
    data: {
      ...payload
    }
  })

  return result
}


//& get
const getSkill = async (query: SkillQuery) => {

  // console.log('query', query)

  const sort = query.sortBy ? query.sortBy : 'order';
  const sortOrder = query.sortOrder ? query.sortOrder : 'asc'

  const andCondition: Prisma.SkillWhereInput[] = []

  if (query.type) {
    andCondition.push({
      category: {
        title: query.type
      }
    })
  }

  const result = await prisma.skill.findMany({
    where: {
      AND: andCondition
    },
    include: {
      category: {
        select: {
          title: true,
          isPublished: true
        }
      }
    },
    orderBy: {
      [sort]: sortOrder
    }
  })

  return result
}


//& update
const updateSkill = async (id: number, payload: ISkillUpdate) => {

  const skill = await prisma.skill.findUnique({
    where: { id }
  })

  if (!skill) {
    return null
  }

  const result = await prisma.skill.update({
    where: { id },

    data: {
      ...payload
    }
  })

  return result
}



export const skillService = {
  createSkill,
  getSkill,
  updateSkill,

}