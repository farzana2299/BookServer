const express = require('express')
const { admin, customer, book } = require('../models/models')
const jwt = require('jsonwebtoken')

//add admin
addAdmin = async (req, res) => {
    const { name, email, psw, mobile } = req.body
    if (!name || !email || !psw || !mobile) {
        res.statusCode(400).json("All inputs are required")
    }
    try {
        const preAdmin = await admin.findOne({ email })
        if (preAdmin) {
            res.statusCode(403).json("Admin Already present")
        }
        else {
            //create object for admin
            const newAdmin = new admin({ name, email, psw, mobile })
            await newAdmin.save()
            res.statusCode(200).json(newAdmin)
        }
    }
    catch {
        res.statusCode(400).json(err)
    }
}
//add customer
addCustomer = async (req, res) => {
    const { name, email, psw, mobile, location } = req.body
    if (!name || !email || !psw || !mobile || !location) {
        res.statusCode(400).json("All inputs are required")
    }
    try {
        const preCustomer = await customer.findOne({ email })
        if (preCustomer) {
            res.statusCode(403).json("User Already present")
        }
        else {
            //create object for customer
            const newCustomer = new customer({ name, email, psw, mobile, location })
            await newCustomer.save()
            res.statusCode(200).json(newCustomer)
        }
    }
    catch {
        res.statusCode(400).json(err)
    }
}

//admin login
adminLogin = async (req, res) => {
    const { email, psw } = req.body
    try {
        const preadmin = await admin.findOne({ email, psw })
        if (preadmin) {
            //token generation
            const token = jwt.sign({ email }, 'adminKey123')
            currentemail = preadmin.email,
                currentemail = preadmin.psw,
                token
            res.statusCode(200).json(preadmin, "Login Succesfull")
        }
        else {
            res.statusCode(404).json("No such Admin")
        }
    }
    catch {
        res.statusCode(400).json(err)
    }

}
//customer login
customerLogin = async (req, res) => {
    const { email, psw } = req.body
    try {
        const precustomer = await customer.findOne({ email, psw })
        if (precustomer) {
            res.statusCode(200).json(precustomer, "Login Successfull")
        } else {
            res.statusCode(404).json("No such User")
        }
    }
    catch {
        res.statusCode(400).json(err)
    }

}
//reset password for admin
adminPsw = async (req, res) => {
    const { name, email, psw, mobile } = req.body
    if (!name || !email || !psw || !mobile) {
        res.statusCode(400).json("All inputs are required")
    }
    try {
        const Preadmin = await admin.findOne({ email })
        if (Preadmin) {
            Preadmin.psw = psw
            await Preadmin.save()
            res.statusCode(200).json(Preadmin)
        }

    }
    catch {
        res.statusCode(400).json(err)
    }

}
//reset password for customer
customerPsw = async (req, res) => {
    const { name, email, psw, mobile, location } = req.body
    if (!name || !email || !psw || !mobile || !location) {
        res.statusCode(400).json("All inputs are required")
    }
    try {
        const Precustomer = await customer.findOne({ email })
        if (Precustomer) {
            Precustomer.psw = psw
            await Precustomer.save()
            res.statusCode(200).json(Precustomer)
        }

    }
    catch {
        res.statusCode(400).json(err)
    }

}
//add book
addBook = async (req, res) => {
    const { id, name, author, title, category, pYear } = req.body
    if (!id || !name || !author || !title || !category || !pYear) {
        res.statusCode(400).json("All inputs are required")
    }
    try {
        const preBook = await book.findOne({ id })
        if (preBook) {
            res.statusCode(403).json("This Book Already present")
        }
        else {
            //create object for book
            const newBook = new book({ id, name, author, title, category, pYear })
            await newBook.save()
            res.statusCode(200).json(newBook)
        }
    }
    catch {
        res.statusCode(400).json(err)
    }
}

//edit book
editBook = async (req, res) => {
    const { id } = req.params
    const { name, author, title, category, pYear } = req.body
    if (!id || !name || !author || !title || !category || !pYear) {
        res.statusCode(400).json("All Inputs Required")
    }
    try {
        const preBook = await book.findOne({ id })
        if (preBook) {
            preBook.name = name
            preBook.author = author
            preBook.title = title
            preBook.category = category
            preBook.pYear = pYear
            preBook.save()
            res.statusCode(200).json(preBook)
        }
    }
    catch {
        res.statusCode(404).json(err)
    }
}

//list of books
bookList = async (req, res) => {
    //access search data
    const { search } = req.query
    const query = {
        name: { $regex: search, $options: i },
        author: { $regex: search, $options: i },
        pYear: { $regex: search, $options: i }
    }
    try {
        const allBook = await book.find(query)
        res.statusCode(200).json(allBook)
    }
    catch {
        res.statusCode(400).json(err)
    }

}

//delete book
deleteBook = async (req, res) => {
    const { id } = req.params
    try {
        const preBook = await book.findByIdAndDelete({ id })
        res.statusCode(200).json(preBook)
    }
    catch {
        res.statusCode(400).json(err)
    }
}

module.exports = {
    addAdmin, addCustomer, adminLogin, customerLogin,
    adminPsw, customerPsw, addBook, editBook, bookList, deleteBook
}