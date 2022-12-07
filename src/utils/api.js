import axios from "axios";

export const api = {
    request: async ({
        method = "create",
        data = {},
        params = {},
        path = "",
        headers = {},
    }) => {
        let result;
        const apiPath = process.env.REACT_APP_CRUD_SERVER;
        try {
            switch (method) {
                case "create":
                    result = await axios.post(`${apiPath}/${path}`, data, { params, headers});
                    break;
                case "read":
                    const get = await axios.get(`${apiPath}/${path}`, { params, headers});
                    result = get?.data
                    break;
                case "update":
                    result = await axios.put(`${apiPath}/${path}`, data, { params, headers});
                    break;
                case "delete":
                    result = await axios.delete(`${apiPath}/${path}`, { params, headers});
                    break;
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    },
};