import chalk from "chalk";
import { existsSync } from "fs";
import { isAbsolute, join } from "path";
import { generate_res_files } from "../src/generator.js";

function generate(logo, out) {
  try {
    const cwd = process.cwd();

    const logoPath = join(cwd, logo);
    let outDir = ".";
    if (out === null) {
      outDir = cwd;
    } else {
      if (isAbsolute(out)) {
        outDir = out;
      } else {
        outDir = join(cwd, out);
      }
    }
    if (!existsSync(logoPath)) {
      throw new Error("File does not exist");
    }

    generate_res_files(logoPath, outDir)
    .on("progress", (progress) => {
      console.clear();
      console.log(chalk.yellow.bold("Processed " + Math.floor(progress * 100) + "%"));
      if (progress === 1) {
        console.clear();
        console.log(chalk.greenBright.bold("Finished"));
        console.log(chalk.yellow("Saved in: ") + chalk.yellow.bold(outDir.toUpperCase()));
      }
    });
  } catch (err) {
    console.error(chalk.bgRed.white.bold("Exception:"));
    console.error(chalk.redBright.bold(err));
  }
}

export default generate;
