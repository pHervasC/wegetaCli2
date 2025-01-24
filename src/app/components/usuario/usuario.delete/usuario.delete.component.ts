import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';

declare let bootstrap: any;

@Component({
  selector: 'app-usuario.delete',
  templateUrl: './usuario.delete.component.html',
  styleUrls: ['./usuario.delete.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class UsuarioDeleteComponent implements OnInit {

  oUsuario: IUsuario | null = null;
  strMessage: string = '';
  myModal: any;
  constructor(
    private oUsuarioService: UsuarioService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) { }

 
  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oUsuarioService.get(id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario = oUsuario;
      },
      error: (err) => {
        this.showModal('Error al cargar el usuario');
      },
    });
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  deleteUsuario(): void {
    this.oUsuarioService.delete(this.oUsuario!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Usuario con id ' + this.oUsuario!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el Usuario');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/usuario/plist']);
  }
  
}

