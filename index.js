import path from 'path'
import cors from 'cors'
import { fileURLToPath } from "url"
import dotenv from 'dotenv'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname , `./config/.env`)})
import  express  from "express"
import bootstrap from "./src/index.router.js"
const app = express()
const port = process.env.PORT || 5000
app.use(`/uploads`,express.static("./src/uploads"))
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
app.use(cors(corsOptions));
bootstrap(app,express)
app.listen(port,()=>{
    console.log(`port is running on port.......${port}`);
})
