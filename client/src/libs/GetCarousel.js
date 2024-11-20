import axios from "axios";
import { API_BASE_URL } from "../redux/config";

export default async function GetCarousel() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/carousel/carouseles`);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
