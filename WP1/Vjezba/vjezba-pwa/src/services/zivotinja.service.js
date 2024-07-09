import { error } from "highcharts";

class ZivotinjaDataService {
    getAll() {
        return http.get("/zivotinja");
    }

    async getDjelatnici(sifra) {
        return await http.get('/grupa' + sifra + '/djelatnici');
    }

    async getProstorije(sifra) {
        return await http.get('/zivotinja' + sifra + '/prostorije');
    }

    async post(zivotinja){
        const odgovor = await http.post('/zivotinja',zivotinja)
        .then(response=>{
            return {ok: true, poruka: 'Unio zivotinju'};
        })
        .catch(e =>{
            return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }

    async delete(sifra){
        const odgovor = await http.delete('/zivotinja' + sifra)
        .then(response=>{
            return {ok: true, poruka: 'Uspiješno obrisano' };
        })
        .catch(e=>{
            console.log(error);
            return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }

    async obrisiDjelatnika(zivotinja, djelatnik){

        const odgovor = await http.delete('/zivotinja/' + zivotinja + '/obrisi/' + djelatnik)
        .then(response =>{
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(error=>{
            console.log(error);
            return {ok: false, poruka: error.response.data};

        });

        return odgovor;
    }

    async obrisiProstoriju(zivotinja, prostorija){
        const odgovor = await http.delete('/zivotinja/' + zivotinja + '/obrisi/' + prostorija)
        .then(response=>{
            return  {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(error=>{
            console.log(error);
            return {ok: false, poruka: 'Obrisao uspješno'};
        });

        return odgovor;
    }

    async dodajDjelatnika(zivotinja, djelatnik){
        const odgovor = await http.post('/zivotinja/' + zivotinja + '/dodaj/' + djelatnik)
        .then(response=>{
            return {ok: true, poruka: 'Dodao uspiješno'};
        })
        .catch(error =>{
            console.log(error);
            return {ok: false, poruka: error.response.data}
        });

        return odgovor;
    }

    async dodajProstoriju(zivotinja, prostorija){
        const odgovor = await http.post('/zivotinja/' + zivotinja + '/dodaj/' + prostorija)
        .then(response=>{
            return {ok: true, poruka: 'Dodao uspiješno'};
        })
        .catch(error =>{
            console.log(error);
            return {ok: false, poruka: error.response.data}
        });

        return odgovor;
    }
}

export default new ZivotinjaDataService();

