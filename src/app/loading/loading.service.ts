import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

@Injectable()
export class LoadingService {

   // Define um BehaviorSubject que mantém o estado do indicador de carregamento.
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Exponha o BehaviorSubject como um Observable, para que outras partes do aplicativo possam se inscrever nele.
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {
    console.log("Loading service created...")
  }

  // Este método será implementado para mostrar o loader até que um Observable seja concluído.
  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
     
    return of(null)
      .pipe(
        tap( () => this.loadingOn()),
        concatMap( () => obs$),
        finalize(() => this.loadingOff())
      );
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}