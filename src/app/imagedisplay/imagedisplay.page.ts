import { Component, OnInit } from '@angular/core';
import { DisplayserviceService } from './displayservice.service';
import { InterfaceImagedisplay } from './interface-imagedisplay';

@Component({
  selector: 'app-imagedisplay',
  templateUrl: './imagedisplay.page.html',
  styleUrls: ['./imagedisplay.page.scss'],
})
export class ImagedisplayPage implements OnInit {
  images: InterfaceImagedisplay[];

  constructor(private displayService: DisplayserviceService) { }

  ngOnInit() {
    this.images = this.displayService.getImages();
  }

}
