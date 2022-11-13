import Jimp from "jimp";
import resSizes from "./android_res.js";
import { join } from "path";
import { EventEmitter } from "events";

const emitter = new EventEmitter();

let steps = 0;

Object.values(resSizes).flatMap((item) => {
  if (item.length > 1) {
    steps += item.length;
  } else {
    steps++;
  }
});

let currentStep = 0;
function generate_res_files(logo, outDir) {
  new Promise((_, reject) => {
    for (const key in resSizes) {
      if (Object.hasOwnProperty.call(resSizes, key)) {
        const folder = resSizes[key];

        for (let index = 0; index < folder.length; index++) {
          const file = folder[index];

          const OutFile = join(
            outDir,
            `./${outDir == process.cwd() ? "assets/" : ""}${key}/${file.name}`,
          );

          new Jimp(file.width, file.height, "FFFFFF", (err, image) => {
            if (err) {
              reject(err);
            } else {
              Jimp.read(logo, (err, src) => {
                if (err) {
                  reject(err);
                } else {
                  if (key.includes("mipmap")) {
                    image.opacity(0);
                    src.resize(file.width, file.width);
                  } else {
                    if (file.width > file.height) {
                      src.resize(file.height * 0.6, file.height * 0.6);
                    } else {
                      src.resize(file.width * 0.6, file.width * 0.6);
                    }
                  }
                  const xCenter = file.width / 2 - src.bitmap.width / 2;
                  const yCenter = file.height / 2 - src.bitmap.height / 2;
                  image.composite(src, xCenter, yCenter).write(OutFile);
                  currentStep++;
                  emitter.emit("progress", currentStep / steps);
                }
              });
            }
          });
        }
      }
    }
  });

  return emitter;
}

export { generate_res_files };
