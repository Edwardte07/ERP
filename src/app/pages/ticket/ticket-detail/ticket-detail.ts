import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';

import { TicketService, TicketModel, TicketStatus } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    TagModule,
    TimelineModule
  ],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css'
})
export class TicketDetail {
  ticketId = 0;

  ticket: TicketModel = {
    id: 0,
    groupId: 0,
    titulo: '',
    descripcion: '',
    estadoActual: 'Pendiente',
    asignadoA: '',
    prioridad: 'Media',
    fechaCreacion: '',
    fechaLimite: '',
    comentarios: [],
    historialCambios: []
  };

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.ticketId = id ? +id : 0;

    const found = this.ticketService.getTicketById(this.ticketId);
    if (found) {
      this.ticket = found;
    }
  }

  getSeverity(status: TicketStatus): 'warning' | 'info' | 'success' | 'danger' {
    switch (status) {
      case 'Pendiente':
        return 'warning';
      case 'En progreso':
        return 'info';
      case 'Revisión':
        return 'danger';
      case 'Finalizado':
        return 'success';
    }
  }
}