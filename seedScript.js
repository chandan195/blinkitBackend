import "dotenv/config.js";
import mongoose from "mongoose";
import { Category,Product } from "./src/model/index.js";
import { categories,products } from "./seedData.js";

async function seedDataBase() {
    try {
       await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany({});
        await Category.deleteMany({});

        const categoryDocs = await Category.insertMany(categories);
        const categoryMap = categoryDocs.reduce((map, category)=>{
            map[category.name] = category._id;
            return map;
        },{})

        const ProductWithCategoryId =products.map((product)=>({
            ...product,
            category:categoryMap[product.category]
        }));

        await Product.insertMany(ProductWithCategoryId);

        console.log("Database seeded successfully");
    } catch (error) {
      console.log("Seed data base error",error);  
    } finally{
        mongoose.connection.close();
    }
    
};

seedDataBase();