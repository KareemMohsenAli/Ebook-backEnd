import mongoose, { Schema, Types, model } from "mongoose";
const bookSchema = new Schema({
    title:String,
    author:String,
    coverImageUrl:String,
    pdfUrl:String,
    categoryName:String,
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
    },
}, 
{
    timestamps:true,
}
)



const bookModel = mongoose.models.Book|| model("Book",bookSchema)


export default bookModel