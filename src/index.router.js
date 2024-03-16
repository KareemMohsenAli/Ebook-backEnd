import DBconnection from "../DB/connection.js"
import authRouter from "./modules/auth/auth.router.js"
import bookRouter from "./modules/Book/book.router.js"
import { globalErrorHandelling } from "./utils/errorHandeling.js"
const bootstrap = (app,express) =>{
    app.use(express.json());
    app.use(`/auth`,authRouter)
    app.use(`/book`,bookRouter)
    app.all(`*`,(req,res,next)=>{
        res.status(404).json({message:"In-Valid routing"})
    })
    app.use(globalErrorHandelling)
    DBconnection()
}

export default bootstrap