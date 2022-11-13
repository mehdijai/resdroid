import chalk from "chalk";
import { existsSync } from "fs";
import { isAbsolute, join } from "path";
import { generate_res_files } from "../src/generator.js";

function generate(logo, out) {
  const logoPath = join(process.cwd(), logo);
  let outDir = ".";
  if (out === null) {
    outDir = process.cwd();
  } else {
    if (isAbsolute(out)) {
      outDir = out;
    } else {
      outDir = join(process.cwd(), out);
    }
  }
  if (!existsSync(logoPath)) {
    throw new Error("File does not exist");
  }

  generate_res_files(logoPath, outDir).on("progress", (progress) => {
    console.clear();
    console.log(chalk.yellow.bold(Math.floor(progress * 100) + "%"));
    if (progress === 1) {
      console.clear();
      console.log(chalk.greenBright.bold("Finished"));
      console.log(chalk.yellow("Saved in: ") + chalk.yellow.bold(outDir.toUpperCase()));
    }
  });
}

export default generate;
