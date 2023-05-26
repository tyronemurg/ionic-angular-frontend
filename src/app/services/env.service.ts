import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = 'http://127.0.0.1:8000/api/';

  constructor() { }
}
