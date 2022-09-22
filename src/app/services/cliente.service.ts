import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../Models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  entidade = "clientes";

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${environment.url}/${environment.app}/${this.entidade}.json`);
  };

  public get(id: string): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${environment.url}/${environment.app}/${this.entidade}/${id}.json`);
  };

  public post(cliente: Cliente): Observable<String>{
    return this.http.post<string>(`${environment.url}/${environment.app}/${this.entidade}.json`, cliente);
  };

  public put(id: string, cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${environment.url}/${environment.app}/${this.entidade}/${id}.json`, cliente);
  };

  public delete(id: string): Observable<any>{
    return this.http.delete<any>(`${environment.url}/${environment.app}/${this.entidade}/${id}.json`);
  };

  public getCEP(cep: string): Observable<any>{
    return this.http.get<any>(`http://viacep.com.br/ws/${cep}/json/`);
  }
}
