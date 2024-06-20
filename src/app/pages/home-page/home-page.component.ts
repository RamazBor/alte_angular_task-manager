import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'alte-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    imports: [HeaderComponent, RouterOutlet]
})
export class HomePageComponent {

}
