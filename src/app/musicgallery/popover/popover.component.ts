import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { InterfaceMusic } from '../music.interface';
import { MusicService } from '../music.service';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit{

  @Input() musicname: string; @Input() musicband: string; @Input() musicurl: string; @Input() addMusic: boolean;

  musicgenre: string;

  constructor(private popover: PopoverController, private music: MusicService) {
  }

  closePop() {
    this.popover.dismiss();
  }

  ngOnInit(){
    this.musicurl = this.scrapURLtoID(this.musicurl);
    console.log(this.musicurl);
  }

  scrapURLtoID(url: string){
    const musicid = url.slice(url.indexOf('=')+1, url.length);
    return musicid;
  }

  insertMusic(mname: string,mband: string,murl: string,mgenre: string){
    console.log('music insert queued', mname, mband, murl, mgenre);
    if (!mname || !mband || !murl) {
      alert('Fill in the Form please!');
      return;
    }
    const musiclist: InterfaceMusic = {name:mname , band:mband, url:murl, genre:mgenre, desc:''};
    console.log(musiclist);
    this.music.addNewMusic(musiclist);
    this.popover.dismiss();
  }

}
