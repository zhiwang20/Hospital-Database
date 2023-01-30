import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {

  baseURL = environment.baseURL + '/api/v1';

  constructor(private http: HttpClient) { }

  list(type: string) {
    return this.http.get(`${this.baseURL}/${type}`);
  }

  create(type: string, payload) {
    return this.http.post(`${this.baseURL}/${type}`, payload);
  }

  update(type: string, id: string, payload) {
    return this.http.put(`${this.baseURL}/${type}/${id}`, payload);
  }

}
