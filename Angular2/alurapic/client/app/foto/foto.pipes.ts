import { Pipe, PipeTransform } from '@angular/core';
import { FotoComponent } from './foto.component';

@Pipe({
    name: 'filtroPorTitulo'
})

// O implements serve para padronizar a implementação de um método. Nesse caso, o fato de eu extender 
//...PipeTransform me obriga a ter o método "transform" na minha classe.
export class FiltroPorTitulo implements PipeTransform {

    transform(fotos: FotoComponent[], textDigitado: string){
        textDigitado = textDigitado.toLowerCase();
        return fotos.filter(function(fotoAtual){
            return fotoAtual.titulo.toLowerCase().includes(textDigitado);
        });
    }
}