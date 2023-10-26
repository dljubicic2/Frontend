import http from "../http-common";


class OsobaDataService{


    async get(){
        return await http.get('/Osoba');
    }

    async getBySifra(sifra){
        return await http.get('/osoba/' + sifra);
    }

    async delete(sifra){
        const odgovor=await http.delete('/Osoba/'+ sifra)
        .then(response => {
            return{ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=> {
            return{ok: false, poruka: e.respnse.data};
        });

        return odgovor;
    }

    async post (osoba){
        const odgovor = await http.post('/osoba',osoba)
        .then(response => {
        return {ok: true, poruka: 'Unio osobu'};
        })
        .catch(error => {
            return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }

    async put(sifra,osoba){
        const odgovor = await http.put('/osoba' + sifra,osoba)
        .then(response => {
            return {ok: true, poruka: 'Promjenio osobu'};
        });

        return odgovor;
    }

    async postaviSliku(sifra,slika){
        const odgovor = await http.put('/osoba/postaviSliku/'+ sifra,slika)
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

export default new OsobaDataService();