// import Employee Model
import Employee from "../models/EmpModel";

// import request and response types from express
import { Request, Response } from "express";

const getEmployeesAll = async (req: Request, res: Response) => {
    try {
        const employees = await Employee.find({});

        res.status(200).json({ employees });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const getEmployeeByID = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const employee = await Employee.findById(id);

        res.status(200).json({ employee });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const addNewEmployee = async (req: Request, res: Response) => {
    const { name, department, post } = req.body;

    try {
        const employeeAdded = await Employee.create({ name, department, post });

        res.status(200).json({ employeeAdded });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const deleteEmployee = async (req: Request, res: Response) => {
    try {
        await Employee.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: "Employee Deleted!!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEmployee = async (req: Request, res: Response) => {
    try {
        await Employee.updateOne({ _id: req.params.id }, req.body);

        res.status(200).json({ message: "Employee Updated!!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    getEmployeesAll,
    getEmployeeByID,
    addNewEmployee,
    deleteEmployee,
    updateEmployee,
};
