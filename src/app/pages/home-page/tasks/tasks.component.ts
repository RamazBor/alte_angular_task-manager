import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
    selector: 'alte-tasks',
    standalone: true,
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss',
    imports: [HeaderComponent]
})
export class TasksComponent {

}
