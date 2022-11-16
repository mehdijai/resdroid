import { execSync } from "child_process";
import config from "./config.js";

const version = config.cliVersion;

const stdout = execSync("resdroid-cli -v");

// Test Command Version
console.log(stdout.toString().trim() == version);
