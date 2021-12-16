import axios from "axios";
import User from "@/models/User";
import { AuthRequest } from "@/models/AuthUser";
import { getHeaders } from "./AuthHeader";

const API_URL = "http://localhost:3000/api";

export async function login(user: AuthRequest) {
  return axios.post(`${API_URL}/login`, user);
}

export async function createUser(user: User) {
  return axios.post(`${API_URL}/users`, user);
}

export async function removeUser(id: string) {
  return axios.delete(`${API_URL}/users/${id}`, { headers: getHeaders() });
}

export async function updateUser(user: User) {
  return axios.put(`${API_URL}/users/${user.id}`, user, {
    headers: getHeaders(),
  });
}
export async function getAllUsers() {
  return axios.get(`${API_URL}/users`, { headers: getHeaders() });
}

export async function getUser(id: string) {
  return axios.get(`${API_URL}/users/${id}`, { headers: getHeaders() });
}
