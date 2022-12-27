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

export function postFeedback(feedback){
    //format: { "message": "Front end awesome"  }
    console.log("post feedback")
    const body = feedback;
    return http.post(apiEndPoint, body);
}

export function markFeedbackRead(feedbackId){
    //format: 63a82f5be187ecd8cc8046ba
    console.log("read feedback with feadback id")
    return http.put(`${apiEndPoint}/read/${feedbackId}`)
}