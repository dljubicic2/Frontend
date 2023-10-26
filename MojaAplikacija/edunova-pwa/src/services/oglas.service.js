import http from "../http-common";


class OglasDataService{
    async get(){
        return await http.get('/Oglas');
    }

    async getBySifra(sifra){
        return await http.get('/oglas/'+ sifra);
    }

    async getOsobe(sifra){
        return await http.get('/oglas/' + sifra);
    }

    async obrisiOsobu(oglas,osoba){
        const odgovor = await http.delete('/oglas/' + oglas + '/obrisi/' + osoba)
        .then(response =>{
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(error =>{
            console.log(error);
            return {ok: false, poruka: error.respnse.data};
        });

        return odgovor;
    }

    async dodajOsobu(oglas,osoba){
        const odgovor = await http.post('/oglas/' + oglas + '/dodaj/' + osoba)
        .then(response =>{
            return {ok: false, poruka: 'Unio osobu'};
        })
        .catch(error =>{
            console.log(error);
            return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }

    async delete(sifra){
        const odgovor=await http.delete('/Oglas/'+ sifra)
        .then(response => {
            return{ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=> {
            return{ok: false, poruka: e.respnse.data};
        });

        return odgovor;
    }

    async post (oglas){
        const odgovor = await http.post('/oglas',oglas)
        .then(response => {
        return {ok: true, poruka: 'Unio oglas'};
        })
        .catch(error => {
            return {ok: false, poruka: error.respnse.data};
        });

        return odgovor;
    }

    async put(sifra,vozilo){
        const odgovor = await http.put('/osoba' + sifra,vozilo)
        .then(response => {
            return {ok: true, poruka: 'Promjenio vozilo'};
        });

        return odgovor;
    }

    async postaviSliku(sifra,slika){
        const odgovor = await http.put('/vozilo/postaviSliku/'+ sifra,slika)
        .then(response=>{
            return {ok: true, poruka: 'Postavi sliku'};
        })
        .catch(error =>{
            console.log(error);
            return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }

   
    
}

export default new OglasDataService();