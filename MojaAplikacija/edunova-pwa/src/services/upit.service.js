import http from "../http-common";


class UpitDataService{
    async get(){
        return await http.get("/upit");
    }

    async getBySifra(sifra){
        return await http.get('/upit/'+ sifra);
    }


    async getOsobe(sifra){
        return await http.get('/upit/' + sifra + '/osoba/');
    }

    async getOglas(sifra){
        return await http.get('/upit/' + sifra + '/oglas/')
    }

    async obrisiOsobu(upit,osoba){
        const odgovor = await http.delete('/upit/' + upit + '/obrisi/' + osoba)
        .then(response =>{
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(error =>{
            console.log(error);
            return {ok: false, poruka: error.respnse.data};
        });

        return odgovor;
    }

    async obrisiOglas(upit,oglas){
        const odgovor = await http.delete('/upit/' + upit + '/oglas/' + oglas)
        .then(response =>{
            return {ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(error =>{
            console.log(error);
            return {ok: false, poruka: error.respnse.data};
        });

        return odgovor;
    }

    async dodajOsobu(upit,osoba){
        const odgovor = await http.post('/upit/' + upit + '/dodaj/' + osoba)
        .then(response =>{
            return {ok: true, poruka: 'Uspješno unjeo'};
        })
        .catch(error =>{
            console.log(error);
            return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }

    async dodajOglas(upit,oglas){
        const odgovor = await http.post('/upit/' + upit + '/dodaj/' + oglas)
        .then(response =>{
            return {ok: true, poruka: 'Uspješno unjeo'};
        })
        .catch(error =>{
            console.log(error);
            return {ok: false, poruka: error.response.data};
        });

        return odgovor;
    }

    async delete(sifra){
        const odgovor=await http.delete('/upit/'+ sifra)
        .then(response => {
            return{ok: true, poruka: 'Obrisao uspješno'};
        })
        .catch(e=> {
            return{ok: false, poruka: e.respnse.data};
        });

        return odgovor;
    }

    async post (upit){
        const odgovor = await http.post('/upit',upit)
        .then(response => {
        return {ok: true, poruka: 'Unio upit'};
        })
        .catch(error => {
            return {ok: false, poruka: error.respnse.data};
        });

        return odgovor;
    }
   
    
}

export default new UpitDataService();