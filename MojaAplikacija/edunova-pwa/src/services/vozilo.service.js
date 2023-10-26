import http from "../http-common";


class VoziloDataService{
    async get(){
        return await http.get('/Vozilo');
    }

    async getBySifra(sifra){
        return await http.get('/vozilo' + sifra);
    }

    async getOsobe(sifra){
        return await http.get('/vozilo/' + sifra + '/osoba/');
    }

    async delete(sifra){
        const odgovor=await http.delete('/Vozilo/'+ sifra)
        .then(response => {
            return{ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=> {
            return{ok: false, poruka: e.respnse.data};
        });

        return odgovor;
    }

    async post (osoba){
        const odgovor = await http.post('/vozilo',vozilo)
        .then(response => {
        return {ok: true, poruka: 'Unio vozilo'};
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

export default new VoziloDataService();