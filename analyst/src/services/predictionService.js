import http from "./httpService"; 

const apiUrl = "http://127.0.0.1:5000/";
const apiEndPoint = apiUrl + "/prediction"

export function getPredictionNormalAnomalyDoughnutData(){
    return http.get(`${apiEndPoint}/normal_anomaly_doughnut_data`)
}

export function getPredictionAnomalyTypeDoughnutData(){
    return http.get(`${apiEndPoint}/anomaly_type_doughnut_data`)
}

export function getPredictionScenarioDoughnutData(){
    return http.get(`${apiEndPoint}/scenario_doughnut_data`)
}