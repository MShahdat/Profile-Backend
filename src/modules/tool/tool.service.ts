import { prisma } from "../../lib/prisma"
import { ITool, IToolUpdate } from "./tool.interface"



//& tool create
const createTool = async(payload: ITool) => {
  
  const result = await prisma.tool.create({
    data: {
      ...payload
    }
  })

  return result
}



//& get all
const getTools = async() => {
  const result = await prisma.tool.findMany({
    orderBy: {
      order: "asc"
    }
  })
  return result
}

//& tool update
const updateTool = async(id: number, payload: IToolUpdate) => {

  const tool = await prisma.tool.findUnique({
    where: {id}
  })

  if(!tool){
    return null
  }
  
  const result = await prisma.tool.update({
    where: {id},
    data: {
      ...payload
    }
  })

  return result
}


export const toolService = {
  createTool,
  getTools,
  updateTool,

}