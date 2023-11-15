import axios from "axios";

/* 로컬 테스트용 */
axios.defaults.baseURL = "http://localhost:8080";

/* 개발 테스트용 */
// axios.defaults.baseURL = "http://vs-dpc-alb-01-487593038.ap-northeast-2.elb.amazonaws.com";

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