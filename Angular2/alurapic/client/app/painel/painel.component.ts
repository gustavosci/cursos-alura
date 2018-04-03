import { Component, Input, OnInit, ElementRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'painel',
    templateUrl: './painel.component.html',
    // Esse comando faz com que o Angular encapsule um CSS que será usado E visto apenas para esse componente
    styleUrls: ['./painel.component.css']
})

export class PainelComponent implements OnInit {

    @Input() titulo: string;
    elementoDOM: ElementRef;

    constructor(elementoDOM: ElementRef){
        // Esse comando faz com que eu receba a referência do elemento painel, criado no DOM, 
        //...para manipulação de funções do JQuery, por exemplo
        this.elementoDOM = elementoDOM;
    }
    
    // Método chamado depois de executar o construtor e depois de mover os valores para as propriedades Input()
    ngOnInit(){
        this.titulo =
            this.titulo.length > 7 
            ? this.titulo.substr(0, 7) + "..."
            : this.titulo;
    }

    fadeOut(cb) {   
        // Faz evento do Jquery (tem que usar o elemento nativo)
        $(this.elementoDOM.nativeElement).fadeOut(cb);
     }
}