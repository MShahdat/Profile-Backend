import { prisma } from "../../lib/prisma";
import { IContact } from "./contact.interface";




//* create contact
const createContact = async (payload: IContact) => {

  const result = await prisma.contact.create({
    data: {
      ...payload
    }
  })


  return result
}



//* get contact information
const getContact = async () => {

  const result = await prisma.contact.findMany()
  return result
}


export const contactService = {
  createContact,
  getContact,

}


