import express, { Application, Request, Response } from "express"
import { rootResponse } from "./utility/sendResponse"
import { authRouter } from "./modules/auth/auth.route"
import cookieParser from "cookie-parser"
import { adminRouter } from "./modules/admin/admin.route"
import { notFound } from "./middleware/notFound"
import { headingRouter } from "./modules/heading/heading.route"
import { heroRouter } from "./modules/hero/hero.route"
import { socialRouter } from "./modules/social/social.route"
import { aboutRouter } from "./modules/about/about.route"
import { toolRouter } from "./modules/tool/tool.route"
import { skillCategoryRouter } from "./modules/skillCategory/category.route"
import { skillRouter } from "./modules/skill/skill.route"
import { technologyRouter } from "./modules/technology/technology.route"
import { projectRouter } from "./modules/project/project.route"
import { categoryRouter } from "./modules/category/category.route"
import { projectTechRouter } from "./modules/projectTechnology/projectTechnology.route"
import { serviceRouter } from "./modules/service/service.route"



const app: Application = express()


app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


app.get('/', (req: Request, res: Response) => {
  rootResponse(res)
})



app.use('/api/auth', authRouter)


app.use('/api/admin', adminRouter)


app.use('/api/heading', headingRouter)


app.use('/api/hero', heroRouter)


app.use('/api/social-link', socialRouter)


app.use('/api/about', aboutRouter)


app.use('/api/tool', toolRouter)


app.use('/api/skill-category', skillCategoryRouter)


app.use('/api/skill', skillRouter)


app.use('/api/technology', technologyRouter)


app.use('/api/categories', categoryRouter)


app.use('/api/projects', projectRouter)


app.use('/api/project-technology', projectTechRouter)


app.use('/api/services', serviceRouter)


app.use(notFound)

export default app