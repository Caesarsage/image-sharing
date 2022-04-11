import axios from "axios";

const baseUrl = "https://image-share-secure.herokuapp.com/share";

export default axios.create({
  baseURL: baseUrl
})