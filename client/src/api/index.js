import axios from "axios";

const baseUrl = "http://localhost:4000/share";

export default axios.create({
  baseURL: baseUrl
})