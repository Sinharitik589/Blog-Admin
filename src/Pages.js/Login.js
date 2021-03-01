import React, { useState } from 'react'
import { fetchAuth } from "../action"
import axios from "axios"
import { connect } from 'react-redux';

const Login = ({ fetchAuth }) => {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const log = async () => {
        try {

            const res = await axios.post("https://zen-newton-5723fe.netlify.app/.netlify/functions/api/login", { name: username, password });
            localStorage.setItem("token", res.data);
            fetchAuth(true);
        }
        catch (e) {
            console.log(e)
        }

    }
    return (
        <div className="dialog container">
            <div className="panel container">
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" value={username} onChange={(e) => { setUsername(e.target.value) }} className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="password" placeholder="Password" />
                </div>

                <button onClick={log} type="submit" className="btn btn-primary">
                    Login
                </button>
            </div>

        </div>
    )

}
export default connect(null, { fetchAuth })(Login);