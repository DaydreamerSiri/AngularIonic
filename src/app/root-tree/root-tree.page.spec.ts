import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RootTreePage } from './root-tree.page';

describe('RootTreePage', () => {
  let component: RootTreePage;
  let fixture: ComponentFixture<RootTreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootTreePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RootTreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
