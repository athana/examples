import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JinaService {
  search_url = 'http://localhost:45678/search';

  constructor(private http: HttpClient) {}

  search(query: string) {
    const data = {
      parameters: {
        top_k: 5
      },
      data: [query]
    };
    return this.http.post(this.search_url, data);
  }
}
