import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
    selector: 'alte-sign-up',
    standalone: true,
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
    imports: [HeaderComponent]
})
export class SignUpComponent {

}
