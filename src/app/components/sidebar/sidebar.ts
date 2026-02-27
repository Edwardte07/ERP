import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, PanelMenuModule],
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
      label: 'Catálogos',
      icon: 'pi pi-database',
      items: [
        // cuando crees la pantalla Divisiones, la agregas aquí
        // { label: 'Divisiones', icon: 'pi pi-sitemap', routerLink: ['/divisiones'] },
      ],
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      items: [
        { label: 'Perfil (demo)', icon: 'pi pi-user', routerLink: ['/home'] },
      ],
    },
  ];

}