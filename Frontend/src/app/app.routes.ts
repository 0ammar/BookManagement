import { Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { BookListComponent } from './book/book-list/book-list.component';


export const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent
  },
  {
    path: 'books/:categoryId/:categoryName',
    component: BookListComponent
  }
];
