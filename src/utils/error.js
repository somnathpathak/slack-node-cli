import chalk from "chalk";

export default function (message, exit = true) {
    console.error(`${chalk.red.bold("ERROR")} ${message}`);
    exit && process.exit(1);
}