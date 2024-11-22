import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Project from "./pages/Project";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";
import Todo from "./pages/Todo";
import { ConfirmPopup } from "primereact/confirmpopup";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ConfirmDialog } from "primereact/confirmdialog";

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/projects" element={<Project />}></Route>
                <Route path="/projects/:projectId" element={<Todo />}></Route>
                <Route path="*" element={<Navigate to="/projects" />}></Route>
            </Routes>
            <ConfirmPopup />
            <ConfirmDialog />
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar
                closeOnClick
                transition={Slide}
                theme="light"
                limit={1}
                pauseOnFocusLoss={false}
            />
        </>
    );
}

export default App;
