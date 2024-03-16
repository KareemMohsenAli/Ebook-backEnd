import bookModel from "../../../../DB/models/Ebook.model.js";
import cloudinary from "../../../utils/cloudinary.js";

export const createBook=async (req, res) => {
    const uploadCoverImage = cloudinary.uploader.upload(req.files['coverImage'][0].path, {
      resource_type: 'image',
      folder: 'books',
    });

    const uploadPdfFile = cloudinary.uploader.upload(req.files['pdfFile'][0].path, {
      resource_type: 'raw',
      folder: 'books',
    });

    const [coverImageResult, pdfFileResult] = await Promise.all([uploadCoverImage, uploadPdfFile]);
    const book = new bookModel({
      title: req.body.title,
      categoryName: req.body.categoryName,
      author: req.body.author,
      coverImageUrl: coverImageResult.secure_url,
      createdBy:req.user._id,
      pdfUrl: pdfFileResult.secure_url,
    });
    await book.save();
    res.json(book);

}

export const getBooks = async (req, res) => {
    const books = await bookModel.find({}).populate("createdBy","-password");
    res.json(books);
}
