import {Component, Inject, OnInit, OnDestroy} from '@angular/core';

import {FormControl} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string = 'COJ';
  profile: any;
  searchBox: FormControl = new FormControl();
  subscription: Subscription;

  constructor(private auth: AuthService,
              @Inject('input') private input,
              private router: Router) {
    this.auth.userProfile.subscribe(
      profile => this.profile = profile
    );
   }

  ngOnInit() {
    this.subscription = this.searchBox
      .valueChanges
      .debounceTime(200)
      .subscribe(
        term => {
          this.input.changeInput(term);
        }
      )
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProblem(): void {
    this.router.navigate(['/problems']);
  }
  
  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
