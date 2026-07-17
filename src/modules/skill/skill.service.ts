import { prisma } from "../../lib/prisma"
import { notFoundResponse } from "../../utility/sendResponse"
import { ISkill, ISkillUpdate } from "./skill.interface"



//& create
const createSkill = async(payload: ISkill) => {
  const {categoryId} = payload

  const category = prisma.skillCategory.findUnique({
    where: {id: categoryId}
  })

  if(!category){
    return null
  }

  const result = await prisma.skill.create({
    data: {
      ...payload
    }
  })

  return result
}


//& get
const getSkill = async() => {

 const result = await prisma.skill.findMany({
  orderBy: {
    order: "asc"
  }
 })

  return result
}


//& update
const updateSkill = async(id:number, payload: ISkillUpdate) => {

  const skill = await prisma.skill.findUnique({
    where: {id}
  })

  if(!skill){
    return null
  }

  const result = await prisma.skill.update({
    where: {id},
    
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