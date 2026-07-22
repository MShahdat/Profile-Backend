import { prisma } from "../../lib/prisma"
import { IEducation } from "./education.interface"



//* create education
const createEducation = async (payload: IEducation) => {

  const create = await prisma.education.create({
    data: {
      ...payload
    }
  })

  return create
}



//* get education
const getEducation = async () => {

  const result = await prisma.education.findMany()

  return result
}



//* update education
const updateEducation = async (id: number, payload: IEducation) => {

  const edu = await prisma.education.findUnique({
    where: { id }
  })

  if (!edu) {
    return null
  }

  const updated = await prisma.education.update({
    where: { id },
    data: {
      ...payload
    }
  })

  return updated
}




export const educationService = {
  createEducation,
  getEducation,
  updateEducation,

}