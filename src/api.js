import axios from "axios";

const base = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
export default axios.create({ baseURL: base });
