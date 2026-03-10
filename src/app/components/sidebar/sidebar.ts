import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { HasPermissionDirective } from '../../directives/has-permission.directive';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, PanelMenuModule, HasPermissionDirective, ButtonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: ['/home'],
    },

    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      routerLink: ['/']
    },

    {
      label: 'Grupos',
      icon: 'pi pi-box',
      routerLink: ['/group']
    },

    {
      label: 'Perfil',
      icon: 'pi pi-user',
      routerLink: ['/user']
    },
    
  ];
}