import { UploadApiResponse } from "cloudinary"
import { Cloudinary } from "../../lib/cloudinary"
import { prisma } from "../../lib/prisma"
import { IProject, IProjectUpdate } from "./project.interface"



//& create project
const createProjectInto = async (payload: IProject, cover: Express.Multer.File, images: Express.Multer.File[]) => {
  const { title } = payload

  console.log({ cover, images, payload })
  const isProject = await prisma.project.findUnique({
    where: { title }
  })

  if (isProject) {
    throw new Error('this project alrady exist. used different title')
  }

  const coverRes = await new Promise<UploadApiResponse>((resolve, reject) => {
    Cloudinary.cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio/project/cover',
        resource_type: "image"
      },
      async (error, result) => {
        if (error) {
          return reject(error)
        }
        if (!result) {
          return reject(new Error('No result returned from cloudinary'))
        }
        return resolve(result)
      }
    ).end(cover?.buffer)
  })




  const imagesRes = await Promise.all(
    images.map((image) => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        Cloudinary.cloudinary.uploader.upload_stream(
          {
            folder: 'portfolio/project/image',
            resource_type: "image"
          },
          async (error, result) => {
            if (error) {
              return reject(error)
            }
            if (!result) {
              return reject(new Error('No result returned from cloudinary'))
            }
            return resolve(result)
          }
        ).end(image?.buffer)
      })
    })
  )


  const resu = await prisma.project.create({
    data: {
      ...payload,
      cover: coverRes.secure_url,
      coverPublicId: coverRes.public_id,
      images: imagesRes.map((img) => ({
        url: img.secure_url,
        publicId: img.public_id
      }))
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
    },
    orderBy: {
      order: "asc"
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



//& update project
const updateProjectInto = async (id: string, payload: IProjectUpdate, cover: Express.Multer.File, images: Express.Multer.File[]) => {

  const isProject = await prisma.project.findUnique({
    where: { id }
  })

  if (!isProject) {
    return null
  }

  const coverRes = cover ? await new Promise<UploadApiResponse>((resolve, reject) => {
    Cloudinary.cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio/project/cover',
        resource_type: "image"
      },
      async (error, result) => {
        if (error) {
          return reject(error)
        }
        if (!result) {
          return reject(new Error('No result returned from cloudinary'))
        }
        return resolve(result)
      }
    ).end(cover?.buffer)
  }) : null




  const imagesRes = images ? await Promise.all(
    images.map((image) => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        Cloudinary.cloudinary.uploader.upload_stream(
          {
            folder: 'portfolio/project/image',
            resource_type: "image"
          },
          async (error, result) => {
            if (error) {
              return reject(error)
            }
            if (!result) {
              return reject(new Error('No result returned from cloudinary'))
            }
            return resolve(result)
          }
        ).end(image?.buffer)
      })
    })
  ) : null


  const result = await prisma.project.update({
    where: { id },
    data: {
      ...payload,
      ...(coverRes &&
      {
        cover: coverRes.secure_url,
        coverPublicId: coverRes.public_id
      }
      ),
      ...(imagesRes &&
      {
        images: imagesRes.map((img) => ({
          url: img.secure_url,
          publicId: img.public_id
        }))
      }
      )
    }
  })

  //! delete previous files if update files
  if (coverRes && isProject.categoryId) {
    Cloudinary.cloudinary.uploader.destroy(isProject.coverPublicId!, {
      invalidate: true
    })
  }

  if (imagesRes && isProject.images) {
    imagesRes.map((img) => (
      Cloudinary.cloudinary.uploader.destroy(img.public_id, {
        invalidate: true
      })
    ))
  }

  return result
}




export const projectService = {
  createProjectInto,
  getProjectsFromDB,
  getProjectByIdFromDB,
  updateProjectInto
}