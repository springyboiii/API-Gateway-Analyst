import http from "./httpService"; 

const apiUrl = "http://127.0.0.1:5000/";
const apiEndPoint = apiUrl + "/feedbacks"

export function getAllFeedbacks(){
    return http.get(apiEndPoint)
}