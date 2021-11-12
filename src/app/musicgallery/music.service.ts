import { Injectable, OnInit, ViewChild} from '@angular/core';
import { InterfaceMusic } from './music.interface';
import { Subject } from 'rxjs';

import musicjson from '../../assets/json/music.json';

@Injectable({
  providedIn: 'root'
})
export class MusicService{

  public musiclist: { name: string; band: string; url: string; genre: string; desc: string}[] = musicjson;
  public musicinterface = new Subject<InterfaceMusic>();
  musicinterface$ = this.musicinterface.asObservable();

  constructor( ){}

  inserMusicintoJSON(musicinfo: InterfaceMusic){
    musicjson.push(musicinfo);
  }

  addNewMusic(musicinfo: InterfaceMusic){
    this.musicinterface.next(musicinfo);
    this.inserMusicintoJSON(musicinfo);
    this.refreshMusicList();
    console.log('new Music has been added');
  }

  refreshMusicList(){
    this.musiclist = musicjson;
  }

  getMusicList(){
    return [...this.musiclist];
  }

  getSongsbyBand(bandname: string){
    return this.musiclist.filter(music => music.name === bandname);
  }

}
