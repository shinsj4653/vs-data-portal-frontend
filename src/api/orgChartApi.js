import axios from "axios";

/* 로컬 테스트용 */
//axios.defaults.baseURL = "http://localhost:8080";

/* 개발 테스트용 */
axios.defaults.baseURL = "http://3.34.194.218:8080";

axios.defaults.withCredentials = true; // withCredentials 전역 설정

export const fetchOrgChartMain = async () => {
    const response = await axios.get(`dataorg/allorginfo`);
    console.log(response.data)
    return response.data;
}

export const fetchServiceInfo = async () => {
    const response = await axios.get(`dataorg/service/systeminfo`);
    console.log(response.data)
    return response.data;
}