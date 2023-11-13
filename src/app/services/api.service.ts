import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static getUserRepositories(getUserRepositories: any) {
    throw new Error('Method not implemented.');
  }
  getUserDetails(username: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUserRepositories(username: string, page: number, perPage: number): Observable<any[]> {
    const url = `${this.apiUrl}/users/${username}/repos`;
    const params = {
      page: page.toString(),
      per_page: perPage.toString()
    };
    return this.http.get<any[]>(url, { params });
  }

  getRepoDetails(username: string, repoName: string): Observable<any> {
    const url = `${this.apiUrl}/repos/${username}/${repoName}`;
    return this.http.get<any>(url);
  }

  // getUserProfile(username: string): Observable<any> {
  //   const url = `${this.apiUrl}/users/${username}`;

  //   return this.http.get<any>(url).pipe(
  //     switchMap((user) => {
  //       // Use forkJoin to make parallel requests for followers, following, and repos
  //       return forkJoin([
  //         this.http.get<any>(user.followers_url),
  //         this.http.get<any>(user.following_url),
  //         this.http.get<any>(user.repos_url + '?per_page=100') // You might need to adjust the per_page parameter
  //       ]).pipe(
  //         map(([followers, following, repos]) => ({
  //           ...user,
  //           followers: followers.length, // Assuming the API returns an array
  //           following: following.length, // Assuming the API returns an array
  //           public_repos: repos.length // Assuming the API returns an array
  //         }))
  //       );
  //     })
  //   );
  // }

  getUserProfile(username: string): Observable<any> {
    const url = `${this.apiUrl}/users/${"username"}`;
    return this.http.get<any>(url);
  }
  
}
