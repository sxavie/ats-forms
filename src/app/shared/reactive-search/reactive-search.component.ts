import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs';
import { UsersTableComponent } from './users-table/users-table.component';
import { AsyncPipe } from '@angular/common';
import { IUser } from './user-data.interface';

@Component({
  selector: 'app-reactive-search',
  standalone: true,
  imports: [UsersTableComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './reactive-search.component.html',
  styleUrl: './reactive-search.component.css'
})
export class ReactiveSearchComponent implements OnInit {

  private http: HttpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  placeholderApi = 'https://jsonplaceholder.typicode.com/users';
  searchControl = new FormControl('')
  searchData$: Observable<IUser[]> = new Observable();

  ngOnInit(): void {
    this.subscribeToSeachValueChange();
  }

  subscribeToSeachValueChange() {
    this.searchData$ = this.searchControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(value => this.getUsersData(value || ''))
    )
  }

  getUsersData(value: string) {
    return this.http.get<IUser[]>(this.placeholderApi)
      .pipe(
        map((data: IUser[]) => data.filter((item: IUser) => item.name.includes(value)))
      )
  }


}
