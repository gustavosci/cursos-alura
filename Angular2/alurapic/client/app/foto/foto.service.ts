import { Http, Headers } from '@angular/http';
import { FotoComponent } from './foto.component';
import { Injectable } from '@angular/core';

// Aqui eu defino que essa classe permite injeção de dependências
// Diferente dos componentes, por padrão classes "normais" não injetam dependências nos seus construtures
@Injectable()
export class FotoService {

    ajax: Http;
    headers: Headers;
    url: string = 'v1/fotos';

    constructor(ajax: Http){
        // O Typescript consegue injetar as configurações padrões HTTP no momento da construção do objeto
        this.ajax = ajax;
        // Define o header das requisições POST
        this.headers = new Headers();
        this.headers.append('Content-type', 'application/json');        
    }
    
    // Faz a requisição AJAX POST para cadastro/alteração da foto e retorna a resposta ao chamador
    cadastra(foto: FotoComponent){        
        let stringFoto: string =  JSON.stringify(foto);
        let header: Object = { headers: this.headers};
        if(foto._id){
            return this.ajax.put(this.url + "/" + foto._id, stringFoto, header)
                            .map(() => new MensagemCadastro("Foto alterada com sucesso!", false));
        } else {
            return this.ajax.post(this.url, stringFoto, header)
                            .map(() => new MensagemCadastro("Foto incluída com sucesso!", true));
        }        
    }

    // Faz a requisição AJAX GET para retorno das fotos cadastradas
    lista(){

        // Faz a função acima de forma resumida. O uso do map é semelhante ao javascript, mas o do Angular
        // ...entende que todo retorno deve ir para res
        return this.ajax.get(this.url).map(res => res.json());
    }

    remove(foto: FotoComponent){
        return this.ajax.delete(this.url + "/" + foto._id);
    }

    buscaPorId(id: String){
        return this.ajax
                    .get(this.url + "/" + id)
                    .map(res => res.json());
    }
    
}

// Criei um tipo de dado para retorno das minhas requisições HTTP
export class MensagemCadastro{

    // Por padrão, atributos privados tem underline na frente das propriedades
    private _mensagem: string;
    private _inclusao: boolean;

    constructor(mensagem: string, inclusao: boolean){
        this._mensagem = mensagem;
        this._inclusao = inclusao;
    }

    // Getters e setters podem ser usados com comando "get" e comando "set". 
    //...Assim, mesmo sendo atributo privado, posso usá-los normalmente em outras classes como atributo

    get mensagem() : string{
        return this._mensagem;
    }

    get inclusao() : boolean{
        return this._inclusao;
    }

}