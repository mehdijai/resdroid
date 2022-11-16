const child_process = require("child_process");
const { default: config } = require("../config.js");

test("Running CLI without command", () => {
  const stdout = child_process.execSync("resdroid-cli -v");
  expect(stdout.toString().trim()).toBe(config.cliVersion);
});
