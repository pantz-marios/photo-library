import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EventBusService, AppEvent } from '@modules/event-bus/event-bus.service';
import { FavouritesState } from '@modules/favourites/state/favourites.state';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private currentUrlSubj: BehaviorSubject<string> = new BehaviorSubject(null);
  public currentUrlObs: Observable<string> = this.currentUrlSubj.asObservable();
  
  private eventBusServiceSubscriptions: Subscription = new Subscription();



  constructor(
    private router: Router,
    private eventBusService: EventBusService,
    private favouritesState: FavouritesState
  ) {}



  public ngOnInit() {

    //  FOR DEBUGGING
    let eventSubscription = this.eventBusService.onAny().subscribe((e: AppEvent) => console.log('--------------   EventBusService.onAny()   --------------   ', e));
    this.eventBusServiceSubscriptions.add(eventSubscription);

    this.favouritesState.init();


    // observe for url changes
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => this.currentUrlSubj.next(event.urlAfterRedirects));

  }

  public ngOnDestroy() {
    this.eventBusServiceSubscriptions.unsubscribe();
    this.favouritesState.dispose();
  }

}