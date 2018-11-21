import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask, createStorageRef } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { parseHttpResponse } from 'selenium-webdriver/http';


@Component({
  selector: 'app-canvas-renderer',
  templateUrl: './canvas-renderer.component.html',
  styleUrls: ['./canvas-renderer.component.css']
})
export class CanvasRendererComponent implements OnInit {

  @ViewChild('testInput') input: ElementRef;
  @ViewChild('canvas') canvas : ElementRef;
  @ViewChild('inputFire') inputFire : ElementRef;

  public cx : CanvasRenderingContext2D;
  public lastX;
  public lastY;
  public currentX;
  public currentY;
  public drawing;
  public images;
  public imageName;
  public linkFire;
  public dummy;
  public go;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  profileUrl: Observable<string | null>;

  public shortLink = 'src/assets/';

  lien= {
    link:'https://visuels.l214.com/animaux/canards/canard-blanc-photo-de-Frank-Starmer-sur-frank.itlab.us.jpg'
  }

  constructor(private afStorage: AngularFireStorage) {
    
    //Récupère l'image depuis firebase
      const ref = this.afStorage.ref('image1.jpg');
      this.profileUrl = ref.getDownloadURL();
      
   }

  ngOnInit() {
  }
  
  //Récupère le lien de l'input
  getLink(){
    this.lien.link= this.input.nativeElement.value;
    let context : CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    let img = this.createImage(context);
  }

  //Met une image récupérée par un lien en background d'un canvas
  createImage(context : CanvasRenderingContext2D){
    let img = new Image();
    img.src = this.lien.link;
    var width = img.naturalWidth;
    var height = img.naturalHeight;
    img.onload = function(){
      context.drawImage(img, 0, 0, width, height);
    }
    this.canvas.nativeElement.width = width;
    this.canvas.nativeElement.height = height;
  }

  //Dessine sur le canvas
   draw(lX, lY, cX, cY){
    var sizeX = cX - lX;
    var sizeY = cY - lY;

    this.cx.fill();
    this.cx.rect(lX, lY, sizeX, sizeY);
    this.cx.strokeStyle = "#000";
    this.cx.stroke();
  }

  click() {
    console.log("hey");
    document.getElementById("myDropdown").classList.toggle("show");
  }

  //Méthode bindée avec l'évènement : clic sur la souris
  onClick(event){
    if(event.offsetX!==undefined){
      this.lastX = event.offsetX;
      this.lastY = event.offsetY;
    } else {
      this.lastX = event.layerX - event.currentTarget.offsetLeft;
      this.lastY = event.layerY - event.currentTarget.offsetTop;
    }
    this.cx.beginPath();
    this.drawing = true;

  }
  

  onMovement(event){ //Bindée à l'event : déplacement de la souris
    if(this.drawing){
      // Récupère la position de la souris
      if(event.offsetX!==undefined){
        this.currentX = event.offsetX;
        this.currentY = event.offsetY;
      } else {
        this.currentX = event.layerX - event.currentTarget.offsetLeft;
        this.currentY = event.layerY - event.currentTarget.offsetTop;
      }
      this.draw(this.lastX, this.lastY, this.currentX, this.currentY);

    }
  }

  letItGo(event){ //bindée à l'event : relâchement du clic
    this.drawing = false;
  }


  ngAfterViewInit(){
    

    this.cx = this.canvas.nativeElement.getContext("2d");

    this.canvas.nativeElement.addEventListener('mousedown', this.onClick.bind(this));

    this.canvas.nativeElement.addEventListener('mousemove', this.onMovement.bind(this));

    this.canvas.nativeElement.addEventListener('mouseup', this.letItGo.bind(this));

  }
}
