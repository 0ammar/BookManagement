import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { Category } from '../../models/category.model';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatDialogContent, MatInputModule, MatDialogModule],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category?: Category }
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({ name: ['', Validators.required] });
    if (this.data?.category) {
      this.isEdit = true;
      this.categoryForm.patchValue({ name: this.data.category.name });
    }
  }

  submit(): void {
    if (this.categoryForm.invalid) return;
    const categoryData: Partial<Category> = { name: this.categoryForm.value.name };

    if (this.isEdit && this.data.category) {
      this.service.update(this.data.category.id, categoryData).subscribe({
        next: () => this.onSuccess('Category updated successfully!'),
        error: () => this.onError('Error updating category.'),
      });
    } else {
      this.service.create(categoryData).subscribe({
        next: () => this.onSuccess('Category created successfully!'),
        error: () => this.onError('Error creating category.'),
      });
    }
  }

  private onSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 2000 });
    this.dialogRef.close(true);
  }

  private onError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 2000 });
  }

  close(): void {
    this.dialogRef.close();
  }
}
