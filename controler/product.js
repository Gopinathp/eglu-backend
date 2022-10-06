const Product = require("../model/product");
let success = false;

const productCreate = async (req,res) =>{
   
    try{
        
        if(req.body.SellingProduct.data.ProductInfo && req.body.SellingProduct.data.PrepackagedKit){
            return res.status(400).json(`please fill only one field SellingProduct.data.ProductInfo or SellingProduct.data.PrepackagedKit `);
        }

        // check product_id is unique
        let product = await Product.findOne({'SellingProduct._id':req.body.SellingProduct._id});
        if(product){
            success = false;
          return res.status(400).json(`${req.body.SellingProduct._id} This product id is already exist`);
        }
      

        // data store in data base
         product = await Product.create(req.body);
      
         success = true;
         return res.status(200).json({success,message:"Data created successfully",response:product});
        }catch(err){
            console.log(err.message);
          return res.status(500).json({success, errors: "Internal server Error" });
        }
    
}

const productGet = async (req,res) =>{
    try{
        success=false;
        const product = await Product.find();
        success=true;
        return res.status(200).json({success,message:"Data find successfully",response:product});
        }catch(err){
            console.log(err.message);
            return res.status(500).json({success, errors: "Internal server Error" });
        }
}

module.exports = {productCreate,productGet}