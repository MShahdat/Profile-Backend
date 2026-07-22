import { prisma } from "../../lib/prisma"
import { IPTechnology } from "./projectTechnology.interface"




//& create
const createProjectTech = async (payload: IPTechnology) => {
  const { projectId, technologyId } = payload

  const project = await prisma.project.findUnique({
    where: { id: projectId }
  })

  if (!project) {
    throw new Error('project not found')
  }

  const technology = await prisma.technology.findUnique({
    where: { id: technologyId }
  })

  if (!technology) {
    throw new Error('technology not found')
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



export const projectTechService = {
  createProjectTech,
  getProjectTech,

}