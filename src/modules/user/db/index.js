import mongoose from "mongoose";
import Model from "../models/usermodel.js"

const getAll = async () => await Model.find();
const getOne = async (id) => await Model.findById(id)
const createData = async (data) => await Model.create(data);
const updateDataById = async (id, data) => await Model.findByIdAndUpdate(id, data)
const deleteDataById = async (id) => await Model.findByIdAndDelete(id)

export {
    getAll,
    createData,
    updateDataById,
    deleteDataById,
    getOne
}
