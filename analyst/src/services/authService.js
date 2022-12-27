import jwtDecode from "jwt-decode";

import http from "./httpService";

const apiEndpoint = "http://127.0.0.1:5000/" + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function loginCustomer(email, password) {
	const { data: jwt } = await http.post(apiEndpoint + "", {
		email,
		password,
	});
	localStorage.setItem(tokenKey, jwt);
	http.setJwt(getJwt());
}

export function loginUserWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
	http.setJwt(getJwt());
}

export function logoutUser() {
	localStorage.removeItem(tokenKey);
	http.setJwt("");
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}

export function getRoles() {
	return {
		USER: "user",
		ADMIN: "admin",
	};
}

export default {
	loginCustomer,
	loginUserWithJwt,
	logoutUser,
	getCurrentUser,
	getJwt,
	getRoles,
};