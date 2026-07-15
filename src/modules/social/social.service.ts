import { prisma } from "../../lib/prisma"
import { ISocialLink, IUpdateSocialLink } from "./social.interface"



const createSocialLink = async (payload: ISocialLink) => {
  
  const result = await prisma.socialLink.create({
    data: {
      ...payload
    }
  })

  return result
}


//& UPDATE
const updateSocialLink = async (id: number, payload: IUpdateSocialLink) => {
  
  const social = await prisma.socialLink.findUnique({
    where: {id}
  })

  if(!social){
    return null
  }

  const result = await prisma.socialLink.update({
    where: {id},
  
    data: {
      ...payload,
      platform: social.platform
    }
  })

  return result
}



export const socialService = {
  createSocialLink,
  updateSocialLink,

}