import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-usuario.view',
  templateUrl: './usuario.view.component.html',
  styleUrls: ['./usuario.view.component.css']
})
export class UsuarioViewComponent implements OnInit {

  id: number = 0;
  oUsuario: IUsuario = {} as IUsuario;
  fotoDni: string | undefined;
  modalImage: string = '';

  constructor(private oActivatedRoute: ActivatedRoute, private oUsuarioService: UsuarioService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }

  
  
    
  
  getOne() {
    this.oUsuarioService.getOne(this.id).subscribe({
      next: (data: IUsuario) => {
        this.oUsuario = data;
      },
      error: (err) => {
        console.error('Error al obtener los datos del Usuario', err);
      }
    });
  }

 
  
}