import { Injectable } from '@angular/core';
import { InterfaceImagedisplay } from './interface-imagedisplay';


@Injectable({
  providedIn: 'root'
})

export class DisplayserviceService {
  images: InterfaceImagedisplay[] = [{
    id: 1,
    title: 'Emoji',
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
    type: 'png',
  }];




  constructor() { }

  getImages(){
    return [...this.images];
  };

}
