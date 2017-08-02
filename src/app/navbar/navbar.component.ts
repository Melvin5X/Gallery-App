import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { Observable } from 'rxjs/Observable'
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  title: string;

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.authService.authUser();
  }

  logOut() {
    this.authService.logout().then(resolve=> this.router.navigate['/']);
  }
}
