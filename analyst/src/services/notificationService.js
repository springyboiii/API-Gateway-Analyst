import http from "./httpService"; 

const apiUrl = "http://127.0.0.1:5000/";
const apiEndPoint = apiUrl + "/notifications"

export function getAllNotification(){
    console.log("get notifications")
    return http.get(apiEndPoint)
}

export function getSomeFeedbacks(limit){
    console.log("get some notifications")
    return http.get(`${apiEndPoint}/${limit}`)
}

export function getUnreadFeedbacks(){
    return http.get(apiEndPoint+"/unread")
}

export function markNotificationRead(notificationId){
    //format: 63a82f5be187ecd8cc8046ba
    console.log("read notification with notification id")
    return http.put(`${apiEndPoint}/read/${notificationId}`)
}