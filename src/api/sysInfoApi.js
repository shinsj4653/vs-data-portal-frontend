import axios from "axios";

/* 로컬 테스트용 */
axios.defaults.baseURL = "http://localhost:8080";

/* 개발 테스트용 */
// axios.defaults.baseURL = "http://43.201.105.114:8080"; 

axios.defaults.withCredentials = true; // withCredentials 전역 설정

export const fetchServiceSystemInfo = async (serviceName) => {
    const response = await axios.get(`dataorg/service/systeminfo?name=${serviceName}`);
    console.log(response.data)
    return response.data;
}