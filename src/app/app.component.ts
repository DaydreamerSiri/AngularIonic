import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public date: any = new Date().toISOString();

  constructor(private menuctrl: MenuController) {}

  openFirst() {
    this.menuctrl.enable(true, 'first');
    this.menuctrl.open('first');
  }

  openEnd() {
    this.menuctrl.open('end');
  }

  openCustom() {
    this.menuctrl.enable(true, 'custom');
    this.menuctrl.open('custom');
  }

  refreshDate(){
    this.date = new Date().toISOString();
  }

  ngOnInit(){
  }

}
