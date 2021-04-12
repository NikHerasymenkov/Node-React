require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models=require('./models/models')
const cors=require('cors')
const router=require('./routers/index')
const errorMiddleware=require('./middelware/ErrorMiddleware')


PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',router)


app.use(errorMiddleware)



const start = async () => {
try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))

}catch (e){
    console.log(e)
}
}
start()

