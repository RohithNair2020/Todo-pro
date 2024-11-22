import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCopy, setPasswordCopy] = useState("");

    const navigate = useNavigate();

    const register = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/auth/register`,
                {
                    username,
                    password,
                    passwordCopy,
                }
            );
            toast.success(response.data?.message);
            navigate("/login");
        } catch (e: any) {
            toast.error(e.response.data.message);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Card
                title="Create Account"
                className="shadow-lg p-3 w-1/3 min-w-96"
            >
                <div className="pt-3 w-full flex items-center flex-col">
                    <div className="mb-3 w-full">
                        <InputText
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full"
                        />
                    </div>
                    <div className="mb-3 w-full">
                        <InputText
                            value={password}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-3 w-full">
                        <InputText
                            value={passwordCopy}
                            invalid={password != passwordCopy}
                            placeholder="Confirm Password"
                            type="password"
                            onChange={(e) => setPasswordCopy(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button
                        disabled={!username || !password || !passwordCopy}
                        onClick={register}
                        label="Sign up"
                        className="w-full my-5"
                    />
                    <Link to="/login">
                        <p className="text-blue-500 cursor-pointer hover:text-blue-700 duration-300">
                            I have an account already
                        </p>
                    </Link>
                </div>
            </Card>
        </div>
    );
}

export default Register;
