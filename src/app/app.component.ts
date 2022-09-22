import { Component, OnInit } from '@angular/core';
import { Cliente } from './Models/cliente';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Projeto 01';
  listacliente = new Array<Cliente>();

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.getClientes();
  }
  public getClientes(){
    this.listacliente = [];
    const observable = this.clienteService.getAll();
    observable.subscribe(ls => {
      const entries = Object.entries(ls);
      entries.forEach(entry => {
        const c = entry[1];
        c.id = entry[0];
        this.listacliente.push(c);
      })
    })
  }
  public deletaCliente(id: string){
    const observable = this.clienteService.delete(id);
    observable.subscribe(c => {
      console.log("Cliente deletado" + c);
    })
  } 

}
