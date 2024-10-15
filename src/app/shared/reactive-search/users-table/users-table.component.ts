import { Component, Input } from '@angular/core';
import { IUser } from '../user-data.interface';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {
  @Input('data') users: IUser[] | undefined;
}
