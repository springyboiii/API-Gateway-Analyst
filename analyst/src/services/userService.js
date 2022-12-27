import http from "./httpService"; 

const apiUrl = "http://127.0.0.1:5000/";
const apiEndPoint = apiUrl + "/users"

export function postUser(user){
    console.log("posting user...")
    const body = {
        "name": user["name"],
        "email": user["email"],
        "password": user["password"],
    }
    return http.post(apiEndPoint, body)
}

