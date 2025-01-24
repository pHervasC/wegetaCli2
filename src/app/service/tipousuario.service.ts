import { Injectable } from '@angular/core';
import { httpOptions, serverURL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ITipoUsuario } from '../model/tipoUsuario.interface';
import { IPage } from '../environment/model.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

serverURL: string = serverURL + '/tipousuario';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<ITipoUsuario>> {
    let URL: string = '';
    URL += this.serverURL;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    if (field) {
      URL += '&sort=' + field;
      if (dir === 'asc') {
        URL += ',asc';
      } else {
        URL += ',desc';
      }
    }
    if (filtro) {
      URL += '&filter=' + filtro;
    }
    return this.oHttp.get<IPage<ITipoUsuario>>(URL, httpOptions);
  }

  get(id: number): Observable<ITipoUsuario> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITipoUsuario>(URL);
  }

  create(oTipoUsuario: ITipoUsuario): Observable<ITipoUsuario> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITipoUsuario>(URL, oTipoUsuario);
  }

  update(oTipoUsuario: ITipoUsuario): Observable<ITipoUsuario> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITipoUsuario>(URL, oTipoUsuario);
  }

  getOne(id: number): Observable<ITipoUsuario> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITipoUsuario>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

  getPageSubcuenta(id: number){
    return this.oHttp.get<number>(this.serverURL + "/subcuenta/" + id);
  }


  getXBalance(id: number): Observable<ITipoUsuario> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/xbalance/' + id;
    return this.oHttp.get<ITipoUsuario>(URL);
  }


  getPageXBalance(
    page: number,
    size: number,
    id: number
  ): Observable<IPage<ITipoUsuario>> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/xbalance/' + id;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    
    return this.oHttp.get<IPage<ITipoUsuario>>(URL, httpOptions);
  }

  getPageXBalanceNoTiene(
    page: number,
    size: number,
    id: number
  ): Observable<IPage<ITipoUsuario>> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/xbalancenotiene/' + id;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    
    return this.oHttp.get<IPage<ITipoUsuario>>(URL, httpOptions);
  }
}
