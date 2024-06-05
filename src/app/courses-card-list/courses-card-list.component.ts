import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Course } from './../model/course';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {

  @Input()
  courses: Course[] = [];

  @Output()
  private coursesChanged = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    
    // Reage ao fechamento do diálogo
    dialogRef.afterClosed()
    .pipe(
      filter(val => !!val), // Filtra valores nulos ou indefinidos
      tap(() => this.coursesChanged.emit()) // Emite um evento indicando que os cursos foram alterados
    )
    .subscribe();
  }

}
