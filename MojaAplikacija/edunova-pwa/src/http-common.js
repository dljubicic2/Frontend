import axios  from "axios";


export default axios.create({
    baseURL: "http://dljubicic2-001-site1.itempurl.com/api/v1",
    headers: {
        "content-type": "application/json"
    }
});
