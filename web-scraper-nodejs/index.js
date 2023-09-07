import fs from 'node:fs';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const url = 'https://memegen-link-examples-upleveled.netlify.app/';

const options = { hostname: 'memegen-link-examples-upleveled.netlify.app' };

const folderName = 'memes';
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
  axios
    .get(url)
    .then((kiscica) => {
      const dom = new JSDOM(kiscica.data);
      const elements = dom.window.document.querySelectorAll('img');
      const imgElements = Array.from(elements);
      const slicedArray = imgElements.slice(0, 10);

      console.log(slicedArray);
    })
    .catch((error) => console.log(error));
} catch (err) {
  console.error(err);
}
