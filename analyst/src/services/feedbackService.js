import http from "./httpService"; 

const apiUrl = "http://127.0.0.1:5000/";
const apiEndPoint = apiUrl + "/feedbacks"

export function getAllFeedbacks(){
    console.log("get feedbacks")
    return http.get(apiEndPoint)
}

export function getUnreadFeedbacks(){
    return http.get(apiEndPoint+"/unread")
}