import axios from 'axios';

const axiosFirestore = axios.create({
  baseURL: 'https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents',
});

export default axiosFirestore;
