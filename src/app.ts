import express, { Application, Request, Response } from "express"
import { join } from "node:path"



const app: Application = express()


app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))



app.get('/', (req: Request, res: Response) => {
  const response = {
    sucess: true,
    statusCode: 200,
    author: "Md. Shahdat Hossain",
    message: "this is my portfolio backend"
  }
  res.status(200).json(response)
})



export default app