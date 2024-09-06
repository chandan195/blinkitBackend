import { Order } from "../../model/order.js";
import { Branch } from "../../model/branch.js";
import { Customer } from "../../model/user.js";


export const createOrder = async (req, reply) => {
  try {
    const {userId} =req.user;
    const {items ,branch,totalPrice} =req.body;
const customerData = await Customer.findById(userId);
const branchData = await Branch.find(branch);

if(!customerData){
    return reply.status(404).send({message:"Customer not found"});


}

const newOrder = new Order({
    Customer:userId,
    items:items.map((items)=>({
        id:items.id,
        item:items.item,
        count:items.count
    })),
branch,
totalPrice,
deliveryLocation:{
    latitude:customerData.liveLocation.latitude,
    longitude: customerData.liveLocation.longitude,
    address:customerData.address ||"NO Address available"
},

pickupLocation:{
    latitude:branchData.liveLocation.latitude,
    longitude: branchData.liveLocation.longitude,
    address:branchData.address ||"NO Address available"
}
});

const savedOrder = await newOrder.save();
return reply.status(201).send(savedOrder)


  } catch (error) {
    return reply
      .status(500)
      .send({ message: " Failed to create order", error: error });
  }
};




