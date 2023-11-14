import axios from "axios";

/* 로컬 테스트용 */
// axios.defaults.baseURL = "http://localhost:8080";

/* 개발 테스트용 */
axios.defaults.baseURL = "http://3.37.240.182";

axios.defaults.withCredentials = true; // withCredentials 전역 설정

export const fetchOrgChartMain = async () => {
    const response = await axios.get(`dataorg/allorginfo`);
    console.log(response.data)
    return response.data;
}

export const fetchServiceByTarget = async (targetName) => {
    const response = await axios.post(`dataorg/service/target`, {
        "target_name" : targetName
    });
    console.log(response.data.data)
    return response.data;
}

export const fetchServiceByDataset = async (keyword) => {
    const response = await axios.post(`dataorg/search/dataset`, {
        "keyword" : keyword
    });
    console.log(response.data.data)
    return response.data;
}