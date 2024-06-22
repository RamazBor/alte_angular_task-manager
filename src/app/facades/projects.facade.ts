import { Injectable, inject } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {

  projectsService: ProjectsService = inject(ProjectsService);

  getProjects() {
    return this.projectsService.getProjects();
  }
}
