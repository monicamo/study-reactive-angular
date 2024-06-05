import {AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import moment from 'moment';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private coursesService: CoursesService,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    /**
     * Salva as mudanças feitas no curso e fecha o diálogo.
     *
     * Este método coleta os valores do formulário, chama o serviço de cursos para salvar as mudanças no servidor,
     * e fecha o diálogo após a operação ser concluída, passando o valor de retorno para o chamador.
     */
    save() {

      // Obtém os valores do formulário
      const changes = this.form.value;

      // Chama o serviço para salvar as mudanças no curso
      this.coursesService.saveCourse(this.course.id, changes)
        .subscribe(
          val => {
            // Se a operação for bem-sucedida, Fecha o diálogo e passa o valor de retorno
            this.dialogRef.close(val);
          },
          error => {
            console.error('Error saving course', error);
          }
        );
    }

    close() {
        this.dialogRef.close();
    }

}
