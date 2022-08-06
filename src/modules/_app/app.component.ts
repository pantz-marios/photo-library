import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private currentUrlSubj: BehaviorSubject<string> = new BehaviorSubject(null);
  public currentUrlObs: Observable<string> = this.currentUrlSubj.asObservable();



  constructor(
    private router: Router
  ) {}



  public ngOnInit() {

    // observe for url changes
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => this.currentUrlSubj.next(event.urlAfterRedirects));

  }

  public ngOnDestroy() {

  }

}