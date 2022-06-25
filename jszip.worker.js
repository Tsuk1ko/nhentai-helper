importScripts(
  'https://fastly.jsdelivr.net/npm/comlink@4.3.1/dist/umd/comlink.min.js',
  'https://fastly.jsdelivr.net/npm/jszip@3.10.0/dist/jszip.min.js'
);

class JSZipWorker {
  constructor() {
    this.zip = new JSZip();
  }
  file(name, { data }) {
    this.zip.file(name, data);
  }
  generateAsync(options, onUpdate) {
    return this.zip.generateAsync(options, onUpdate).then(data => Comlink.transfer({ data }, [data]));
  }
}

Comlink.expose(JSZipWorker);
