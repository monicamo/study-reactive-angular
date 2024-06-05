import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) {

  }

  /**
   * Carrega todos os cursos do servidor.
   *
   * @returns Um Observable que emite uma lista de cursos.
   */
  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses")
    .pipe(
      map(res => res["payload"]),
      shareReplay()
    );
  }

  /**
 * Atualiza um curso específico no servidor.
 * shareReplay() é um operador do RxJS que compartilha a última emissão 
 * de múltiplos observadores. Isso pode ser útil para evitar múltiplas 
 * requisições HTTP se vários observadores estiverem assinando o mesmo 
 * Observable.
 * 
 * @param courseId - O identificador único do curso a ser atualizado.
 * @param changes - Um objeto contendo as mudanças a serem aplicadas ao curso. Pode conter uma ou mais propriedades parciais do curso.
 * @returns Um Observable que emite a resposta da solicitação HTTP PUT.
 */
  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseId}`, changes)
      .pipe(
        shareReplay()
      );
  }

}
