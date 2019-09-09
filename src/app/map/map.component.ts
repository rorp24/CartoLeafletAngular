import { Component, OnInit } from '@angular/core';
import * as L from "leaflet"

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map : L.map
  constructor() {
    
   }

  ngOnInit() {
    this.map = new L.map("map").fitWorld();
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    console.log(screen.width);
    document.getElementById('map').style.width = (screen.width - 320)+"px";
    console.log(document.getElementById('map').style.width);
  }

}
