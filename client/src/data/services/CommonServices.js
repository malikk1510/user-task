import axios from 'axios';
import { constants } from "../../config.js";

export const api = constants.endpoint
export const error = (error) => { return { status: "error", isSuccessful: false, message: error } }
export const success = (data) => { return { status: "success", isSuccessful: true, data: data } }

export const getAuthHeaders = () => { return { 'Authorization': 'Bearer ' + localStorage.getItem(constants.KEY_AUTH_TOKEN) } }

export const get = async (url, headers) => {
    try {
        let response = await axios.get(url, { headers })
        return success(response.data)
    }
    catch (e) {
        console.log(e.response)
        return error(e.response.data.message)
    }
}

export const post = async (url, data, headers) => {
    try {
        let response = await axios.post(url, data, { headers })
        return success(response.data)
    }
    catch (e) {
        
        // console.log(e.response)
        return error(e.response.data.message)
    }
}


export const update = async (url, data, headers) => {
    try {
        let response = await axios.patch(url, data, { headers })
        return success(response.data)
    }
    catch (e) {
        // console.log(e.response)
        return error(e.response.data.message)
    }
}

export const del = async (url, headers) => {

    try {
        let response = await axios.delete(url, { headers })
        return success(response.data)
    }
    catch (e) {
        console.log(e.response)
        return error(e.response.data.message)
    }
}