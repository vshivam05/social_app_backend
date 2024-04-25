import express from "express";
import { getAllBlogs,addBlog, updateBlog , getBlogById, deleteBlog, getByUserId} from "../controller/blog-controller.js";
const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getBlogById);
blogRouter.delete("/delete/:id",deleteBlog);
blogRouter.get('/user/:id',getByUserId);  //get  blogs by user id


export default blogRouter;