import config from "../../config/env"
import { prisma } from "../../lib/prisma"
import { jwtToken } from "../../utility/jwt"
import { ADMIN, LOGIN } from "./auth.interface"
import bcrypt from 'bcrypt'
import { JwtPayload, SignOptions } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import { AppError } from "../../utility/appError"


//& ADMIN REGISTER
const adminRegisterIntoDB = async (payload: ADMIN) => {
  const { email, password } = payload

  const isAdmin = await prisma.admin.findFirst({
    where: {
      role: "ADMIN"
    }
  })

  if (isAdmin) {
    throw new AppError(400, "Admin already exist!")
  }

  const hasPass = await bcrypt.hash(password as string, Number(config.solt_or_rounds))

  const createdAdmin = await prisma.admin.create({
    data: {
      ...payload,
      role: 'ADMIN',
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
    where: { email },
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
  const { id, name, role } = admin

  const jwtPayload = {
    id,
    name,
    email,
    role,
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

  const { email } = decoded
  // console.log('decoded', decoded)

  const isAdmin = await prisma.admin.findUnique({
    where: { email }
  })


  const jwtPayload = {
    id: isAdmin?.id,
    name: isAdmin?.name,
    email,
    role: isAdmin?.role
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