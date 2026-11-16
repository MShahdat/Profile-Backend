import { UploadApiResponse } from "cloudinary"
import { Cloudinary } from "../../lib/cloudinary"
import { prisma } from "../../lib/prisma"
import { ISiteConfigFormPayload } from "./siteConfig.interface"
import { AppError } from "../../utility/appError"


//& CREATE
const createSiteConfig = async (payload: any, image: Express.Multer.File, resume: Express.Multer.File, cv: Express.Multer.File) => {
  console.log({
    image,
    resume,
    cv,
    payload
  })

  const imageResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
    Cloudinary.cloudinary.uploader.upload_stream(
      {
        folder: `portfolio/${'image'}`,
        overwrite: true,
        resource_type: "image"
      },
      async (error, result) => {
        if (error) {
          return reject(error)
        }
        if (!result) {
          return reject(new Error('No result return from cloudinary'))
        }
        return resolve(result)
      }
    ).end(image.buffer)
  })

  const resumeResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
    Cloudinary.cloudinary.uploader.upload_stream(
      {
        folder: `portfolio/${'resume'}`,
        overwrite: true,
        resource_type: "auto"
      },
      async (error, result) => {
        if (error) {
          return reject(error)
        }
        if (!result) {
          return reject(new Error('No result return from cloudinary'))
        }
        return resolve(result)
      }
    ).end(resume.buffer)
  })

  const cvResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
    Cloudinary.cloudinary.uploader.upload_stream(
      {
        folder: `portfolio/${'cv'}`,
        overwrite: true,
        resource_type: "auto"
      },
      async (error, result) => {
        if (error) {
          return reject(error)
        }
        if (!result) {
          return reject(new Error('No result return from cloudinary'))
        }
        return resolve(result)
      }
    ).end(cv.buffer)
  })

  const siteConfig = await prisma.siteConfig.create({
    data: {
      ...payload,
      image: imageResponse.secure_url,
      imagePublicId: imageResponse.public_id,
      resumeUrl: resumeResponse.secure_url,
      resumePublicId: resumeResponse.public_id,
      cvUrl: cvResponse.secure_url,
      cvPublicId: cvResponse.public_id
    }
  })

  return siteConfig

}


//& GET
const getSiteConfig = async () => {
  const siteCongig = await prisma.siteConfig.findMany();
  return siteCongig
}


//& GET BY ID
const getSiteConfigById = async (id: string) => {
  const siteCongig = await prisma.siteConfig.findUnique({
    where: { id }
  });

  if (!siteCongig) {
    throw new AppError(404, 'config not found')
  }

  return siteCongig
}



//& UPDATE
const updateSiteConfig = async (payload: any, id: string) => {

  const siteConfig = await prisma.siteConfig.findUnique({
    where: { id }
  })

  if (!siteConfig) {
    throw new AppError(404, 'site config not found')
  }

  // Only upload if the file was actually sent
  const imageResponse = payload.image
    ? await new Promise<UploadApiResponse>((resolve, reject) => {
      Cloudinary.cloudinary.uploader.upload_stream(
        {
          folder: `portfolio/image`,
          overwrite: true,
          resource_type: "auto"
        },
        (error, result) => {
          if (error) return reject(error)
          if (!result) return reject(new Error('No result return from cloudinary'))
          return resolve(result)
        }
      ).end(payload.image.buffer)
    })
    : null

  const resumeResponse = payload.resume
    ? await new Promise<UploadApiResponse>((resolve, reject) => {
      Cloudinary.cloudinary.uploader.upload_stream(
        {
          folder: `portfolio/resume`,
          overwrite: true,
          resource_type: "auto"
        },
        (error, result) => {
          if (error) return reject(error)
          if (!result) return reject(new Error('No result return from cloudinary'))
          return resolve(result)
        }
      ).end(payload.resume.buffer)
    })
    : null

  const cvResponse = payload.cv
    ? await new Promise<UploadApiResponse>((resolve, reject) => {
      Cloudinary.cloudinary.uploader.upload_stream(
        {
          folder: `portfolio/cv`,
          overwrite: true,
          resource_type: "auto"
        },
        (error, result) => {
          if (error) return reject(error)
          if (!result) return reject(new Error('No result return from cloudinary'))
          return resolve(result)
        }
      ).end(payload.cv.buffer)
    })
    : null

  const updatedSiteConfig = await prisma.siteConfig.update({
    where: { id },
    data: {
      ...(payload.data ? payload.data : {}),
      ...(imageResponse && {
        image: imageResponse.secure_url,
        imagePublicId: imageResponse.public_id
      }),
      ...(resumeResponse && {
        resumeUrl: resumeResponse.secure_url,
        resumePublicId: resumeResponse.public_id
      }),
      ...(cvResponse && {
        cvUrl: cvResponse.secure_url,
        cvPublicId: cvResponse.public_id
      })
    }
  })

  // Only delete the OLD asset if a NEW one was uploaded to replace it
  if (imageResponse && siteConfig.imagePublicId) {
    await Cloudinary.cloudinary.uploader.destroy(siteConfig.imagePublicId, {
      invalidate: true
    })
  }

  if (resumeResponse && siteConfig.resumePublicId) {
    await Cloudinary.cloudinary.uploader.destroy(siteConfig.resumePublicId, {
      invalidate: true
    })
  }

  if (cvResponse && siteConfig.cvPublicId) {
    await Cloudinary.cloudinary.uploader.destroy(siteConfig.cvPublicId, {
      invalidate: true
    })
  }

  return updatedSiteConfig

}

export const siteConfigService = {
  createSiteConfig,
  getSiteConfig,
  updateSiteConfig,
  getSiteConfigById
}