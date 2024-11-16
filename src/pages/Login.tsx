import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APIRequest, ApiUrl } from '../utils/api';

const Login: React.FC = () => {
    const [username, setUsername] = useState("mor_2314");
    const [password, setPassword] = useState("83r5^_");
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const loginHandler = () => {
        setLoading(true); // Set loading to true when login starts
        const config = {
            method: 'POST',
            url: `${ApiUrl.login}`,
            body: {
                "username": username,
                "password": password
            }
        };

        APIRequest(
            config,
            res => {
                setLoading(false); // Set loading to false on success
                if (res) {
                    toast.success("Login Success.");
                    navigate('/admin/dashboard');
                    localStorage.setItem("token", JSON.stringify(res?.token));
                }
            },
            err => {
                setLoading(false); // Set loading to false on error
                console.log('Error:', err);
                toast.error("Login failed. Please try again.");
            }
        );
    };

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginHandler();
    };

    return (
        <>
            {/* component */}
            <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full">
                <form method="POST" action="#" onSubmit={formSubmitHandler}>
                    <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
                        <div className="space-y-4">
                            <h1 className="text-center text-2xl font-semibold text-gray-600">Login</h1>
                            <hr />
                            <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input className="pl-2 outline-none border-none w-full" value={username} onChange={(e) => setUsername(e.target.value)} type="username" name="username" placeholder="username" required />
                            </div>
                            <div className="flex items-center border-2 py-2 px-3 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <input className="pl-2 outline-none border-none w-full" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" required />
                            </div>
                        </div>
                        {/* Remember Me checkbox */}
                        <div className="flex justify-center items-center mt-4">
                            <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                                <input type="checkbox" id="rememberMeCheckbox" name="rememberMe" className="mr-2" />
                                <span className="text-xs font-semibold">Remember me?</span>
                            </p>
                        </div>
                        <button
                            type="submit"
                            value="login"
                            id="login"
                            className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000 flex justify-center items-center"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                            ) : (
                                "Login"
                            )}
                        </button>
                        <hr />
                        <div className="flex justify-center items-center mt-4">
                            <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                                <span className="ml-2">You don't have an account?<a href="#" className="text-xs ml-2 text-blue-500 font-semibold">Register now →</a>
                                </span>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
