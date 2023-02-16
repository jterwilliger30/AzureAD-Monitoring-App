import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawdataComponent } from './rawdata.component';

describe('RawdataComponent', () => {
  let component: RawdataComponent;
  let fixture: ComponentFixture<RawdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
