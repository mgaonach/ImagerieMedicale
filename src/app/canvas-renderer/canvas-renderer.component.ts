import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Analyzer } from '../analyzer/analyzer';


@Component({
  selector: 'app-canvas-renderer',
  templateUrl: './canvas-renderer.component.html',
  styleUrls: ['./canvas-renderer.component.css']
})
export class CanvasRendererComponent implements OnInit {

  @ViewChild('canvas') canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;
  @ViewChild('inputFire') inputFire: ElementRef;

  private drawContext: CanvasRenderingContext2D;
  private lastX: number;
  private lastY: number;
  private currentX: number;
  private currentY: number;
  private drawing: boolean;
  private link: string;

  analyser: Analyzer = new Analyzer();
  imageName: string = '';
  imageLoaded:boolean = false;

  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>this.canvasRef.nativeElement;
    this.drawContext = this.canvas.getContext("2d");

    this.canvas.addEventListener('mousedown', this.onClick.bind(this));
    this.canvas.addEventListener('mousemove', this.onMovement.bind(this));
    this.canvas.addEventListener('mouseup', this.letItGo.bind(this));

  }

  initNewImage() {
    //Récupère l'image depuis firebase
    let ref = this.afStorage.ref(this.imageName);
    let profileUrl = ref.getDownloadURL();
    profileUrl.subscribe((value) => {
      console.log(value);
      this.link = value;
      this.createImage();
    });
  }

  //Met une image récupérée par un lien en background d'un canvas
  private createImage() {
    let img = new Image();
    img.src = this.link;
    img.onload = function () {
      this.canvasRef.width = img.width;
      this.canvasRef.height = img.height;
      this.canvas.width = img.width;
      this.canvas.height = img.height;
      this.drawContext.drawImage(img, 0, 0);
      this.imageLoaded = true;
    }.bind(this);
  }

  public analize() {
    this.analyser.startAnalisis(this.link, result => {
      result.forEach(element => {
        this.draw(element.x0, element.y0, element.x1, element.y1);
      });
    })
  }

  //Dessine sur le canvas
  draw(lX, lY, cX, cY) {
    this.drawContext.beginPath();
    var sizeX = cX - lX;
    var sizeY = cY - lY;
    this.drawContext.rect(lX, lY, sizeX, sizeY);
    this.drawContext.fillStyle = "red";
    this.drawContext.fill();
    this.drawContext.stroke();
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

  letItGo() { //bindée à l'event : relâchement du clic
    this.drawing = false;
  }

}
