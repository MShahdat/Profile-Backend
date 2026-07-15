import express, { Application, Request, Response } from "express"
import { rootResponse } from "./utility/sendResponse"
import { authRouter } from "./modules/auth/auth.route"
import cookieParser from "cookie-parser"
import { adminRouter } from "./modules/admin/admin.route"
import { notFound } from "./middleware/notFound"
import { headingRouter } from "./modules/heading/heading.route"
import { heroRouter } from "./modules/hero/hero.route"
import { socialRouter } from "./modules/social/social.route"



const app: Application = express()


app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


app.get('/', (req: Request, res: Response) => {
  rootResponse(res)
})



app.use('/api/auth', authRouter)


app.use('/api/admin', adminRouter)


app.use('/api/heading', headingRouter)


app.use('/api/hero', heroRouter)


app.use('/api/social-link', socialRouter)


app.use(notFound)

export default app