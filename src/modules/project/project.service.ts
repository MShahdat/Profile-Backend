import { prisma } from "../../lib/prisma"
import { IProject } from "./project.interface"



//& create project
const createProjectInto = async (payload: IProject) => {
  const { title } = payload

  const isProject = await prisma.project.findUnique({
    where: { title }
  })

  if (isProject) {
    return 'exist'
  }

  const resu = await prisma.project.create({
    data: {
      ...payload
    }
  })

  return resu
}



//& get profects
const getProjectsFromDB = async () => {
  const result = await prisma.project.findMany({
    include: {
      technologies: {
        select: {
          technology: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })
  return result
}



//& get by id
const getProjectByIdFromDB = async (id: string) => {

  const result = await prisma.project.findUnique({
    where: { id },
    include: {
      technologies: {
        select: {
          technology: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  return result
}


export const projectService = {
  createProjectInto,
  getProjectsFromDB,
  getProjectByIdFromDB
}