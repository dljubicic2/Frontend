
import { error } from "highcharts";

class DjelatnikDataService{


    async get(){
        return await http.get('djelatnik');
    }

    async delete(sifra){
        const odgovor = await http.delete('/djelatnik' + sifra)
        .then(response =>{
            return {ok: true, poruka: 'Uspiješno obrisano'};
        })
        .catch(e =>{
            return {ok: false, poruka: e.response.data};
        });

        return odgovor;
    }

    async post(djelatnik){
        const odgovor = await http.delete('/djelatnik' + sifra)
        .then(response=>{
            return {ok: true, poruka: 'djelatnik je dodan'};
        })
        .catch(e=>{
            return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }

    async put(sifra, djelatnik){
        const odgovor = await http.put('/djelatnik' + sifra, djelatnik)
        .then(response=>{
            return {ok: true, poruka: 'djelatnik promijenjena'};
        })
        .catch(e=>{
            return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }
}

export default new DjelatnikDataService();