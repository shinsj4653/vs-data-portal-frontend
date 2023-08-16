import axios from "axios";

/* 로컬 테스트용 */
//axios.defaults.baseURL = "http://localhost:8080";

/* 개발 테스트용 */
axios.defaults.baseURL = "http://3.34.194.218:8080";

axios.defaults.withCredentials = true; // withCredentials 전역 설정

export const fetchMetaDataMainDataset = async (serviceName) => {
    const response = await axios.post(`metadata/dataset/main`, {
        "service_name" : serviceName
    });
    console.log(response.data)
    return response.data;
}

export const fetchMetaDataSubDataset = async (serviceName, mainCategoryName) => {
    const response = await axios.post(`metadata/dataset/sub`, {
        "service_name" : serviceName,
        "main_category_name" : mainCategoryName
    });
    console.log(response.data)
    return response.data;
}

export const fetchMetaDataTableInfo = async (serviceName, mainCategoryName, subCategoryName) => {
    const response = await axios.post(`metadata/tableinfo`, {
        "service_name" : serviceName,
        "main_category_name" : mainCategoryName,
        "sub_category_name" : subCategoryName
    });
    console.log(response.data)
    return response.data;
}

export const fetchMetaDataTableSearch = async (serviceName, tableKeyword, pageNo, amountPerPage) => {
    const response = await axios.post(`metadata/search/tableinfo`, {
        "service_name" : serviceName,
        "table_keyword" : tableKeyword,
        "page_no" : pageNo,
        "amount_per_page" : amountPerPage
    });
    console.log(response.data)
    return response.data;
}