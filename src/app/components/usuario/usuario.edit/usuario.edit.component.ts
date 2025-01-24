import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';
declare let bootstrap: any;
@Component({
  selector: 'app-usuario.edit',
  templateUrl: './usuario.edit.component.html',
  styleUrls: ['./usuario.edit.component.css'],
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
})


export class UsuarioEditComponent implements OnInit {
  id: number = 0;
  oUsuarioForm: FormGroup | undefined = undefined;
  oUsuario: IUsuario | null = null;
  strMessage: string = '';

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  
  ngOnInit() {
    this.createForm();
    this.get();
    this.oUsuarioForm?.markAllAsTouched();
  }

  createForm() {
    this.oUsuarioForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido1: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido2: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
     
     
    });
  }

  onReset() {
    this.oUsuarioService.get(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario= oUsuario;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oUsuarioForm?.controls['id'].setValue(this.oUsuario?.id);
    this.oUsuarioForm?.controls['nombre'].setValue(this.oUsuario?.nombre);
    this.oUsuarioForm?.controls['apellido1'].setValue(this.oUsuario?.apellido1);
    this.oUsuarioForm?.controls['apellido2'].setValue(this.oUsuario?.apellido2);
    this.oUsuarioForm?.controls['email'].setValue(this.oUsuario?.email);
  }

  get() {
    this.oUsuarioService.get(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario = oUsuario;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showModal(strMessage: string) {
    this.strMessage = strMessage;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/usuario/plist/']);
  };

  onSubmit() {
    if (!this.oUsuarioForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oUsuarioService.update(this.oUsuarioForm?.value).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.updateForm();
          this.showModal('Usuario ' + this.oUsuario.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el usuario');
          console.error(error);
        },
      });
    }
  }
}