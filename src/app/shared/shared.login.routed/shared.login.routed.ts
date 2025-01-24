import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { SessionService } from '../../service/session.service';
import { IJwt } from '../../model/jwt.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './shared.login.routed.html',
  styleUrls: ['./shared.login.routed.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ]
})
export class SharedLoginRoutedComponent implements OnInit {

  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private oLoginService: LoginService,
    private oSessionService: SessionService,
    private orouter: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const loginData = {
        email: form.value.email,
        password: form.value.password
      };
      this.oLoginService.login(loginData.email, loginData.password).subscribe({
        next: (token: string) => {
          console.log('Token recibido:', token);
          alert('Inicio de sesión exitoso');


          this.oSessionService.setToken(token);


          this.oSessionService.login();


          //let parsedToken: IJwt;
          //parsedToken = this.oSessionService.parseJwt(token);
          //console.log('Token parseado:', parsedToken);


          // Redirige al usuario a la página principal, por ejemplo
           this.orouter.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al realizar la solicitud', error);
          alert('Correo o contraseña incorrectos');
          this.errorMessage = 'Correo o contraseña incorrectos';
        }
      });
    }



  }


}
