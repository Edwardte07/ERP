import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

type TicketStatus = 'Pendiente' | 'En progreso' | 'Revisión' | 'Finalizado';
type TicketPriority = 'Baja' | 'Media' | 'Alta';

interface TicketForm {
  titulo: string;
  descripcion: string;
  estadoActual: TicketStatus;
  asignadoA: string;
  prioridad: TicketPriority;
  fechaCreacion: Date | null;
  fechaLimite: Date | null;
  comentarios: string;
  historialCambios: string;
}

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css'
})
export class CreateTicket {
  statusOptions: TicketStatus[] = ['Pendiente', 'En progreso', 'Revisión', 'Finalizado'];
  priorityOptions: TicketPriority[] = ['Baja', 'Media', 'Alta'];
  members: string[] = ['Eduardo Duarte', 'Ana López', 'Luis Antonio'];

  ticket: TicketForm = {
    titulo: '',
    descripcion: '',
    estadoActual: 'Pendiente',
    asignadoA: '',
    prioridad: 'Media',
    fechaCreacion: new Date(),
    fechaLimite: null,
    comentarios: '',
    historialCambios: ''
  };

  constructor(
    private messageService: MessageService,
    private router: Router
  ) {}

  saveTicket() {
    if (!this.ticket.titulo.trim() || !this.ticket.descripcion.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Faltan datos',
        detail: 'Título y descripción son obligatorios'
      });
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Creado',
      detail: 'Ticket creado correctamente'
    });

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 800);
  }
}