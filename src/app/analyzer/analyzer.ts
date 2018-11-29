import * as Tesseract from 'tesseract.js';
import { TESSERACT_PARAMETERS } from './tesseract.config';

export class Analyzer {

  tesseract: Tesseract.TesseractStatic = Tesseract.create(TESSERACT_PARAMETERS);

  private _progress: number = 0;
  private _confidence: number = 60;
  private _status: string = "idle";
  private _computing: boolean = false;

  private readonly minSize: number = 5;

  constructor() { }

  public get progress(): number {
    return this._progress;
  }

  public get confidence(): number {
    return this._confidence;
  }

  public set confidence(value: number) {
    this._confidence = value;
  }

  public get status(): string {
    return this._status;
  }

  public get computing(): boolean {
    return this._computing;
  }

  public startAnalisis(url: string, resultAction: (results: { x0: number, y0: number, x1: number, y1: number }[]) => void) {
    this._computing = true;
    this._status = "loading";
    this.tesseract.recognize(url)
      .progress(message => {
        console.log(message);
        if (message.hasOwnProperty("status")) {
          this._status = message.status;
        }
        if (message.hasOwnProperty("progress")) {
          this._progress = message.progress;
        }
      })
      //.catch(err => console.error(err))
      .then((result) => {
        let res: { x0: number, y0: number, x1: number, y1: number }[] = new Array();
        result.words.forEach(element => {
          if (element.confidence >= this._confidence && element.bbox.x1 - element.bbox.x0 > this.minSize && element.bbox.y1 - element.bbox.y0 > this.minSize) {
            res.push({ x0: element.bbox.x0, y0: element.bbox.y0, x1: element.bbox.x1, y1: element.bbox.y1 });
          }
        });
        resultAction(res);
      }).finally(resultOrError => {
        this._computing = false;
      });
  }
}
