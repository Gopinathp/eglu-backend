const mongoose = require("mongoose");
const {Schema,model} = mongoose;


const ApprovalState = new Schema({
    ApprovalState:{
         approved_by:{type:String},
        
    }
});


const Comment = new Schema({
    Comment:[{
     msg:{type:String},
     author_id:{type:String},
     author_name:{type:String}
    }]
 });

const PrepackagedKit= new Schema({
    PrepackagedKit:{
        name:{type:String},
        key:{type:String},
        composition:{type:Number}       // product Id to number of products
    }
});

const StickerData = new Schema({
    StickerData:{
        name:{type:String},
        model_no:{type:String},
        key_spec:{type:String}
    }
});


const PackagingData = new Schema({
    PackagingData:{
        name:{type:String},
        contents:{type:String},
        mrp:{type:String},
        offer_price:{type:String},
        CurrencyType:{
           type:String,
           enum : ['INR','USD']
        }
    }
});

const ProvisioningData = new Schema({
    ProvisioningData:{  
   ...PackagingData.obj,
   ...StickerData.obj
    }
});

const SalesData = new Schema({
    SalesData:{ 
     is_selling:{type:Boolean},
     product_rank:{type:Number},
     hsn_code:{type:String},
     gst_percent:{type:Number},
     model:{type:String},
     name:{type:String},
     title_in_invoice:{type:String},
     description:{type:String}
}
});


const AppInfo = new Schema({
    AppInfo:[{
        app_id:{type:Number},
        type:{type:String},
        name:{type:String},
        is_online_only:{type:Boolean},
        alias_app_id:{type:Number},
        icon_path:{type:String}
    }]
});

const SoftwareSpecificData = new Schema({
    SoftwareSpecificData :{ 
    released_node_type:{type:String},
    ...AppInfo.obj,
    icon_path:{type:String},
    commissioning_button_icon_path:{type:String},
    commissioning_success_icon_path:{type:String},
    description:{type:String},
    show_in_add_node:{type:Boolean},
    sort_order_add_node:{type:Number},
    manual_url:{type:String}
}
});

const HardwareProperties = new Schema({
    HardwareProperties:{
                   weight_in_grams:{type:Number},
                   is_sensor:{type:Boolean},
                   is_powered_device:{type:Boolean},
                   is_repeater:{type:Boolean},
                   is_master:{type:Boolean},
                   color:{type:String},
                   power_source:{type:String},
                   box_size:{type:String}
               }
});

const ProductInfo = new Schema({
    ProductInfo:{   sr_number:{type:Number},
    name:{type:String},
    product_code:{type:String},
    ...HardwareProperties.obj,
    ...SoftwareSpecificData.obj,
    ...SalesData.obj,
    ...ProvisioningData.obj
}
});


const SellingProduct = new Schema({
    SellingProduct:{  
        _id:{type:String},
     data:{
            ...ProductInfo.obj,
            ...PrepackagedKit.obj
     },
     ...Comment.obj,
     is_published:{type:String},
     ...ApprovalState.obj
    }
});

const RegionCode = new Schema({
    RegionCode:{
    type:String,
    enum : ['UNDEFINED','INDIA','MIDDLE_EAST']
    }
});

const Log = new Schema({
    Log:{
    _id:{type:String},
    user_id:{type:String},
    details:{type:String},
    type:{
        type:String,
        enum:['CREATE','EDIT','DELETE']
    }
  }
});


const Product = new Schema({
   ...Log.obj,
   ...SellingProduct.obj,
   ...RegionCode.obj
})




module.exports = model('Product',Product);