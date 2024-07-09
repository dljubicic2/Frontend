import { error } from "highcharts";


class ProstorijaDataService{

    async get(){
        return await http.get('prostorija');
    }

    async delete(sifra){
        const odgovor = await http.delete('/prostorija' + sifra)
        .then(response =>{
            return {ok: true, poruka: 'Uspiješno obrisano'};
        })
        .catch(e =>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }

    async post(prostorija){
        const odgovor = await http.delete('/prostorija' + sifra)
        .then(response=>{
            return {ok: true, poruka: 'prostorija dodana'};
        })
        .catch(e=>{
            return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }

    async put(sifra, prostorija){
        const odgovor = await http.put('/prostorija' + sifra, prostorija)
        .then(response=>{
            return {ok: true, poruka: 'prostorija promijenjena'};
        })
        .catch(e=>{
            return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }

}

export default new ProstorijaDataService();