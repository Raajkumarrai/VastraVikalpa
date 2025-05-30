import axios from "axios";
import { API_BASE_URL } from "../redux/config";

export default async function GetRelatedProductCategory(category) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/post/blog/category/filter/${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
