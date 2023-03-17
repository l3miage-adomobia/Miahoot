import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { EMPTY, Observable,BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Miahoot';

  public readonly user: Observable<User | null>;
  public bsIsAuthentified = new BehaviorSubject<boolean>(false);
  showLoginButton = false;
  showLogoutButton = false;

  constructor(private auth: Auth, private ds: DataService){
    this.user = authState(this.auth);
  }

  async login() {
    this.bsIsAuthentified.next(true);
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
    } catch (err) { 
      console.error("We killed the popup login")
    }
    this.bsIsAuthentified.next(false);
  }

  async logout() {
    return await signOut(this.auth);
  }
  
}
