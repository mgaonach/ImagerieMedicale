export const TESSERACT_PARAMETERS = {
    workerPath: 'https://cdn.jsdelivr.net/gh/naptha/tesseract.js@' + require('../../../node_modules/tesseract.js/package.json').version + '/dist/worker.min.js',
    langPath: 'https://tessdata.projectnaptha.com/3.02/',
    corePath: 'https://cdn.jsdelivr.net/gh/naptha/tesseract.js-core@0.1.0/index.js',
}