const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');

function isHeicFile(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    return extension === 'heic';
  }

async function asyncLoop() {
    // for (let i = 0; i < 5; i++) {
    //   await asyncFunction(i); // Wait for the asynchronous function to complete
    //   console.log(`Iteration ${i} complete`);
    // }
    const files = await fs.promises.readdir('images');

    console.log(files)
      
    for (const file of files) {
        if (isHeicFile(file)) {
        await asyncFunction(file);
        console.log(`Iteration complete: ${file}`);
        }
    }
  }

async function asyncFunction(file)  {
  const inputBuffer = await promisify(fs.readFile)('images/'+file);
  const outputBuffer = await convert({
    buffer: inputBuffer, // the HEIC file buffer
    format: 'JPEG',      // output format
    quality: 1           // the jpeg compression quality, between 0 and 1
  });

  await promisify(fs.writeFile)('converted/'+file.slice(0, -5)+'.jpg', outputBuffer);
};

asyncLoop();