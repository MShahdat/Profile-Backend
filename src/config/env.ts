import dotenv from 'dotenv'
import path from 'path'



dotenv.config({ path: path.join(process.cwd(), ".env") })

const config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  solt_or_rounds: process.env.SOLT_OR_ROUNDS,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_sectet: process.env.JWT_ACCESS_SECRET!,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN!,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN!,
  backend_url: process.env.BACKEND_URL!,
  frontend_url: process.env.FRONTEND_URL!,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY!,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET!,
  super_admin_name: process.env.SUPER_ADMIN_NAME!,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL!,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD!,
  smtp_user: process.env.SMTP_USER!,
  smtp_sender: process.env.SMTP_SENDER!,
  smtp_password: process.env.SMTP_PASSWORD!,
}


export default config