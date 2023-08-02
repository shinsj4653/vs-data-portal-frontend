import axios from "axios";

/* 로컬 테스트용 */
// axios.defaults.baseURL = "http://localhost:8080";

/* 개발 테스트용 */
axios.defaults.baseURL = "http://3.34.194.218:8080";

axios.defaults.withCredentials = true; // withCredentials 전역 설정

export const fetchDataMapMain = async () => {
    const response = await axios.get(`datamap/category/main`);
    console.log(response.data)
    return response.data;
}

export const fetchDataMapSub = async () => {
    const response = await axios.get(`datamap/category/sub`);
    console.log(response.data)
    return response.data;
}

export const fetchDataMapAllDataset = async () => {
    const response = await axios.get(`datamap/dataset/all`);
    console.log(response.data)
    return response.data;
}