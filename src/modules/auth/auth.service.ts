import config from "../../config/env"
import { prisma } from "../../lib/prisma"
import { jwtToken } from "../../utility/jwt"
import { ADMIN, LOGIN} from "./auth.interface"
import bcrypt from 'bcrypt'
import { JwtPayload, SignOptions } from "jsonwebtoken"
import jwt from "jsonwebtoken"


//& ADMIN REGISTER
const adminRegisterIntoDB = async (payload: ADMIN) => {
  const { name, email, password} = payload

  const isAdmin = await prisma.admin.findUnique({
    where: { email }
  })

  if (isAdmin) {
    throw new Error("User already exist!")
  }

  const hasPass = await bcrypt.hash(password as string, Number(config.solt_or_rounds))

  const createdAdmin = await prisma.admin.create({
    data: {
      name,
      email,
      password: hasPass
    }
  })


  const user = await prisma.admin.findUnique({
    where: {
      id: createdAdmin.id,
      email
    },
    omit: {
      password: true
    }
  })

  return user
}



//& LOGIN
const loginFromDB = async (payload: LOGIN) => {
  const { email, password } = payload
  console.log(payload)
  
  const admin = await prisma.admin.findUnique({
    where: { email }
  })

  if (!admin) {
    return null
  }

  const pass = admin.password
  const isMatch = await bcrypt.compare(password, pass)

  if (!isMatch) {
    return 'invalid'
  }

  //& JWT TOKEN GENERATE
  const { id, name } = admin

  const jwtPayload = {
    id,
    name,
    email,
  } as JwtPayload

  console.log('jwt payload ', jwtPayload)

  const accessToken = jwtToken.createToken(
    jwtPayload,
    config.jwt_access_sectet,
    config.jwt_access_expires_in as SignOptions['expiresIn'],
  )

  const refreshToken = jwtToken.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions['expiresIn'],
  )

  const result = {
    accessToken: accessToken,
    refreshToken: refreshToken
  }
  return result
}


//& GENERATE REFRESH TOKEN
const generateAccessToken = async (token: string) => {
  
    if (!token) {
      return 'unauthorized'
    }
    
    const decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string) as JwtPayload

      const {email} = decoded
      // console.log('decoded', decoded)

      const isAdmin = await prisma.admin.findUnique({
        where: {email}
      })
      


      //& TOKEN GENERATE
      const jwtPayload = {
        id: isAdmin?.id,
        name: isAdmin?.name,
        email,
      }
      // console.log(jwtPayload)

      const accessToken = jwtToken.createToken(jwtPayload, config.jwt_access_sectet, config.jwt_access_expires_in as SignOptions['expiresIn']
      )
      // console.log('access token: ', accessToken)

      return accessToken;
}



export const authServices = {
  adminRegisterIntoDB,
  loginFromDB,
  generateAccessToken,

}