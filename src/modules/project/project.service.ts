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
  const result = await prisma.project.findMany()
  return result
}



export const projectService = {
  createProjectInto,
  getProjectsFromDB,

}