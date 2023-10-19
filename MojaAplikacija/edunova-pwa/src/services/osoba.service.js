import http from "../http-common";


class OsobaDataService{


    async get(){
        return await http.get('/Osoba');
    }
}

export default new OsobaDataService();