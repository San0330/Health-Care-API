const multer = require('multer')    // File/Image upload library
const sharp = require('sharp')      // Image processing library

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images/products')
//     },
//     filename: (req, file, cb) => {
//         const extension = file.mimetype.split('/')[1]
//         cb(null, `product-${req.user.id}-${Date.now()}.${extension}`)
//     }
// })

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new ApiError('Not an image', 400), false)
    }
}

exports.resizeImage = (req, res, next) => {
    if (!req.file)
        return next()

    var prefix = req.imageName
    req.file.filename = `${prefix}-${req.user.id}-${Date.now()}.jpeg`

    sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/${req.file.filename}`)

    next()
}

// path to uploaded image
upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

exports.uploadImage = upload.single('image')