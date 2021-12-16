import axios from "axios";
import Post from "@/models/Post";
import { getHeaders } from "./AuthHeader";

const API_URL = "http://localhost:3000/api/posts";

export const getAllPosts = async () => {
  return axios.get(`${API_URL}/`, { headers: getHeaders() });
};

export const getPost = async (id: string) => {
  return axios.get(`${API_URL}/${id}`, { headers: getHeaders() });
};

export const createPost = async (post: Post) => {
  return axios.post(`${API_URL}/`, post, { headers: getHeaders() });
};

export const removePost = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`, { headers: getHeaders() });
};

export const updatePost = async (post: Post, id: string) => {
  return axios.put(`${API_URL}/${id}`, post, { headers: getHeaders() });
};
