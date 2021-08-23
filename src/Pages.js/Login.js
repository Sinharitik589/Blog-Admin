import React, { useState } from 'react'
import { fetchAuth } from "../action"
import axios from "axios"
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

const Login = ({ fetchAuth }) => {

    let url = (process.env.NODE_ENV == "production") ? "https://zen-newton-5723fe.netlify.app" : "http://localhost:9000"

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [progress, setProgress] = useState(false);
    const log = async () => {
        try {
            setProgress(true);
            const res = await axios.post(`${url}/.netlify/functions/api/login`, { name: username, password });
            localStorage.setItem("token", res.data);

            fetchAuth(true);
        }
        catch (e) {
            setProgress(false);
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
                    {(progress) ? <div><Spinner as={'span'} animation="border" variant="light" /><span>Logging</span> </div> : "Login"}
                </button>
            </div>

        </div>
    )

}
export default connect(null, { fetchAuth })(Login);