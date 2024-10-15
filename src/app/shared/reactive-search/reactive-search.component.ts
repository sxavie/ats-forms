import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs';
import { UsersTableComponent } from './users-table/users-table.component';

@Component({
  selector: 'app-reactive-search',
  standalone: true,
  imports: [UsersTableComponent, ReactiveFormsModule],
  templateUrl: './reactive-search.component.html',
  styleUrl: './reactive-search.component.css'
})
export class ReactiveSearchComponent implements OnInit {

  private http: HttpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  placeholderApi = 'https://jsonplaceholder.typicode.com/users';

  searchControl = new FormControl('')

  searchUsersData: any = [];
  searchUsersDataSubs$ = new Observable<any[]>

  ngOnInit(): void {
    this.subscribeToSeachValueChange();
  }

  subscribeToSeachValueChange() {
    this.searchControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(value => this.getUsersData(value || ''))
    ).subscribe(response => this.searchUsersData = response)
  }

  getUsersData(value: string) {
    return this.searchUsersDataSubs$ = this.http.get<any[]>(this.placeholderApi)
      .pipe(
        take(1),
        map((data: any) => data.filter((item: any) => item.name.includes(value)))
      )
  }


}
