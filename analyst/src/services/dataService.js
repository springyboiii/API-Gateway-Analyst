import http from "./httpService"; 

const apiUrl = "http://127.0.0.1:5000/";
const apiEndPoint = apiUrl + "/preprocessed"

export function getMinOfPreprocessedCol(colName){
    return http.get(`${apiEndPoint}/min/${colName}`)
}

export function getMaxOfPreprocessedCol(colName){
    return http.get(`${apiEndPoint}/max/${colName}`)
}

export function getAvgOfPreprocessedCol(colName){
    return http.get(`${apiEndPoint}/avg/${colName}`)
}

export function getAvgOfPreprocessedColAnomalies(colName){
    return http.get(`${apiEndPoint}/avg/${colName}/1`)
}

export function getAvgOfPreprocessedColNonAnomalies(colName){
    return http.get(`${apiEndPoint}/avg/${colName}/0`)
}