import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

type GroupModel = {
  nombre: string;
  nivel: string;
  autor: string;
  integrantes: number;
  tickets: number;
  descripcion: string;
};

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    CardModule,
    TagModule,
    ProgressBarModule,
    DividerModule,

    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,

    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './group.html',
  styleUrl: './group.css',
})
export class Group {
  total = 12;
  avance = 65;

  groups: GroupModel[] = [
    {
      nombre: 'Soporte',
      nivel: 'Medio',
      autor: 'Eduardo',
      integrantes: 5,
      tickets: 12,
      descripcion: 'Atención y soporte interno',
    },
  ];

  dialogVisible = false;
  editMode = false;

  group: GroupModel = this.createEmptyGroup();

  
  private nombreOriginal: string | null = null;

  constructor(private messageService: MessageService) {}

  private createEmptyGroup(): GroupModel {
    return {
      nombre: '',
      nivel: '',
      autor: '',
      integrantes: 0,
      tickets: 0,
      descripcion: '',
    };
  }

  openNew() {
    this.group = this.createEmptyGroup();
    this.editMode = false;
    this.nombreOriginal = null;
    this.dialogVisible = true;
  }

  editGroup(row: GroupModel) {
    this.group = { ...row };
    this.editMode = true;
    this.nombreOriginal = row.nombre;
    this.dialogVisible = true;
  }

  saveGroup() {
    // validación mínima
    if (!this.group.nombre?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Falta información',
        detail: 'El nombre es obligatorio',
      });
      return;
    }

    if (this.editMode && this.nombreOriginal) {
      const index = this.groups.findIndex((g) => g.nombre === this.nombreOriginal);

      if (index !== -1) {
        this.groups[index] = { ...this.group };
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Grupo actualizado',
        });
      }
    } else {
      // evitar duplicados por nombre
      const exists = this.groups.some(
        (g) => g.nombre.trim().toLowerCase() === this.group.nombre.trim().toLowerCase()
      );
      if (exists) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Duplicado',
          detail: 'Ya existe un grupo con ese nombre',
        });
        return;
      }

      this.groups = [...this.groups, { ...this.group }];
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Grupo creado',
      });
    }

    this.dialogVisible = false;
    this.recalcDashboard();
  }

  deleteGroup(row: GroupModel) {
    this.groups = this.groups.filter((g) => g !== row);

    this.messageService.add({
      severity: 'success',
      summary: 'Eliminado',
      detail: 'Grupo eliminado',
    });

    this.recalcDashboard();
  }

  private recalcDashboard() {
    this.total = this.groups.length;

    
    const totalTickets = this.groups.reduce((acc, g) => acc + (g.tickets ?? 0), 0);
    this.avance = Math.min(100, totalTickets * 5); 
  }
}