import { getLocaleCurrencyCode } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/Models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import {  FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit, OnDestroy {
  cliente: Cliente = new Cliente();
  sub: any;
  id: string = '';
  titulo = "Cadastra novo cliente";
  perfilCliente: FormGroup = new FormGroup({
    nome: new FormControl(this.cliente.nome, [
      Validators.required,
    ]),
    cpf: new FormControl(this.cliente.cpf, [
      Validators.required,
      Validators.minLength(11),
    ]),
    cep: new FormControl(this.cliente.cep, [
      Validators.required,
      Validators.minLength(8),
    ]),
    endereco: new FormControl(this.cliente.endereco, [
      Validators.required,
    ])
  });

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

  onSubmit() {
    this.cliente.nome = this.perfilCliente.value.nome;
    this.cliente.cpf = this.perfilCliente.value.cpf;
    this.cliente.cep = this.perfilCliente.value.cep;
    this.cliente.endereco = this.perfilCliente.value.endereco;
    // TODO: Use EventEmitter with form value
    // console.log(this.perfilCliente.value);
    // console.log(this.cliente);
    this.salvar();
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

  async buscaCEP(){
    const observable = this.clienteService.getCEP(this.perfilCliente.value.cep);
    observable.subscribe(c => {
      if(c.erro){
        console.log("CEP inválido");
      } else{
        this.perfilCliente.patchValue({
          endereco: c.logradouro,
        })
      }
    })
  }
}
