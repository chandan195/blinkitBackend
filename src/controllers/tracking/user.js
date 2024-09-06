import { Customer, DeliveryPartner } from "../../model/index.js";

export const updateUser = async (req, reply) => {
  try {
    const { userId } = req.user;
    const updateData = req.body;

    let user =
      (await Customer.findById(userId)) ||
      (await DeliveryPartner.findById(userId));

    if (!user) {
      return reply.status(400).send({ message: "User not found" });
    }

    let UserModel;
    if (user.role === "Customer") {
      UserModel = Customer;
    } else if (user.role === "DeliveryPartner") {
      UserModel = DeliveryPartner;
    } else {
      return reply.status(400).send({ message: "Invalid user role" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user.id,
      { $set: updateData },
      { new: true, runValidators: true,}
    );

    if(!updatedUser){
      return reply.status(404).send({ message: "user not found" });
    }

    return reply.send({
      message: "user updated",
      user: updatedUser,
    });
  } catch (error) {
    return reply.status(500).send({ message: "failed to update user" , error: error });
  }
};
