import path from "path";
import config from "../../config/env";
import { transporter } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";
import { IContact } from "./contact.interface";
import ejs from 'ejs'



//* create contact
const createContact = async (payload: IContact) => {

  const result = await prisma.contact.create({
    data: {
      ...payload
    }
  })

  const receiveData = {
    name: payload.name,
    email: payload.email,
    message: payload.message
  }

  const htmlReceive = await ejs.renderFile(
    path.join(process.cwd(), 'src/templete/receiveMail.ejs'),
    receiveData
  )

  await transporter.sendMail({
    from: payload.email,
    to: config.smtp_sender,
    subject: `New Contact Message from '${payload.name}'`,
    html: htmlReceive
  })


  const replyData = {
    name: payload.name,
    message: payload.message
  }
  const html = await ejs.renderFile(
    path.join(process.cwd(), 'src/templete/replyMail.ejs'),
    replyData
  )

  await transporter.sendMail({
    from: config.smtp_sender,
    to: payload.email,
    subject: `Thanks for reaching out, '${payload.name}'!`,
    html: html
  })

  return result
}



//* get contact information
const getContact = async () => {

  const result = await prisma.contact.findMany({
    // orderBy: {
    //   createdAt: "asc"
    // }
  })
  return result
}


export const contactService = {
  createContact,
  getContact,

}


