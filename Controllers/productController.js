const Product = require("../Models/productModel");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const ErrorHandler = require("../Utils/errorHandlers");
exports.create = async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            rating: req.body.rating,
            brand: req.body.brand,
            sellerId: req.user._id,
            category: req.body.category,
        });

        // console.log(req)
        res.status(200).json({
            success: true,
            product,
        });
    } catch (e) {
        console.log(e);
        res.status(403).json({
            success: false,
        });
    }
};
// exports.getAllProduct = async (req, res) => {
//     try {
//         // const products=await Product.find({$or:[{name:{$regex:req.query.keyword,$options:'i'}},{brand:{$regex:req.query.keyword,$options:'i'}}]})
//         const resultPerPage = 20;
//         const { page, keyword, price } = req.query;
//         // console.log(!!keyword);
//         const skip = resultPerPage * (page - 1);
//         let filter = [];
//         // filter.push('hi')
//         keyword &&
//             filter.push({
//                 $or: [
//                     { name: { $regex: keyword, $options: "i" } },
//                     { brand: { $regex: keyword, $options: "i" } },
//                 ],
//             });
//         // price &&
//         //     filter.push({ price: price });
//         // console.log(price)
//         let priceInString = JSON.stringify(price);
//         priceInString = priceInString.replace(
//             /\b(gt|gte|lt|lte)\b/g,
//             (key) => `$${key}`
//         );
//         // console.log(priceInString)
//         const priceInParse = JSON.parse(priceInString);
//         // console.log(priceInParse)
//         price && filter.push({ "price": priceInParse });
//         // (gtPrice || ltPrice) &&
//         //     filter.push({ price: { $gte: gtPrice?gtPrice:0, $lte: ltPrice?ltPrice:Infinity } })
//         // console.log(filter);
//         // const product = await Product.find({
//         //     $and: [
//         //         {
//         //             $or: [
//         //                 { name: { $regex: keyword, $options: "i" } },
//         //                 { brand: { $regex: keyword, $options: "i" } },
//         //             ]
//         //         },
//         //         {
//         //             $or: [
//         //                 { price: { $gt: gtPrice, $lt: ltPrice } },
//         //                 { price: gtPrice },
//         //                 { price: ltPrice },
//         //             ]
//         //         }
//         //     ]
//         // })
//         //     .skip(skip)
//         //     .limit(resultPerPage);
//         // console.log(typeof(req.query.page))
//         let product = [];
//         if (!filter.length) {
//             product = await Product.find();
//         } else {
//             product = await Product.find({ $and: filter });
//         }
    
//         if (!product.length) {
//             res.status(404).json({
//                 message: "product not found",
//             });
//             return
//         }
//         res.json({
//             product,
//             // final
//         });
//     } catch (e) {
//         console.log(e);
//     }
// };

exports.getAllProduct = async (req,res)=>{
    try{
        const {priceGt ,priceLt, page}= req.query
        const resultPerPage = 5;
        const skip = resultPerPage * (page - 1);
        const product = await Product.aggregate([
            {
                $match:{
                    price:{$gte:Number(priceGt),$lte:Number(priceLt)}
                }
            }
            ,
            {
                $facet:{
                    metaData:[
                        {
                            $count:"total"
                        }
                    ],
                    data:[
                        {
                            $skip:skip
                        },{
                            $limit:resultPerPage
                        }
                    ]
                }
            }
            
        ])
        // {
            // $lookup:{
            //     from:"users",
            //     localField:"sellerId",
            //     foreignField:"_id",
            //     as:"seller"
            // }
        // }
        res.json({
            product
        })
    }catch(e){
        console.log(e)
    }
};
exports.getProductDetails = catchAsyncErrors ( async (req,res,next)=>{
    const product = await Product.findById(req.params._id).populate("sellerId");
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.json({
        product
    });
})