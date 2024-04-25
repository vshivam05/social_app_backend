import User from "../model/User.js";
import Blog from "../model/blog.js";
import mongoose from "mongoose";
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (e) {
    return console.Console.log(e);
  }

  if (!blogs) {
    return res.status(404).json({ message: "blog doesn't exists" });
  }

  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (e) {
    return console.log(e);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by thid id" });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }

  return res.status(200).json({ blog });
};

// update blog .......................

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (e) {
    return console.log(e);
  }

  if (!blog) {
    return res.status(500).json({ message: "blog not exits" });
  }

  return res.status(200).json({ blog });
};

// get by id ..................................................
export const getBlogById = async (req, res, next) => {
  const _id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(_id);
  } catch (e) {
    return console.log(e);
  }
  if (!blog) {
    return res.status(404).json({ message: "blog doesn't exists" });
  }

  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const _id = req.params.id;
  console.log("hello");
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(_id).populate('user');
    await blog.user.blogs.pull(blog);
    await blog.user.save();

  } catch (e) {
    return res.status(404).json({ message: "internal error" });
  }
  if (!blog) {
    return res.status(500).json({ message: "blog not exists" });
  }
  return res.status(200).json({ message: "deleted successfully" });
};

// ...... get user blogs by id
export const getByUserId = async(req, res, next)=>{

  const  userId = req.params.id;
  let userBlogs;
  try{
    userBlogs = await User.findById(userId).populate("blogs");

  }catch(e){
return console.log(e);

  }

  if(!userBlogs){
    return res.status(404).json({message:"no blogs found"})
  }

  return res.status(200).json({blogs:userBlogs})
}
