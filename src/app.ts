import express, { Application, Request, Response } from "express"
import { rootResponse } from "./utility/sendResponse"
import { authRouter } from "./modules/auth/auth.route"
import cookieParser from "cookie-parser"
import { adminRouter } from "./modules/admin/admin.route"
import { notFound } from "./middleware/notFound"
import { headingRouter } from "./modules/heading/heading.route"
import { toolRouter } from "./modules/tool/tool.route"
import { skillRouter } from "./modules/skill/skill.route"
import { technologyRouter } from "./modules/technology/technology.route"
import { projectRouter } from "./modules/project/project.route"
import { categoryRouter } from "./modules/category/category.route"
import { projectTechRouter } from "./modules/projectTechnology/projectTechnology.route"
import { serviceRouter } from "./modules/service/service.route"
import { educationRouter } from "./modules/education/education.route"
import { contactRouter } from "./modules/contact/contact.route"
import { siteConfigRouter } from "./modules/siteConfig/siteConfig.route"
import { globalErrorHandler } from "./middleware/globalError"
import config from "./config/env"
import cors from 'cors'


const app: Application = express()

app.use(cors({
  origin: [
    `${config.frontend_url}`,
    'http://localhost:5173'
  ],
  credentials: true
})
)
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


app.get('/', (req: Request, res: Response) => {
  rootResponse(res)
})



app.use('/api/v1/site-config', siteConfigRouter)

app.use('/api/v1/auth', authRouter)


app.use('/api/v1/admin', adminRouter)


app.use('/api/v1/heading', headingRouter)


app.use('/api/v1/tool', toolRouter)


app.use('/api/v1/skill', skillRouter)


app.use('/api/v1/technology', technologyRouter)


app.use('/api/v1/categories', categoryRouter)


app.use('/api/v1/projects', projectRouter)


app.use('/api/v1/project-technology', projectTechRouter)


app.use('/api/v1/services', serviceRouter)


app.use('/api/v1/education', educationRouter)


app.use('/api/v1/contact', contactRouter)


app.use(notFound)
app.use(globalErrorHandler)

export default app