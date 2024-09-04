import mongoose from "mongoose";
import Counter from "./counter.js";

const orderSchema = new mongoose.Schema({
  orderId: { Type: "String", unique: true },

  customer: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "Customer",
    required: true,
  },

  deliveryPartner: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "DeliveryPartner",
  },

  branch: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "Branch",
    required: true,
  },

  items: [
    {
      id: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "Product",
        required: true,
      },
      items: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "Product",
        required: true,
      },
      count:{type:"Number", required: true},
    },
  ],

  deliveryLocation:{
    latitude:{type:"Number", required: true},
    longitude:{type:"Number", required: true},
    address:{type:"String"},
  },

  pickupLocation:{
    latitude:{type:"Number", required: true},
    longitude:{type:"Number", required: true},
    address:{type:"String"},
  },
  deliveryPartnerLocation:{
    latitude:{type:"Number",},
    longitude:{type:"Number", },
    address:{type:"String"},
  },
  status:{
    type:String,
enum:["available", "confirmed","arriving", "delivered", "cancelled"],
default:"available",
  },
totalPrice:{Type:"Number", required:true},
createdAt:{type:"Date", default:Date.now()},
updatedAt:{type:"Date",default: Date.now()},


});

const Order = mongoose.model(" Order", orderSchema);
export default Order;
