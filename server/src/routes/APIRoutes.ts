// import express router
import { Router } from "express";

// import controllers
import {
    addNewEmployee,
    deleteEmployee,
    getEmployeeByID,
    getEmployeesAll,
    updateEmployee,
} from "../controllers/EmpController";

// Initialize router
const router: Router = Router();

// attach the app routes
router.get("/", getEmployeesAll);

router.get("/:id", getEmployeeByID);

router.post("/", addNewEmployee);

router.delete("/:id", deleteEmployee);

router.put("/:id", updateEmployee);

// export the router
export default router;
