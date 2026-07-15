import { prisma } from "../../lib/prisma"
import { IHero } from "./hero.interface"


const createHeroIntoDB = async(payload: IHero) => {
  
  const result = await prisma.hero.upsert({
    where: {id: 1},
    create: {
      ...payload
    }, 
    update: {
      ...payload
    }
  })

  return result
}



export const heroService = {
  createHeroIntoDB
}