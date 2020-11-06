import axios from "axios"


// const BASE_URL = "https://neko-back.herokuapp.com/2.0"
const BASE_URL = "http://localhost:7542/2.0"

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

