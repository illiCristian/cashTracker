import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import budgeRouter from './routes/budgetRouter'


async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.bgGreen.black.bold('Database connected')) 

    } catch (error) {
        console.log(error)
    }
}
const app = express()
connectDB()
app.use(morgan('dev'))

app.use(express.json())

app.use('/api/budget', budgeRouter)

export default app