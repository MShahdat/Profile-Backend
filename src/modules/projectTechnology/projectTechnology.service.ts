import { prisma } from "../../lib/prisma"
import { IPTechnology, IPTechnologyUpdate } from "./projectTechnology.interface"
import { AppError } from "../../utility/appError"




//& create
const createProjectTech = async (payload: IPTechnology) => {
  const { projectId, technologyId } = payload

  const project = await prisma.project.findUnique({
    where: { id: projectId }
  })

  if (!project) {
    throw new AppError(404, 'project not found')
  }

  const technology = await prisma.technology.findUnique({
    where: { id: technologyId }
  })

  if (!technology) {
    throw new AppError(404, 'technology not found')
  }

  const result = await prisma.projectTechnology.create({
    data: {
      ...payload
    }
  })

  return result
}




//& get all 
const getProjectTech = async () => {
  const result = await prisma.projectTechnology.findMany({
    include: {
      technology: {
        select: {
          name: true,
          website: true
        }
      }
    }
  })
  return result
}



//& update  
const updateProjectTech = async (id: number, payload: IPTechnologyUpdate) => {

  const tech = await prisma.projectTechnology.findUnique({
    where: { id }
  })

  if (!tech) {
    throw new AppError(404, 'technology not found')
  }

  const result = await prisma.projectTechnology.update({
    where: { id },
    data: {
      ...payload
    },
  })
  return result
}



export const projectTechService = {
  createProjectTech,
  getProjectTech,
  updateProjectTech,

}