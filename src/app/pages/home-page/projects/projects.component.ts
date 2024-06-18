import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
    selector: 'alte-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
    imports: [HeaderComponent]
})
export class ProjectsComponent {

}
