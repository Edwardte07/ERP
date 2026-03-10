import { Injectable } from '@angular/core';

export type TicketStatus = 'Pendiente' | 'En progreso' | 'Revisión' | 'Finalizado';
export type TicketPriority = 'Baja' | 'Media' | 'Alta';

export interface TicketModel {
  id: number;
  groupId: number;
  titulo: string;
  descripcion: string;
  estadoActual: TicketStatus;
  asignadoA: string;
  prioridad: TicketPriority;
  fechaCreacion: string;
  fechaLimite: string;
  comentarios: string[];
  historialCambios: { status: string; date: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets: TicketModel[] = [
    {
      id: 1,
      groupId: 1,
      titulo: 'Error login',
      descripcion: 'No permite acceso',
      estadoActual: 'Pendiente',
      asignadoA: 'Eduardo Duarte',
      prioridad: 'Alta',
      fechaCreacion: '2025-03-01',
      fechaLimite: '2025-03-08',
      comentarios: ['Usuario reportó falla'],
      historialCambios: [{ status: 'Pendiente', date: '2025-03-01' }]
    },
    {
      id: 2,
      groupId: 1,
      titulo: 'Actualizar dashboard',
      descripcion: 'Agregar estadísticas',
      estadoActual: 'En progreso',
      asignadoA: 'Ana López',
      prioridad: 'Media',
      fechaCreacion: '2025-03-02',
      fechaLimite: '2025-03-09',
      comentarios: ['Se inició desarrollo'],
      historialCambios: [
        { status: 'Pendiente', date: '2025-03-02' },
        { status: 'En progreso', date: '2025-03-03' }
      ]
    },
    {
      id: 3,
      groupId: 2,
      titulo: 'Corregir API',
      descripcion: 'Endpoint con error 500',
      estadoActual: 'Revisión',
      asignadoA: 'Carlos Ruiz',
      prioridad: 'Alta',
      fechaCreacion: '2025-03-03',
      fechaLimite: '2025-03-10',
      comentarios: ['Backend en revisión'],
      historialCambios: [{ status: 'Revisión', date: '2025-03-04' }]
    },
    {
      id: 4,
      groupId: 3,
      titulo: 'Pruebas de registro',
      descripcion: 'Validar flujo de alta',
      estadoActual: 'Finalizado',
      asignadoA: 'Luis Pérez',
      prioridad: 'Baja',
      fechaCreacion: '2025-03-01',
      fechaLimite: '2025-03-06',
      comentarios: ['Pruebas completadas'],
      historialCambios: [{ status: 'Finalizado', date: '2025-03-06' }]
    }
  ];

  getTickets(): TicketModel[] {
    return [...this.tickets];
  }

  getTicketsByGroup(groupId: number): TicketModel[] {
    return this.tickets.filter(ticket => ticket.groupId === groupId);
  }

  getTicketById(id: number): TicketModel | undefined {
    return this.tickets.find(ticket => ticket.id === id);
  }

  addTicket(ticket: TicketModel): void {
    this.tickets = [...this.tickets, ticket];
  }
}