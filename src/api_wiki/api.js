import axiosClient from "./axiosClient";

const wikiApi = {
    getContent: (value) => {
        return axiosClient.get('', {params: {page: value}})
    },
}

export default wikiApi;