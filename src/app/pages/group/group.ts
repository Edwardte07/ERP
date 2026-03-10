import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import {
  TicketService,
  TicketModel,
  TicketPriority,
  TicketStatus
} from '../../services/ticket.service';

interface GroupInfo {
  id: number;
  nombre: string;
  nivel: string;
  autor: string;
  descripcion: string;
}

interface GroupMember {
  id: number;
  groupId: number;
  nombre: string;
  email: string;
  rol: string;
}

interface CreateTicketForm {
  titulo: string;
  descripcion: string;
  estadoActual: TicketStatus;
  asignadoA: string;
  prioridad: TicketPriority;
  fechaCreacion: Date | null;
  fechaLimite: Date | null;
  comentarios: string;
}

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    DividerModule,
    TableModule,
    ButtonModule,
    TagModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    DropdownModule,
    CalendarModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './group.html',
  styleUrl: './group.css'
})
export class Group {
  groupId = 1;

  groups: GroupInfo[] = [
    {
      id: 1,
      nombre: 'Soporte',
      nivel: 'Medio',
      autor: 'Eduardo',
      descripcion: 'Grupo encargado de soporte y seguimiento de incidencias.'
    },
    {
      id: 2,
      nombre: 'Desarrollo',
      nivel: 'Alto',
      autor: 'Ana',
      descripcion: 'Grupo encargado del desarrollo de nuevas funcionalidades.'
    },
    {
      id: 3,
      nombre: 'QA',
      nivel: 'Intermedio',
      autor: 'Luis',
      descripcion: 'Grupo encargado de pruebas y calidad del sistema.'
    }
  ];

  group: GroupInfo = this.groups[0];

  viewMode: 'Lista' | 'Kanban' = 'Lista';
  viewOptions = ['Lista', 'Kanban'];

  allMembers: GroupMember[] = [
    { id: 1, groupId: 1, nombre: 'Eduardo Duarte', email: 'edu@gmail.com', rol: 'Administrador' },
    { id: 2, groupId: 1, nombre: 'Ana López', email: 'ana@gmail.com', rol: 'Miembro' },
    { id: 3, groupId: 2, nombre: 'Carlos Ruiz', email: 'carlos@gmail.com', rol: 'Administrador' },
    { id: 4, groupId: 2, nombre: 'María Torres', email: 'maria@gmail.com', rol: 'Miembro' },
    { id: 5, groupId: 3, nombre: 'Luis Pérez', email: 'luis@gmail.com', rol: 'Administrador' },
    { id: 6, groupId: 3, nombre: 'Sofía Díaz', email: 'sofia@gmail.com', rol: 'Miembro' }
  ];

  newMember = {
    nombre: '',
    email: '',
    rol: 'Miembro'
  };

  memberDialog = false;
  ticketDetailDialog = false;
  createTicketDialog = false;

  selectedTicket: TicketModel | null = null;

  statusFilter: TicketStatus | null = null;
  priorityFilter: TicketPriority | null = null;

  statusOptions: TicketStatus[] = ['Pendiente', 'En progreso', 'Revisión', 'Finalizado'];
  priorityOptions: TicketPriority[] = ['Baja', 'Media', 'Alta'];

  createTicketForm: CreateTicketForm = this.getEmptyTicketForm();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private ticketService: TicketService
  ) {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id')) || 1;
      this.groupId = id;

      const foundGroup = this.groups.find(g => g.id === id);
      if (foundGroup) {
        this.group = foundGroup;
      }
    });
  }

  private getEmptyTicketForm(): CreateTicketForm {
    return {
      titulo: '',
      descripcion: '',
      estadoActual: 'Pendiente',
      asignadoA: '',
      prioridad: 'Media',
      fechaCreacion: new Date(),
      fechaLimite: null,
      comentarios: ''
    };
  }

  private formatDate(date: Date | null): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  get members(): GroupMember[] {
    return this.allMembers.filter(member => member.groupId === this.groupId);
  }

  get memberNames(): string[] {
    return this.members.map(m => m.nombre);
  }

  get filteredTickets(): TicketModel[] {
    return this.ticketService.getTicketsByGroup(this.groupId).filter(ticket => {
      const matchesStatus = this.statusFilter ? ticket.estadoActual === this.statusFilter : true;
      const matchesPriority = this.priorityFilter ? ticket.prioridad === this.priorityFilter : true;
      return matchesStatus && matchesPriority;
    });
  }

  get pendingTickets(): TicketModel[] {
    return this.filteredTickets.filter(t => t.estadoActual === 'Pendiente');
  }

  get progressTickets(): TicketModel[] {
    return this.filteredTickets.filter(t => t.estadoActual === 'En progreso');
  }

  get revisionTickets(): TicketModel[] {
    return this.filteredTickets.filter(t => t.estadoActual === 'Revisión');
  }

  get finishedTickets(): TicketModel[] {
    return this.filteredTickets.filter(t => t.estadoActual === 'Finalizado');
  }

  openMemberDialog() {
    this.newMember = { nombre: '', email: '', rol: 'Miembro' };
    this.memberDialog = true;
  }

  addMember() {
    if (!this.newMember.nombre.trim() || !this.newMember.email.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Faltan datos',
        detail: 'Nombre y email son obligatorios'
      });
      return;
    }

    this.allMembers = [
      ...this.allMembers,
      {
        id: Date.now(),
        groupId: this.groupId,
        nombre: this.newMember.nombre,
        email: this.newMember.email,
        rol: this.newMember.rol
      }
    ];

    this.memberDialog = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Agregado',
      detail: 'Miembro agregado al grupo'
    });
  }

  removeMember(member: GroupMember) {
    this.allMembers = this.allMembers.filter(m => m.id !== member.id);

    this.messageService.add({
      severity: 'success',
      summary: 'Eliminado',
      detail: 'Miembro eliminado del grupo'
    });
  }

  clearFilters() {
    this.statusFilter = null;
    this.priorityFilter = null;
  }

  openTicketDetail(ticket: TicketModel) {
    this.selectedTicket = ticket;
    this.ticketDetailDialog = true;
  }

  openCreateTicketDialog() {
    this.createTicketForm = this.getEmptyTicketForm();
    this.createTicketDialog = true;
  }

  saveTicketFromModal() {
    if (
      !this.createTicketForm.titulo.trim() ||
      !this.createTicketForm.descripcion.trim() ||
      !this.createTicketForm.asignadoA.trim()
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Faltan datos',
        detail: 'Título, descripción y asignado son obligatorios'
      });
      return;
    }

    const newTicket: TicketModel = {
      id: Date.now(),
      groupId: this.groupId,
      titulo: this.createTicketForm.titulo,
      descripcion: this.createTicketForm.descripcion,
      estadoActual: this.createTicketForm.estadoActual,
      asignadoA: this.createTicketForm.asignadoA,
      prioridad: this.createTicketForm.prioridad,
      fechaCreacion: this.formatDate(this.createTicketForm.fechaCreacion),
      fechaLimite: this.formatDate(this.createTicketForm.fechaLimite),
      comentarios: this.createTicketForm.comentarios
        ? [this.createTicketForm.comentarios]
        : [],
      historialCambios: [
        {
          status: this.createTicketForm.estadoActual,
          date: this.formatDate(this.createTicketForm.fechaCreacion)
        }
      ]
    };

    this.ticketService.addTicket(newTicket);
    this.createTicketDialog = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Creado',
      detail: 'Ticket creado correctamente'
    });
  }

  goToTicketPage(ticketId: number) {
    this.router.navigate(['/ticket', ticketId]);
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