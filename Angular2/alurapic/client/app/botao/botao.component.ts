import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'botao',
    templateUrl: './botao.component.html'
})
export class BotaoComponent{
    
    // Campos vindos da View para o Controller
    @Input() nome: string = 'Ok';
    @Input() estilo: string = 'btn-default';
    @Input() tipo: string = 'button';
    @Input() desabilitado: boolean = false;
    // Campos saídos do controller e retornando para a view
    @Output() acao = new EventEmitter();

    
    // Executa ação do botão
    executaAcao(){
        // Neste momento, é emitido um evento denominado "acao". Agora, no HTML que usa o componente, devo
        //...fazer a ação usando a sintaxe "(acao)='remove(foto)'", por exemplo (ver listagem)
        this.acao.emit(null);

    }
}