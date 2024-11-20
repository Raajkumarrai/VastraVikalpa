import axios from "axios";
import { API_BASE_URL } from "../redux/config";

export default async function GetRelatedProductAll() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/post/blogs`);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
