import http from "../http-common";


class OsobaDataService{


    async get(){
        return await http.get('/Osoba');
    }

    async delete(){
        const odgovor=await http.delete('/Osoba/'+ sifra)
        .then(respnse =>{
            return{ok: true, poruka: "Obrisao uspješno"};
        })
        .catch(e=>{
            return{ok: false, poruka: e.respnse.data};
        });

        return odgovor;
    }

    async post (osoba){
        const odgovor = await http.post('/osoba',osoba)
        .then(response =>{
        console.log(console.error.response);
        return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }
}

export default new OsobaDataService();