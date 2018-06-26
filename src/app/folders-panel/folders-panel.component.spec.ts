import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersPanelComponent } from './folders-panel.component';

describe('FoldersPanelComponent', () => {
  let component: FoldersPanelComponent;
  let fixture: ComponentFixture<FoldersPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoldersPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
