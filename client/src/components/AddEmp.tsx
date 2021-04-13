// context imports
import { EmpContext, IAppContextInterface } from "../contexts/EmpContext";

// import hooks
import { useState, useContext, useEffect } from "react";

// Import types
import { FC, ChangeEvent, FormEvent } from "react";

// import toastify
import { toast } from "react-toastify";

// types definitions
type FormSubmitEvent = FormEvent<HTMLFormElement>;

const AddEmp: FC = (): JSX.Element => {
    // component states
    const [name, setName] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [post, setPost] = useState<string>("");

    // context
    const {
        formBtn,
        addEmployee,
        setFormBtn,
        empToUpdate,
        setEmpToUpdate,
        updateEmployee,
    }: IAppContextInterface = useContext(EmpContext);

    // functions
    const reset = () => {
        setName("");
        setDepartment("");
        setPost("");
        setFormBtn("add");

        setEmpToUpdate({
            _id: "",
            name: "",
            department: "",
            post: "",
        });
    };

    // life cycle events
    useEffect(() => {
        setName(empToUpdate.name);
        setDepartment(empToUpdate.department);
        setPost(empToUpdate.post);
    }, [empToUpdate]);

    // notification functions
    const notify = () => {
        if (formBtn === "add") {
            toast.success("Employee added!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        } else {
            toast.success("Employee updated!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    // event listeners
    const formSubmitHandler = (e: FormSubmitEvent) => {
        e.preventDefault();

        if (name.length === 0 || department.length === 0 || post.length === 0) {
            toast.error("All fields required!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        } else {
            if (formBtn === "add") {
                const newEmp = {
                    name,
                    department,
                    post,
                };

                addEmployee(newEmp);
                notify();
            } else if (formBtn === "edit") {
                const updateDetails = {
                    _id: empToUpdate._id,
                    name,
                    department,
                    post,
                };

                updateEmployee(updateDetails);
                notify();
            }
        }

        reset();
    };

    return (
        <div className="row">
            <div className="col s12 m8 offset-m2">
                <form onSubmit={formSubmitHandler} autoComplete="off">
                    <div className="input-field">
                        <input
                            type="text"
                            name="name"
                            placeholder="Employee Name"
                            value={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setName(e.target.value)
                            }
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            name="department"
                            placeholder="Employee Department"
                            value={department}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setDepartment(e.target.value)
                            }
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            name="post"
                            placeholder="Employee Post"
                            value={post}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPost(e.target.value)
                            }
                        />
                    </div>
                    <div className="center">
                        <button className="btn btn-large waves-effect waves-light green darken-3">
                            <i className="material-icons right">{formBtn}</i>
                            {formBtn}
                        </button>
                        {formBtn === "edit" && (
                            <button
                                className="btn btn-large waves-effect waves-light red darken-3"
                                onClick={reset}
                            >
                                <i className="material-icons right">cancel</i>
                                cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmp;
