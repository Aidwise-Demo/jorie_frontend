import axios from "axios";

const site = axios.create({
  // baseURL: "http://localhost:5000", // Adjust as needed
  // baseURL: "https://jorie-front-end.onrender.com", // Adjust as needed
  baseURL: "https://api.jorie-backend.aidwise.in/",

  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default site;