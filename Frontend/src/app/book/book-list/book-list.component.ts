import { BookFormComponent } from '../book-form/book-form.component';
import { BookService } from '../book.service';
import { Book } from '../../models/book.model';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog.component';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayoutModule, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    LayoutModule,
  ],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = true;
  categoryName: string = '';
  categoryId: number = 0;

  gridCols = 4;

  constructor(
    private service: BookService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const categoryIdParam = params.get('categoryId');
      this.categoryId = categoryIdParam ? +categoryIdParam : 0;
      this.categoryName = params.get('categoryName') || 'Books';
      if (this.categoryId) {
        this.loadBooks();
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web,
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.Handset]) {
        this.gridCols = 2;
      } else if (result.breakpoints[Breakpoints.Tablet]) {
        this.gridCols = 3;
      } else if (result.breakpoints[Breakpoints.Web]) {
        this.gridCols = 4;
      }
    });
  }

  loadBooks(): void {
    this.loading = true;
    this.service.getBooksByCategoryId(this.categoryId).subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load books.', 'Close', { duration: 2000 });
      },
    });
  }

  openBookForm(book?: Book): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      data: { book, categoryId: this.categoryId },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadBooks();
      }
    });
  }

  deleteBook(book: Book): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete the book "${book.title}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.delete(book.id!).subscribe({
          next: () => {
            this.snackBar.open('Book deleted successfully!', 'Close', { duration: 2000 });
            this.loadBooks();
          },
          error: () => {
            this.snackBar.open('Error deleting book.', 'Close', { duration: 2000 });
          },
        });
      }
    });
  }
}
