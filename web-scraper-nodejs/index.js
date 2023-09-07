import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

const folderName = 'memes';
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
  axios
    .get(url)
    .then((websiteData) => {
      const dom = new JSDOM(
        websiteData.data,
      ); /* making dom from raw website data */
      const elements =
        dom.window.document.querySelectorAll(
          'img',
        ); /* getting all img tags from dom */
      const imgElements =
        Array.from(elements); /* from img elements make an array */
      const slicedArray = imgElements.slice(
        0,
        10,
      ); /* get the first 10 elements */
      for (let i = 0; i < slicedArray.length; i++) {
        /* starting from 0 until 1 less than arrays length, iterate */
        const filename = `${(i + 1)
          .toString()
          .padStart(
            2,
            '0',
          )}.jpg`; /* in each loop add index + 1 and pad with 0 */
        const filePath = path.join(folderName, filename); /* make filepath */
        const imgFile = fs.createWriteStream(filePath); /* create file */
        https.get(slicedArray[i].src, (response) =>
          response.pipe(imgFile),
        ); /* feed downloaded img to open file*/
      }
    })
    .catch((error) => console.log(error));
} catch (err) {
  console.error(err);
}
