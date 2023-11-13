import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';
import { throwError, of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [ApiService],
    }).compileComponents();

    // Get the service instance injected in the TestBed
    apiService = TestBed.inject(ApiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty repositories and not loading', () => {
    expect(component.repositories).toEqual([]);
    expect(component.loading).toBe(false);
  });

  it('should handle errors when fetching repositories', () => {
    const username = 'testuser';
    const errorMessage = 'An error occurred!';

    // Use spyOn on the instance of apiService
    spyOn(apiService, 'getUserRepositories').and.returnValue(throwError(errorMessage));

    component.username = username;
    component.searchUser();


    // Add an extra tick to handle the asynchronous error
    tick();

    expect(component.loading).toBe(false);
    expect(component.repositories).toEqual([]);
  });
});
