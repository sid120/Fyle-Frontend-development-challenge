// app.component.ts

import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username: string = '';
  user: any;
  location: any;
  repositories: any[] = [];
  loading: boolean = false;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 6; // You can adjust this value based on your preference
  totalItems: number = 0;
  Math: any;

  constructor(private apiService: ApiService) {}

  searchUser(): void {
    this.loading = true;

    // Fetch user details first
    this.apiService.getRepoDetails(this.username, this.username).subscribe(
      (user: any) => {
        this.user = user;
        console.log('User Object:', this.user);

        // Now, fetch all repositories with pagination
        this.apiService.getUserRepositories(this.username, this.currentPage, this.itemsPerPage).subscribe(
          (repos) => {
            this.repositories = repos;
            this.loading = false;
          },
          (error) => {
            console.error(error);
            this.loading = false;
          }
        );
      },
      (error: any) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  // Function to handle page change
  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.searchUser();
  }
}
