import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent implements AfterViewInit{

    @Input() private titulo: string = 'Tem certeza?'
    @Input() private frase: string;
    @Output() confirma = new EventEmitter();
    private elemento: ElementRef;

    constructor(elemento: ElementRef){
        this.elemento = elemento;
    }

    // Implementa método chamado após a reinderização da página, ou seja, após o template ser carregado
    ngAfterViewInit(){
        // Define uma caixa de dialogo para o Elemento do DOM selecionado, e deixa em standby, até
        //...chamar show()
        $(this.elemento.nativeElement).dialog({
            title: this.titulo,
            autoOpen: false,
            resizable: false,
            modal: true,
            buttons: {
                Cancelar: ()=> {
                    $(this.elemento.nativeElement).dialog( "close" );
                },
                Confirmar: ()=> {
                    $(this.elemento.nativeElement).dialog( "close" );
                    // Emite evento de confirmação
                    this.confirma.emit();
                }
            }
        });
    }

    show(){
        $(this.elemento.nativeElement).dialog('open');
    }


}