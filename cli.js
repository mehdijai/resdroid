#!/usr/bin/env node

import { program } from "commander";
import generate from "./commands/generate.js";

program
  .command("generate")
  .argument("<logo>", "logo file")
  .argument("[out]", "directory to save file in", null)
  .description("Generate Android drawable and mipmap images.")
  .action(generate);

program.version("v0.0.1", "-v, --version", "output the current version");

program.parse();
