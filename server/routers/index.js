const Router=require('express')
const router=new Router()
const userRouter=require('./usersRouter')


router.use('/user', userRouter);

module.exports=router