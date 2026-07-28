import { prisma } from "../../lib/prisma"
import { IHero } from "./hero.interface"


//& create hero
const createHeroIntoDB = async (payload: IHero) => {
  const result = await prisma.hero.upsert({
    where: { id: 1 },
    create: {
      ...payload
    },
    update: {
      ...payload
    }
  })

  return result
}



//& get hero
const getHeroFromDB = async () => {

  const result = await prisma.hero.findFirst()

  return result
}



export const heroService = {
  createHeroIntoDB,
  getHeroFromDB,
}