// context imports
import {
    EmpContext,
    IAppContextInterface,
    IEmployee
} from '../contexts/EmpContext';

// hooks imports
import { useContext } from 'react';

// toast imports
import { toast } from 'react-toastify';

const EmpList = (): JSX.Element => {
    // context
    const {
        emp,
        deleteEmployee,
        setFormBtn,
        setEmpToUpdate,
        isLoading
    }: IAppContextInterface = useContext(EmpContext);

    // notification function
    const notify = () => {
        toast.error('Employee Deleted!!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });
    };

    const handleEdit = (employee: IEmployee) => {
        setFormBtn('edit');
        setEmpToUpdate(employee);
    };

    const handleDelete = (id: string) => {
        deleteEmployee(id);
        notify();
    };

    return emp.length > 0 ? (
        <>
            {/* show materialize css preloader */}
            {isLoading && (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            )}
            <table className="striped centered">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Post</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {emp.map((employee: IEmployee, index: number) => (
                        <tr key={employee._id}>
                            <td>{++index}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.post}</td>
                            <td>
                                <button
                                    className="btn waves-effect waves dark blue lighten-1"
                                    onClick={() => handleEdit(employee)}
                                >
                                    <i className="material-icons right">edit</i>
                                    Edit
                                </button>
                                <button
                                    className="btn waves-effect waves dark red darken-1"
                                    onClick={() => handleDelete(employee._id)}
                                >
                                    <i className="material-icons right">
                                        delete
                                    </i>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    ) : (
        <>
            {isLoading ? (
                <div
                    className="progress"
                    style={{ maxWidth: '500px', margin: '40px auto' }}
                >
                    <div className="indeterminate"></div>
                </div>
            ) : (
                <h5 className="center mt-5">There are no employees to show.</h5>
            )}
        </>
    );
};

export default EmpList;
