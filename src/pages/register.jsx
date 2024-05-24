import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import Button from "../component/ButtonComponent/Button";

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    return (
        <section className="container" id="register-section" style={{ minHeight: "100vh", background: "linear-gradient(to left,orange 50%,white 50%" }}>
                    <div className="row">
                        <div className="col-12 col-lg-8 offset-lg-2 my-5">
                            <div className="row">
                                <div className="col-12 col-md-6 p-5 text-start">
                                    <img
                                src="./assets/shopping.svg"
                                        width="350px"
                                        alt="logo"
                                    />
                                </div>
                        <div className="col-12 col-md-6 p-5 text-left">
                            <h1>
                                Hacktiv Grocery
                            </h1> 
                                    <div className="form-signin m-auto">
                                        <form onSubmit={
                                            async function formOnSubmit(event) {
                                                event.preventDefault()
                                                try {
                                                    setLoading(true)
                                                    const response = await axios({
                                                        method: "POST",
                                                        url: import.meta.env.VITE_API_BASE_URL + "/register",
                                                        data: {
                                                            email: email,
                                                            password: password
                                                        }
                                                    });
                                                    console.log(response.data);                                                Swal.fire({
                                                        title: 'Success',
                                                        text: response.data.message,
                                                        icon: 'success'
                                                    });
                                                    navigate('/login');
                                                    // setLoading(true);
                                                } catch (error) {
                                                    setLoading(false)
                                                    const errMsg = error.response.data.message
                                                    Swal.fire({
                                                        title: 'Error',
                                                        text: errMsg,
                                                        icon: 'error',
                                                    })
                                                }
                                            }
                                        } id="register-form">
                                            <div className="mb-2 mt-3 ">
                                                <div className="d-flex justify-content-between ">
                                                    <label htmlFor="register-email ">Email</label>
                                                </div>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name='email'
                                                    onChange={
                                                        (e) => setEmail(e.target.value)}
                                                    value={email}
                                                    autoComplete="off"
                                                    required=""
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <div className="d-flex justify-content-between">
                                                    <label htmlFor="register-password">Password</label>
                                                </div>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name='password'
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                    autoComplete="off"
                                                    required=""
                                                />
                                            </div>
                                    <Button
                                        name={loading ? "Loading..." : "Register"}
                                        buttonClass={"btn btn-lg btn-warning w-100"}
                                        buttonType={"submit"}
                                        disabled={loading}
                                    />
                                </form>
                                <div className="container text-start">
                                    <p>Do you have account ?
                                        <a href="/login"> Login</a>
                                    </p>

                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    )
}