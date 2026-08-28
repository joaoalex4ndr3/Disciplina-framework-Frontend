import axios from "axios";
import { config } from "../config";

export default axios.create({
  baseURL: config.rawgApiBaseUrl,
  params: {
    key: config.rawgApiKey
  }
})