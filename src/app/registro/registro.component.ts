import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {RegistroCliente, UsuarioDTO} from "../modelos/RegistroCliente";
import {addIcons} from "ionicons";
import {idCardOutline, keyOutline, person, personCircleOutline, personOutline} from "ionicons/icons";
import {Router} from "@angular/router";
import { CommonModule } from '@angular/common';



interface ValidationMessage {
  [key: string]: string;
}

interface ValidationMessages {
  [key: string]: ValidationMessage;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule ],
  providers: [LoginService]
})
export class RegistroComponent implements OnInit {
  registroCliente: RegistroCliente = new RegistroCliente();
  registroForm!: FormGroup;
  formSubmitted = false;

  // Ahora validationMessages está tipado correctamente
  validationMessages: ValidationMessages = {
    nombre: {
      required: 'El nombre es obligatorio',
      pattern: 'El nombre solo puede contener letras y espacios'
    },
    apellido1: {
      required: 'El primer apellido es obligatorio',
      pattern: 'El apellido solo puede contener letras y espacios'
    },
    apellido2: {
      pattern: 'El apellido solo puede contener letras y espacios'
    },
    dni: {
      required: 'El DNI es obligatorio',
      pattern: 'El formato del DNI debe ser 8 números seguidos de una letra',
      dniInvalido: 'El DNI no es válido'
    },
    email: {
      required: 'El email es obligatorio',
      email: 'El formato del email no es válido'
    },
    username: {
      required: 'El nombre de usuario es obligatorio',
      pattern: 'El username solo puede contener letras y números',
      minlength: 'El username debe tener al menos 4 caracteres'
    },
    password: {
      required: 'La contraseña es obligatoria',
      minlength: 'La contraseña debe tener al menos 6 caracteres',
      pattern: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    }
  };

  constructor(
    private service: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {
    addIcons({
      personOutline,
      keyOutline,
      idCardOutline,
      person,
      personCircleOutline
    });
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/)
      ]],
      apellido1: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/)
      ]],
      apellido2: ['', [
        Validators.pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/)
      ]],
      dni: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{8}[A-Za-z]$/),
        this.validarDNI()
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      username: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]+$/),
        Validators.minLength(4)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
      ]]
    });
  }

  validarDNI() {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
      const dni = control.value;
      
      if (!dni) return null;
      
      if (dni.length !== 9) return { dniInvalido: true };
      
      const numero = dni.substr(0, 8);
      const letra = dni.substr(8, 1).toUpperCase();
      
      if (letras[numero % 23] !== letra) {
        return { dniInvalido: true };
      }
      
      return null;
    };
  }

  getErrorMessage(controlName: string): string {
    const control = this.registroForm.get(controlName);
    if (control && control.errors && (control.dirty || control.touched || this.formSubmitted)) {
      const errorKey = Object.keys(control.errors)[0];
      return this.validationMessages[controlName][errorKey] || 'Error de validación';
    }
    return '';
  }

  hasError(controlName: string): boolean {
    const control = this.registroForm.get(controlName);
    return !!(control && control.errors && (control.dirty || control.touched || this.formSubmitted));
  }

  completarRegistro() {
    this.rellenarDatos(); // Rellena el objeto registroCliente con los datos del formulario
    this.service.registrarCliente(this.registroCliente).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']); // Redirige al login tras el registro
      },
      error: (error) => {
        console.error('Error al registrar cliente:', error);
      }
    });
  }

  rellenarDatos(): void {
    this.registroCliente.nombre = this.f['nombre'].value;
    this.registroCliente.apellido1 = this.f['apellido1'].value;
    this.registroCliente.apellido2 = this.f['apellido2'].value;
    this.registroCliente.dni = this.f['dni'].value;
    this.registroCliente.email = this.f['email'].value;
    this.registroCliente.usuarioDTO.username = this.f['username'].value;
    this.registroCliente.usuarioDTO.password = this.f['password'].value;
    this.registroCliente.usuarioDTO.rol = 'USUARIO';
  }

  get f() {
    return this.registroForm.controls;
  }
}