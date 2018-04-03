import { NgModule } from '@angular/core';
import { FotoComponent } from './foto.component';
import { FiltroPorTitulo } from './foto.pipes';
import { FotoService } from './foto.service';

@NgModule({
    // Declaration é o que o MEU MODULO USA
    declarations: [ FotoComponent, FiltroPorTitulo ],
    // exports é o que eu quero que os módulos que importem foto.module podem acessar
    exports: [ FotoComponent, FiltroPorTitulo ],
    // Serviços devem sempre voltar em providers (diferente de pipes e componentes)
    providers: [ FotoService ]
})

export class FotoModule { }