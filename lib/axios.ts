import axios from "axios";

export const rawgClient = axios.create({
  baseURL: "https://api.rawg.io/api/",

});
