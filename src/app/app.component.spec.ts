import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent, APP_NAME } from './app.component';
import { CustomMaterialModule } from './custom-material.module';

import { Logger } from './_helpers/logging';

import { RouterOutletStubComponent } from './_mocks/routing.mock';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutletStubComponent
      ],
      imports: [
        BrowserModule,
        CustomMaterialModule
      ],
      providers: [
        Logger
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
  });

  it('should create the app', async(() => {
    expect(appComponent).toBeTruthy();
  }));

  it(`should have as title '${APP_NAME}'`, async(() => {
    expect(appComponent.title).toEqual(APP_NAME);
  }));

  it('should render title in the h1 tag with class app-title', async(() => {
    fixture.detectChanges();
    expect(debugElement.query(By.css('.app-title')).nativeElement.textContent).toContain(APP_NAME);
  }));

  it('should contain <router-outlet/> in content div', async(() => {
    expect(debugElement.query(By.css('.content')).children).toBeDefined('<router-outlet></router-outlet>');
  }));
});
