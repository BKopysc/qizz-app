import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlTemplateComponent } from './xml-template.component';

describe('XmlTemplateComponent', () => {
  let component: XmlTemplateComponent;
  let fixture: ComponentFixture<XmlTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmlTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XmlTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
