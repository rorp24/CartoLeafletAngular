import { Component, OnInit } from '@angular/core';
import * as L from "leaflet"
import { ActivatedRoute  } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map : L.map
  dataObject

  constructor(
    private route :ActivatedRoute,
    private firebase:FirebaseService
  ) {
    //setup de comment les marqueurs seront gérés
    const iconRetinaUrl = 'assets/Leaflet/marker-icon-2x.png';
		const iconUrl = 'assets/Leaflet/marker-icon.png';
		const shadowUrl = 'assets/Leaflet/marker-shadow.png';
		const iconDefault = L.icon({
		iconRetinaUrl,
		iconUrl,
		shadowUrl,
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize: [41, 41]
		});
		L.Marker.prototype.options.icon = iconDefault;
    
    //récup paramettres
    this.route.params.subscribe(params =>{
      console.log(params);
      this.firebase.getData(params.map).then(data=>{
        console.log(data.val())
        this.dataObject = data.val()
        //HUDRight
        document.getElementById("description").innerHTML = this.dataObject.description;
        document.getElementById("legend").innerHTML = this.dataObject.legend;
        //map
        this.map.setView(this.dataObject.center, this.dataObject.zoom)
        this.dataObject.locations.forEach(element => {
          var marker = L.marker(element.center, )
          var popup = L.popup().setContent("<h3>" + element.name + "</h3><p>" + element.description + "</p>");
          marker.bindPopup(popup)
          marker.addTo(this.map)

          });
          L.geoJSON(this.dataObject.features, {
            onEachFeature: (feature, layer) => {
                if (feature.properties.color) {
                    layer.setStyle({ color: feature.properties.color })
                } else {
                    layer.setStyle({ color: "#000000" })
                }
    
                var popup = L.popup().setContent("<h3>" + feature.properties.name + "</h3><p>" + feature.properties.description + "</p>");
                layer.bindPopup(popup)
            }
        }).addTo(this.map)
      })
    })
   }

  ngOnInit() {
    
    //map gestion
    this.map = new L.map("map");
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.control.scale().addTo(this.map)
  }

}
