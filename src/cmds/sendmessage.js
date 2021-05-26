import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { postMessage } from "../lib/slack";
import error from "../utils/error";

async function promptForMessageInput() {
    const defaultMessage = "Hello! World.";

    const answer = await inquirer.prompt([{
        type: "input",
        name: "message",
        message:
            "Please specify the message text?",
        default: defaultMessage
    }]);
    return answer;
}

export default async function () {
    const { message } = await promptForMessageInput();

    const spinner = ora({
        spinner: "dots",
        text: chalk.yellowBright('Sending message')
    }).start();
    try {
        const result = await postMessage(message);
        spinner.succeed(`${chalk.bgGreen("DONE")} Successfully sent message ${result.ts}`);
    } catch (err) {
        spinner.stop();
        console.error(err);
        error("Error sending messsage");
    }
}