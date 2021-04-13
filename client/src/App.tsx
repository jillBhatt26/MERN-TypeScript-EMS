// component imports
import AddEmp from "./components/AddEmp";
import EmpList from "./components/EmpList";

// context provider imports
import EmpContextProvider from "./contexts/EmpContext";

// react-toastify imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const App = (): JSX.Element => {
    return (
        <div className="container">
            <EmpContextProvider>
                <h3 className="center">EMS</h3>
                <AddEmp />
                <EmpList />
            </EmpContextProvider>
        </div>
    );
};

export default App;
