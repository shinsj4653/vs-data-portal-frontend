import axios from "axios";

/* 로컬 테스트용 */
// axios.defaults.baseURL = "http://localhost:8080";

/* 개발 테스트용 */
axios.defaults.baseURL = "http://vs-dpc-alb-01-487593038.ap-northeast-2.elb.amazonaws.com/apis";

axios.defaults.withCredentials = true; // withCredentials 전역 설정

export const fetchDatasetSearchResult = async (datasetName) => {
    const response = await axios.post(`dpmain/search/service-dataset`, {
        "keyword" : datasetName
    });
    console.log(response.data)
    return response.data;
}
