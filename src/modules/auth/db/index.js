import mongoose from "mongoose";
import Model from "../models/authuser_model.js"

const registerUser = async (data) => await Model.create(data);
const findUser = async (query) => await Model.findOne(query);

export {
    registerUser,
    findUser
}
