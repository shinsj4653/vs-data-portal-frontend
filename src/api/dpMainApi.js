import axios from "axios";

/* 로컬 테스트용 */
axios.defaults.baseURL = "http://localhost:8080";

/* 개발 테스트용 */
// axios.defaults.baseURL = "http://3.34.194.218:8080";

axios.defaults.withCredentials = true; // withCredentials 전역 설정

export const fetchDatasetSearchResult = async (datasetName) => {
    const response = await axios.post(`dpmain/search/service-dataset`, {
        "keyword" : datasetName
    });
    console.log(response.data)
    return response.data;
}
