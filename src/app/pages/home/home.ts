import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';

import { TicketService, TicketModel, TicketStatus } from '../../services/ticket.service';

interface GroupModel {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TagModule,
    DividerModule,
    TableModule,
    ButtonModule,
    ProgressBarModule,
    DropdownModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  groups: GroupModel[] = [
    { id: 1, nombre: 'Soporte' },
    { id: 2, nombre: 'Desarrollo' },
    { id: 3, nombre: 'QA' }
  ];

  selectedGroup: GroupModel | null = null;

  constructor(
    private router: Router,
    private ticketService: TicketService
  ) {}

  get filteredTickets(): TicketModel[] {
    const tickets = this.ticketService.getTickets();
    if (!this.selectedGroup) return tickets;
    return tickets.filter(t => t.groupId === this.selectedGroup!.id);
  }

  get totalTickets(): number {
    return this.filteredTickets.length;
  }

  countByStatus(status: TicketStatus): number {
    return this.filteredTickets.filter(t => t.estadoActual === status).length;
  }

  percentByStatus(status: TicketStatus): number {
    if (!this.totalTickets) return 0;
    return Math.round((this.countByStatus(status) / this.totalTickets) * 100);
  }

  onGroupChange(event: any) {
    const group = event.value;
    if (group) {
      this.selectedGroup = group;
      this.router.navigate(['/group', group.id]);
    }
  }

  viewTicket(ticketId: number) {
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