import axios from "axios"

export const fetchAuth = (val) => ({ type: "fetch_auth", payload: val });

export const fetchBlogs = () => async (dispatch) => {

    const res = await axios.get("https://zen-newton-5723fe.netlify.app/.netlify/functions/api");
    dispatch({
        type: "fetch_blogs",
        payload: res.data.arr
    })
}

export const fetchFeature = () => async (dispatch) => {
    const res = await axios.get("https://zen-newton-5723fe.netlify.app/.netlify/functions/api/featured");
    dispatch({
        type: "fetch_blogs",
        payload: res.data.featured
    })
}