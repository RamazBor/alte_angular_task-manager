import { Injectable, } from '@angular/core';
import { ApiService } from '../core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends ApiService {

  getProjects() {
    return this.get('project/all');
  }
}
