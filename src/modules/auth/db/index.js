import mongoose from "mongoose";
import Model from "../models/authusermodel.js"

const registerUser = async (data) => await Model.create(data);
const findUser = async (query) => await Model.findOne(query);

export {
    registerUser,
    findUser
}
