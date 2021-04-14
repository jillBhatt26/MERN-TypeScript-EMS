import { createContext, useState, useEffect, ReactNode, Dispatch } from 'react';

// Employee type definition
export interface IEmployee {
    _id: string;
    name: string;
    department: string;
    post: string;
}

// Default context type
export interface IAppContextInterface {
    emp: Array<IEmployee>;
    formBtn: string;
    setFormBtn: Dispatch<string>;
    empToUpdate: IEmployee;
    isLoading: boolean;
    setEmpToUpdate: Dispatch<IEmployee>;
    updateEmployee: (employee: IEmployee) => void;
    addEmployee: (newEmp: Object) => void;
    deleteEmployee: (id: string) => void;
}

// props definition
interface IProps {
    children: ReactNode;
}

export const EmpContext = createContext<IAppContextInterface | any>({});

const EmpContextProvider = ({ children }: IProps): JSX.Element => {
    // states
    const [emp, setEmp] = useState<IEmployee[]>([]);
    const [formBtn, setFormBtn] = useState<string>('add');
    const [empToUpdate, setEmpToUpdate] = useState<IEmployee>({
        _id: '',
        name: '',
        department: '',
        post: ''
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // functions
    const fetchAndSetEmployees = (): void => {
        setIsLoading(true);

        fetch('http://localhost:5000/')
            .then(res => res.json())
            .then(data => {
                const { employees } = data;
                setIsLoading(false);
                setEmp(employees);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    };

    const addEmployee = (newEmp: Object): void => {
        fetch('http://localhost:5000/', {
            method: 'POST',
            body: JSON.stringify(newEmp),
            headers: { 'content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                const { employeeAdded } = data;
                setEmp([...emp, employeeAdded]);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const updateEmployee = (employee: IEmployee) => {
        fetch(`http://localhost:5000/${employee._id}`, {
            method: 'PUT',
            body: JSON.stringify(employee),
            headers: { 'content-type': 'application/json' }
        })
            .then(() => {
                const index = emp.findIndex(e => e._id === employee._id);

                emp[index] = employee;

                setEmp([...emp]);
            })
            .catch(err => console.log(err));
    };

    const deleteEmployee = (id: string) => {
        fetch(`http://localhost:5000/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setEmp(emp.filter(employee => employee._id !== id));
            })
            .catch(err => console.log(err));
    };

    // hooks
    useEffect(() => {
        fetchAndSetEmployees();
    }, []);

    const EmpContextValues: IAppContextInterface = {
        emp,
        formBtn,
        setFormBtn,
        addEmployee,
        empToUpdate,
        updateEmployee,
        setEmpToUpdate,
        deleteEmployee,
        isLoading
    };

    return (
        <EmpContext.Provider value={EmpContextValues}>
            {children}
        </EmpContext.Provider>
    );
};

export default EmpContextProvider;
