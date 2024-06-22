import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { ProjectsFacade } from '../../../facades';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
    selector: 'alte-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
    imports: [HeaderComponent, AsyncPipe, JsonPipe]
})
export class ProjectsComponent {
  projectsFacade: ProjectsFacade = inject(ProjectsFacade);

  projects$ = this.projectsFacade.getProjects();
}
