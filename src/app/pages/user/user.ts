import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


import { MessageService, ConfirmationService } from 'primeng/api';

interface Profile {
  username: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  birthdate: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    DividerModule,
    AvatarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {

  editDialog = false;

  profile: Profile = {
    username: 'Eduardo Duarte',
    email: 'edu@gmail.com',
    role: 'Administrador',
    phone: '4421234567',
    address: 'Querétaro, México',
    birthdate: '2007-09-27'
  };

  tempProfile: Profile = { ...this.profile };

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  openEdit() {
    this.tempProfile = { ...this.profile };
    this.editDialog = true;
  }

  saveProfile() {
    this.profile = { ...this.tempProfile };
    this.editDialog = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Actualizado',
      detail: 'Perfil actualizado correctamente'
    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas eliminar tu cuenta?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',

      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',

      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',

      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Cuenta eliminada',
          detail: 'Tu cuenta fue eliminada correctamente'
        });


      }
    });
  }
}