import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-canvas-renderer',
  templateUrl: './canvas-renderer.component.html',
  styleUrls: ['./canvas-renderer.component.css']
})
export class CanvasRendererComponent implements OnInit {

  @ViewChild('testInput') input: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('inputFire') inputFire: ElementRef;

  private cx: CanvasRenderingContext2D;
  private lastX: number;
  private lastY: number;
  private currentX: number;
  private currentY: number;
  private drawing: boolean;
  profileUrl: Observable<string | null>;

  public shortLink = 'src/assets/';

  private link:string;

  constructor(private afStorage: AngularFireStorage) {
    //Récupère l'image depuis firebase
    let ref = this.afStorage.ref('image1.jpg');
    this.profileUrl = ref.getDownloadURL();
  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.cx = this.canvas.nativeElement.getContext("2d");
    this.canvas.nativeElement.addEventListener('mousedown', this.onClick.bind(this));
    this.canvas.nativeElement.addEventListener('mousemove', this.onMovement.bind(this));
    this.canvas.nativeElement.addEventListener('mouseup', this.letItGo.bind(this));
  }

  //Récupère le lien de l'input
  getLink() {
    this.link = this.input.nativeElement.value;
    let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    this.createImage();
  }

  //Met une image récupérée par un lien en background d'un canvas
  createImage() {
    let img = new Image();
    img.src = this.link;
    var width = img.naturalWidth;
    var height = img.naturalHeight;
    img.onload = function () {
      this.cx.drawImage(img, 0, 0, width, height);
    }.bind(this)
    this.canvas.nativeElement.width = width;
    this.canvas.nativeElement.height = height;
  }

  //Dessine sur le canvas
  draw(lX, lY, cX, cY) {
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
  onClick(event) {
    if (event.offsetX !== undefined) {
      this.lastX = event.offsetX;
      this.lastY = event.offsetY;
    } else {
      this.lastX = event.layerX - event.currentTarget.offsetLeft;
      this.lastY = event.layerY - event.currentTarget.offsetTop;
    }
    this.cx.beginPath();
    this.drawing = true;

  }


  onMovement(event) { //Bindée à l'event : déplacement de la souris
    if (this.drawing) {
      // Récupère la position de la souris
      if (event.offsetX !== undefined) {
        this.currentX = event.offsetX;
        this.currentY = event.offsetY;
      } else {
        this.currentX = event.layerX - event.currentTarget.offsetLeft;
        this.currentY = event.layerY - event.currentTarget.offsetTop;
      }
      this.draw(this.lastX, this.lastY, this.currentX, this.currentY);

    }
  }

  letItGo(event) { //bindée à l'event : relâchement du clic
    this.drawing = false;
  }

}
