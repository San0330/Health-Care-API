const mongoose = require('mongoose')
const fs = require('fs')
const Product = require('../model/productsModel')
const Category = require('../model/categoryModel')
const User = require('../model/userModel')

const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

var db = mongoose.connection
db.on('error', () => console.error("Databse connection error"));
db.once('open', function () {
    console.log("connected")
});

const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'))
const category = JSON.parse(fs.readFileSync(`${__dirname}/categories.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))

async function importProducts() {
    try {
        await Product.create(products)
        console.log("Data successfully loaded")
    } catch (e) {
        console.log(e)
    }
    process.exit()
}

async function importUsers() {
    try {
        await User.create(users)
        console.log("Data successfully loaded")
    } catch (e) {
        console.log(e)
    }
    process.exit()
}

async function importCategory() {
    try {
        await Category.create(category)
        console.log("Data successfully loaded")
    } catch (e) {
        console.log(e)
    }
    process.exit()
}

async function exportProduct() {
    try {
        var allproduct = JSON.stringify(await Product.find())
        fs.writeFileSync("test.json", allproduct)
    } catch (e) {
        console.log(e)
    }
    process.exit()
}

async function exportUsers() {
    try {        
        var allusers = JSON.stringify(await User.find())
        fs.writeFileSync("test.json", allusers)
    } catch (e) {
        console.log(e)
    }
    process.exit()
}

async function exportcategory() {
    try {
        var allCategory = JSON.stringify(await Category.find())
        fs.writeFileSync("test.json", allCategory)
    } catch (e) {
        console.log(e)
    }
    process.exit()
}

async function deleteAllProducts() {
    try {
        await Product.deleteMany()
        console.log("Data successfully deleted")
    } catch (e) {
        console.log(e)
    }
    process.exit()
}

async function deleteAllCategory() {
    try {
        await Category.deleteMany()
        console.log("Data successfully deleted")
    } catch (e) {
        console.log(e)
    }
    process.exit()
}

async function deleteAllUsers() {
    try {
        await User.deleteMany()
        console.log("Data successfully deleted")
    } catch (e) {
        console.log(e)
    }
    process.exit()
}


switch (process.argv[2]) {
    case "--importproduct":
        importProducts()
        break;
    case "--exportproduct":
        exportProduct()
        break;
    case "--deleteproduct":
        deleteAllProducts()
        break;
    case "--importcategory":
        importCategory()
        break;
    case "--exportcategory":
        exportcategory()
        break;
    case "--deletecategory":
        deleteAllCategory()
        break;
    case "--importusers":
        importUsers()
        break;
    case "--exportusers":
        exportUsers()
        break;
    case "--deleteusers":
        deleteAllUsers()
        break;
}