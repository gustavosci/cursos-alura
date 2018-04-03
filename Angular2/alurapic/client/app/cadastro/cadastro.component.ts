import { Component } from "@angular/core";
import { FotoComponent } from '../foto/foto.component';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FotoService } from "../foto/foto.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "cadastro",
    templateUrl: "./cadastro.component.html"
})

export class CadastroComponent{

    foto: FotoComponent = new FotoComponent();
    meuForm: FormGroup;
    service: FotoService;
    route: ActivatedRoute;
    router: Router;
    mensagem: string = '';

    // O Typescript consegue injetar as configurações padrões de um objeto no momento da construção deste
    constructor(service: FotoService, formBuilder: FormBuilder, route: ActivatedRoute, router: Router){

        this.setService(service);
        this.setRouter(router);
        this.setRoute(route);        
        this.setMeuForm(formBuilder);
    }

    setService(service: FotoService){
        this.service = service;
    }

    setRouter(router){
        this.router = router;
    }

    setRoute(route: ActivatedRoute){
        this.route = route;
        // Busca foto recebida no link (rota) e define propriedade foto
        this.route.params.subscribe(params => {
            let id = params["id"];
            if(id){
                this.setFotoPorId(id);
            }
        })
    }

    setFotoPorId(id: string){
        this.service
        .buscaPorId(id)
        .subscribe(
            foto => {
                this.foto = foto;
            },
            erro => {
                console.log(erro);
                // Exibe erro e reencaminha para página inicial
                alert("Foto não encontrada!");
                this.router.navigate(['']);
            }
        );
    }

    setMeuForm(formBuilder: FormBuilder){
        this.meuForm = formBuilder.group({
            titulo: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            url: ['', Validators.compose([Validators.required])],
            descricao: ['']
        });
    }

    cadastrar(event){
        
        event.preventDefault();

        // Faz a requisição AJAX e já trata retorno
        this.service.
        cadastra(this.foto)
            .subscribe(res => {
                console.log(res);
                // Cria novo objeto de foto para inicializar dados do formulário
                this.foto = new FotoComponent();
                // Define mensagem de retorno
                this.mensagem = res.mensagem;
                // Na alteração retorna a página inicial
                if(!res.inclusao){                
                    this.router.navigate([''])
                }
            }, erro => {console.log(erro)});
    }

}