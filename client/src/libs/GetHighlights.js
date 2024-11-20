import axios from "axios";
import { API_BASE_URL } from "../redux/config";

export default async function GetHighlights() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/carousel/carousels/highlight`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
