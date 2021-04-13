// import mongoose
import { Schema, model } from "mongoose";

// define Emp Schema
const EmpSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
});

// create Emp Model
const Employee = model("Employee", EmpSchema);

// export the model
export default Employee;
