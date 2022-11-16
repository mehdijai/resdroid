#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import generate from "./commands/generate.js";
import config from "./config.js";

const version = config.cliVersion;

try {
  program
    .command("generate")
    .argument("<logo>", "logo file")
    .argument("[out]", "directory to save file in", null)
    .description("Generate Android drawable and mipmap images.")
    .action(generate);

  program.version(
    chalk.bgYellowBright.black.bold(" v" + version + " "),
    "-v, --version",
    "output the current version",
  );

  program.parse();
} catch (err) {
  console.error(chalk.bgRed.white.bold("Exception:"));
  console.error(chalk.redBright.bold(err));
}