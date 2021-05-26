import chalk from "chalk"
import { version } from "../../package.json";

export default function () {
  console.log(`${chalk.bgCyan(`v${version}`)}`);
}