const BACKEND_URL = "http://localhost:5000/api";
const GET_CONFIG = { withCredentials: true };
const POST_CONFIG = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export default { BACKEND_URL, GET_CONFIG, POST_CONFIG };
