import { getLocaleCurrencyCode } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/Models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit, OnDestroy {
  cliente: Cliente = new Cliente();
  sub: any;
  nome: string = '';
  id: string = '';
  titulo = "Cadastra novo cliente";


  constructor(private clienteService: ClienteService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id){
        this.titulo = "Alterar dados do cliente " + this.id;
        this.getCliente(this.id);
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  salvar(){
    if(this.id){
      this.atualizaCliente(this.id, this.cliente);
    } else{
      this.adcionaCliente(this.cliente);
    }
  }

  public getCliente(id: string){
    const observable = this.clienteService.get(id);
    observable.subscribe(c => {
      console.log(c);
    })
  } 

  public adcionaCliente(cliente: Cliente){
    const observable = this.clienteService.post(cliente);
    observable.subscribe(c => {
      console.log("Novo cliente adicionado" + c);
    })
  } 

  public atualizaCliente(id: string, cliente: Cliente){
    const observable = this.clienteService.put(id, cliente);
    observable.subscribe(c => {
      console.log("Cliente atualizado" + c);
    })
  } 

  validaCEP(){
    const observable = this.clienteService.getCEP(this.cliente['cep']);
    observable.subscribe(c => {
      console.log("Cliente atualizado" + c);
    })
  }
}
