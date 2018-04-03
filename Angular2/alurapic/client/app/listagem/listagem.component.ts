import { Component } from "@angular/core";
import { FotoService } from "../foto/foto.service";
import { FotoComponent } from "../foto/foto.component";
import { PainelComponent } from "../painel/painel.component";

@Component({
    moduleId: module.id,
    selector: "listagem",
    templateUrl: "./listagem.component.html"
})


export class ListagemComponent{
    // Declara um array de objetos denominado fotos
    fotos: FotoComponent[] = [];
    service: FotoService;
    mensagem: string = '';

    constructor(service: FotoService){
        this.service = service;
        this.montaListagem();
    }

    montaListagem(){
        // Busca as fotos do servidor e atualiza o array this.fotos, forçando reinderização da view
        this.service
            .lista()   
            .subscribe(fotos => {
                this.fotos = fotos;
                console.log(this.fotos);
            }, erro => console.log(erro));
    }

    remove(foto: FotoComponent, painel: PainelComponent){

        this.service
            .remove(foto)
            .subscribe(
                () => {

                    // Faz o evento de fadeout do Jquery (funcao do componente painel) e depois de feito isso, 
                    //...executa a função chamada de callback 
                    painel.fadeOut(() => {
                        // Força um change detection para o Angular reinderizar a view. Estamos atribuindo um
                        //...nova referência a this.fotos                     
                        let novaListaFotos = this.fotos.slice(0);
                        let indice = novaListaFotos.indexOf(foto);
                        novaListaFotos.splice(indice, 1);
                        this.fotos = novaListaFotos;
                        this.mensagem = "Foto removida com sucesso!";
                    })
                }, 
                erro => {
                    console.log(erro);
                    this.mensagem = "Erro na remoção da foto!";
                }
            );
    }
}