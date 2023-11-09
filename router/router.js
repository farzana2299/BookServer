const express=require('express')
const router=new express.Router()

const tokenMiddleware=(req,res,next)=>{
    try{
        const token=req.headers["access_token"]
        jwt.verify(token,'adminKey123')
        next()
     
    }
    catch{
        res.status(404).json({
            message:"Token not verified",
            status:false,
            statusCode:404
        })

    }
}

const {addAdmin, addCustomer,adminLogin,customerLogin,adminPsw,
    customerPsw,addBook,editBook,bookList,deleteBook}=require('../Logic/logic')


router.post('/admin/add',addAdmin)
router.post('/customer/add',addCustomer)
router.post('/admin/login',adminLogin)
router.post('/customer/login',customerLogin)
router.put('/admin/resetpsw',adminPsw)
router.put('/customer/resetpsw',customerPsw)
router.post('/book/add',tokenMiddleware,addBook)
router.put('/book/editBook/:id',tokenMiddleware,editBook)
router.get('/book/bookList',bookList)
router.delete('/book/deleteBook/:id',tokenMiddleware,deleteBook)



module.exports={router}
