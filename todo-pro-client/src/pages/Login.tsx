import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/auth/login`,
                {
                    username,
                    password,
                }
            );
            const token = response.data?.token;
            if (!token) throw "Invalid login credentials";

            sessionStorage.setItem("token", token);

            toast.success(response.data?.message);
            navigate("/projects");
        } catch (e: any) {
            toast.error(e.response.data.message);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Card title="Login" className="shadow-lg pt-3 px-3 w-1/3 min-w-96">
                <div className="pt-3 w-full flex flex-col items-center">
                    <div className="mb-3 w-full">
                        <InputText
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-3 w-full">
                        <InputText
                            value={password}
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button
                        disabled={!password || !username}
                        onClick={login}
                        label="Login"
                        className="w-full my-5"
                    />
                    <Link to="/register">
                        <p className="text-blue-500 cursor-pointer hover:text-blue-700 duration-300">
                            I don't have an account yet
                        </p>
                    </Link>
                </div>
            </Card>
        </div>
    );
}

export default Login;
