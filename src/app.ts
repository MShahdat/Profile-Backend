import express, { Application, Request, Response } from "express"
import { rootResponse } from "./utility/sendResponse"
import { authRouter } from "./modules/auth/auth.route"
import cookieParser from "cookie-parser"



const app: Application = express()


app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


app.get('/', (req: Request, res: Response) => {
  rootResponse(res)
})



app.use('/api/auth', authRouter)


export default app