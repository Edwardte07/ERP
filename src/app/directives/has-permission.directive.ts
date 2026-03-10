import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionsService } from '../services/permissions.service';

@Directive({
  selector: '[ifHasPermission]',
  standalone: true
})
export class HasPermissionDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permsService: PermissionsService
  ) {}

  @Input()
  set ifHasPermission(perms: string[]) {

    if (this.permsService.hasAnyPermission(perms)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }

  }
}