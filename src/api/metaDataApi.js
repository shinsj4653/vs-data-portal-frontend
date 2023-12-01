import axios from "axios";

/* 로컬 테스트용 */
// axios.defaults.baseURL = "http://localhost:8080";

/* 개발 테스트용 */
axios.defaults.baseURL = "http://vs-dpc-alb-01-487593038.ap-northeast-2.elb.amazonaws.com/apis";

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

export const fetchMetaDataTableInfo = async (serviceName, mainCategoryName, subCategoryName, pageNo, amountPerPage) => {
    const response = await axios.post(`metadata/tableinfo`, {
        "service_name" : serviceName,
        "main_category_name" : mainCategoryName,
        "sub_category_name" : subCategoryName,
        "page_no" : pageNo,
        "amount_per_page" : amountPerPage
    });
    console.log(response.data)
    return response.data;
}

export const fetchMetaDataTableSearch = async (searchCondition, keyword, pageNo, amountPerPage) => {
    const response = await axios.post(`metadata/search/keyword`, {
        "search_condition" : searchCondition,
        "keyword" : keyword,
        "page_no" : pageNo,
        "amount_per_page" : amountPerPage
    });
    console.log(response.data)
    return response.data;
}

export const fetchMetaTableColumnInfo = async (tableId) => {
    const response = await axios.post(`metadata/tablecolumninfo`, {
        "table_id" : tableId,
    });
    console.log(response.data)
    return response.data;
}

export const fetchAutoCompleteSearchWords = async (index, searchCondition, keyword) => {
    const response = await axios.post(`metadata/search/autocomplete`, {
        "index" : index,
        "searchCondition" : searchCondition,
        "keyword" : keyword
    });
    console.log(response.data)
    return response.data;
}

// export const fetchMetaDataTotalSearch = async (keyword) => {
//     const response = await axios.get(`metadata/search/total?keyword=${keyword}`);
//     console.log(response.data);
//     return response.data;
// }