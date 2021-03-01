import { combineReducers } from "redux";

const authReducer = (state = null, action) => {
    if (action.type == "fetch_auth")
        return action.payload;
    else
        return state;
}

const blogReducer = (state = [], action) => {
    if (action.type == "fetch_blogs")
        return action.payload
    else
        return state;
}

export default combineReducers({ auth: authReducer, blogs: blogReducer })