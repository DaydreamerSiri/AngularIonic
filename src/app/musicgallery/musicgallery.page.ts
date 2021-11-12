import { Component, OnInit, ViewChild,  } from '@angular/core';
import { MusicService } from './music.service';
import { InterfaceMusic } from './music.interface';
import { PopoverController} from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-musicgallery',
  templateUrl: './musicgallery.page.html',
  styleUrls: ['./musicgallery.page.scss'],
})
export class MusicgalleryPage implements OnInit {
  @ViewChild(PopoverComponent)

  public popover = PopoverComponent;

  musiclist: InterfaceMusic[];
  songFilter: string;

  ngOnInit(){
    this.musiclist = this.music.getMusicList();
    this.music.musicinterface$.subscribe(res => this.musiclist.push(res));
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private music: MusicService, private popctrl: PopoverController) {

   }

   openMusic(myEvent, name, band, url) {
    console.log(name,band,url);
    this.popctrl.create({component:PopoverComponent,componentProps:{musicname: name, musicband: band, musicurl: url},
      showBackdrop:false}).then((popoverElement)=>{
        popoverElement.present();
      });
  }

  addMusic(myEvent){
    this.popctrl.create({component:PopoverComponent,componentProps:{addMusic:true},
      showBackdrop:false}).then((popoverElement)=>{
        popoverElement.present();
      });
    }

  insertMusic(musicinfo: InterfaceMusic[]){
    console.log(musicinfo);
    console.log('TEST123');
  }

}
