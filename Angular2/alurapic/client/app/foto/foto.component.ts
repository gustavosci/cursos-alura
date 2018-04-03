import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'foto',
    templateUrl: './foto.component.html',
    // Esse comando faz com que o Angular encapsule um CSS que será usado E visto apenas para esse componente
    styleUrls: ['./foto.component.css']
})

export class FotoComponent {

    // Input indica que as propriedades recebem o valor de fora, como por exemplo, do retorno de um server
    @Input() titulo: string;
    @Input() url: string;
    descricao: string;
    _id: string;
 }