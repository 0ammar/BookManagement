import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../category.service';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { Category } from '../../models/category.model';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog.component';
import { MatCardContent, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatToolbar } from "@angular/material/toolbar";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  imports: [CommonModule, MatCardContent, MatCardModule, MatIconModule, MatProgressBar, MatToolbar, RouterLink ]
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  loading = true;

  constructor(private service: CategoryService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void { this.loadCategories(); }

  loadCategories(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: data => { this.categories = data; this.loading = false; },
      error: () => { this.loading = false; this.snackBar.open('Failed to load categories.', 'Close', { duration: 2000 }); }
    });
  }

  openForm(category?: Category): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, { data: { category }, width: '400px' });
    dialogRef.afterClosed().subscribe(result => { if (result) this.loadCategories(); });
  }

  deleteCategory(category: Category): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirm Delete', message: `Are you sure you want to delete "${category.name}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(category.id).subscribe({
          next: () => { this.snackBar.open('Category deleted successfully!', 'Close', { duration: 2000 }); this.loadCategories(); },
          error: () => this.snackBar.open('Error deleting category.', 'Close', { duration: 2000 })
        });
      }
    });
  }
}
