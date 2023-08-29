import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin, IUpdate } from '../../interfaces/auth/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isUserLogin$ = new Subject<boolean>();
  private url = environment.BACKEND_URL;
  private api = {
    auth: `${this.url}/auth`,
  }
  constructor(
    private http: HttpClient
  ) { }


  change(data:IUpdate, id: number){
    console.log(data)
    return this.http.patch<IUpdate>(`${this.api.auth}/${id}`,data)
  }
}
