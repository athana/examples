import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JinaService} from './jina.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('canvas1') public canvas1: ElementRef;

  ctx: CanvasRenderingContext2D | undefined;
  query = '';
  images: any[] = [];
  img1: any;

  base64abc = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"
  ];

  constructor(private searchService: JinaService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // this.ctx = this.canvas1.nativeElement.getContext('2d');
  }

  ngAfterViewInit() {
    this.ctx = this.canvas1.nativeElement.getContext('2d');
  }

  search(q = this.query) {
    this.searchService.search(q).subscribe((resp: any) => {
      console.log(resp);
      const doc = resp.data.docs[0];
      if (doc.matches.length > 0) {
        doc.matches.forEach((m: any) => {
          // const blob = new Blob([m.blob.dense.buffer], { type: `${m.mimeType}` });
          // console.log('blob', blob);

          // console.log(`m.mimeType = ${m.mimeType}`); // 'image/jpeg'
          // const blob = new Blob([m.blob.dense.buffer], { type: `${m.mimeType}` });

          // const blobUrl = URL.createObjectURL(blob);
          // this.sanitizer.bypassSecurityTrustUrl(blobUrl);
          // this.images.push(blobUrl);

          // const reader = new FileReader();
          // reader.readAsArrayBuffer(blob);
          // reader.readAsDataURL(blob);
          // reader.onloadend = () => {
          //   console.log('reader.result', reader.result);
          //   // @ts-ignore
          //   this.img1 = this.sanitizer.bypassSecurityTrustUrl(reader.result);
          // };

          // const link = URL.createObjectURL(blob);
          // this.img1 = this.sanitizer.bypassSecurityTrustUrl(link);
          // URL.revokeObjectURL(link);

          // let url = `data:${m.mimeType};base64,${m.blob.dense.buffer}`;
          // this.img1 = this.sanitizer.bypassSecurityTrustUrl(url);

          // const w = m.blob.dense.shape[0];
          // const h = m.blob.dense.shape[1];
          // this.canvas1.nativeElement.width = w;
          // this.canvas1.nativeElement.height = h;
          // const imgData = this.ctx?.createImageData(w, h);
          // if (imgData) {
          //   console.log('Yes we got imgData!');
          //   imgData.data.set([m.blob.dense.buffer]);
          //   this.ctx?.putImageData(imgData, 0, 0);
          //   // this.img1 = this.canvas1.nativeElement.toDataURL(`${m.mimeType}`);
          // }

          // const base64 = btoa(m.blob.dense.buffer);
          // console.log('base64', base64);

          // const binary = new Uint8Array(m.blob.dense.buffer);
          // const blob = new Blob([binary]);
          // console.log('blob', blob);

          // const buf = m.blob.dense.buffer;
          // const shape = m.blob.dense.shape;
          // console.log('buffer length =',buf.length, ' shape =',shape);
          // this.img1 = `data:${m.mimeType};base64,${btoa(m.blob.dense.buffer)}`;
        });

        // This sample image works!
        // this.img1 = 'data:image/jpeg;base64,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';

        const buf = doc.matches[0].blob.dense.buffer;
        const shape = doc.matches[0].blob.dense.shape;
        const mimeType = doc.matches[0].mimeType;
        console.log('buffer length =',buf.length, ' shape =',shape,' mimeType =',mimeType);
        // console.log(buf);

        // const blob = new Blob([buf], { type: `${mimeType}` });
        // const imgData = new Uint8ClampedArray(JSON.parse(buf));
        // const imgData = new Uint8Array([buf]);

        // const b64 = atob(buf);
        // console.log('b64.length',b64.length); // binary
        // console.log('b64[0] =',b64[0], 'b64[1] =',b64[1]);
        // const encoded = btoa(b64);
        // console.log('encoded.length',encoded.length); // encoded b64 string

        // const byteChar = atob(buf); // Not work, using for loop with i+=4, image is overlapped and repeated
        // const byteChar = btoa(buf); // cause offset error!!!
        const byteChar = buf; // work! but image is not clear
        console.log('byteChar.length =',byteChar.length);

        // const byteNum = new Array(byteChar.length);
        // for (let i=0; i < byteChar.length; i++) {
        //   byteNum[i] = byteChar.charCodeAt(i);
        // }

        // const byteArray = new Uint8Array(byteNum);
        // const byteArray = new Uint8ClampedArray(byteChar.length);
        // const byteArray = new Uint8Array(byteChar.length);
        const byteArray = new Uint8ClampedArray(buf.length);
        for (let i=0; i < byteChar.length; i++) {
        // for (let i=0, j=0; i < buf.length; i+=4, j+=3) { // Use this with RGBA, not work
          byteArray[i] = byteChar.charCodeAt(i); // Work
          // byteArray[i] = byteChar[i]; // Not work, mostly return zero, black img
          // const c = byteChar.charCodeAt(i);
          // byteArray[i] = c & 255; // does not seem necessary to do this
          // byteArray[i+1] = c >> 8; // This NOT Work, always return zero

          // This kinda works, but image seems to be repeated and overlapped, no color
          // byteArray[i] = byteChar.charCodeAt(j); // R
          // byteArray[i+1] = byteChar.charCodeAt(j+1); // G
          // byteArray[i+2] = byteChar.charCodeAt(j+2); // B
          // byteArray[i+3] = 255; // A 255 = no opaque
        }
        console.log('byteArray',byteArray);

        // TEST with Blob
        // const buf2: any = Array.from(buf);
        // const typedArray = new Uint8Array(buf2.length);
        // for (let i=0; i < buf2.length; i++) {
        //   typedArray[i] = buf2[i].codePointAt(0);
        // }
        // console.log('typedArray',typedArray);
        // const blob = new Blob([byteArray], {type: mimeType});
        // console.log('blob',blob);

        const h = shape[0];
        const w = shape[1];
        this.canvas1.nativeElement.width = w;
        this.canvas1.nativeElement.height = h;
        // const imgData = this.ctx?.createImageData(w, h);
        const imgData = new ImageData(byteArray, w, h);
        if (imgData) {
          console.log('Yes we got imgData!');
          // imgData.data.set(byteArray);
          // imgData.data.set(view);
          this.ctx?.putImageData(imgData, 0, 0);
          this.img1 = this.canvas1.nativeElement.toDataURL(mimeType);
          // this.img1 = this.canvas1.nativeElement.toDataURL(); // Same thing as specifying mimeType
        }

        // this.img1 = `data:${mimeType};base64,${byteChar}`;
        // this.img1 = `data:${mimeType};base64,${buf}`;
        // this.img1 = `data:${mimeType};base64,${btoa(buf)}`;
        // this.img1 = `data:${mimeType};base64,${this.bytesToBase64(buf)}`;
        // this.img1 = `data:${mimeType};base64,${this.bytesToBase64(atob(buf))}`;

        // const imgData = new DataView(byteArray.buffer);
        // console.log('imgData =',imgData);
        // const imgString = this.Uint8ToString(imgData);
        // console.log('imgString =',imgString);

        // console.log('images', this.images);
        // console.log('img1', this.img1);

      }
    });
  }

  bytesToBase64(bytes: any) {
    let result = '', i, l = bytes.length;
    for (i = 2; i < l; i += 3) {
      result += this.base64abc[bytes[i - 2] >> 2];
      result += this.base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
      result += this.base64abc[((bytes[i - 1] & 0x0F) << 2) | (bytes[i] >> 6)];
      result += this.base64abc[bytes[i] & 0x3F];
    }
    if (i === l + 1) { // 1 octet yet to write
      result += this.base64abc[bytes[i - 2] >> 2];
      result += this.base64abc[(bytes[i - 2] & 0x03) << 4];
      result += "==";
    }
    if (i === l) { // 2 octets yet to write
      result += this.base64abc[bytes[i - 2] >> 2];
      result += this.base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
      result += this.base64abc[(bytes[i - 1] & 0x0F) << 2];
      result += "=";
    }
    return result;
  }

  Uint8ToString(u8a: any) {
    const CHUNK_SZ = 0x8000;
    const c = [];
    for (let i=0; i < u8a.length; i+=CHUNK_SZ) {
      c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
    }
    return c.join("");
  };
}
