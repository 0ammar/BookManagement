import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-dialog',
  standalone: true,
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DatePipe
  ]
})
export class BookDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
