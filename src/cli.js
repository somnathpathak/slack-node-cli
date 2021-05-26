import arg from "arg";
import inquirer from "inquirer";
import error from "./utils/error";
import help from "./cmds/help";
import version from "./cmds/version";
import sendmessage from "./cmds/sendmessage";
import listenformentions from "./cmds/listenformentions";

function parseArgumentsIntoOptions(rawArgs) {
    // Make sure the length of the arguments is exactly three
    if (rawArgs.length > 3) {
        help();
        error("Only one argument can be accepted");
    }

    try {
        const args = arg(
            {
                // Types
                "--help": Boolean,
                "--version": Boolean,

                // Aliases
                "-h": "--help",
                "-v": "--version",
            },
            {
                argv: rawArgs.slice(2),
            }
        );
        return {
            help: args["--help"] || false,
            version: args["--version"] || false,
            cmd: args._[0] || "",
        };
    } catch (err) {
        error(err.message);
    }
}

async function promptForMissingOptions(options) {
    const defaultCmd = "sendmessage";

    if (options.help || options.version) {
        return {
            ...options,
        };
    }

    const questions = [];
    if (!options.cmd) {
        questions.push({
            type: "list",
            name: "cmd",
            message: "What do you want to do?",
            choices: [
                {
                    name: "Post a message to slack",
                    value: "sendmessage",
                },
                {
                    name: "Listen for Slack Mentions",
                    value: "listenformentions",
                },
            ],
            default: defaultCmd,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        cmd: options.cmd || answers.cmd,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);

    // console.log(options);
    if (options.version) {
        options.cmd = "version";
    }

    if (options.help) {
        options.cmd = "help";
    }

    switch (options.cmd) {
        case "help":
            help();
            break;
        case "version":
            version();
            break;
        case "sendmessage":
            await sendmessage();
            break;
        case "listenformentions":
            listenformentions();
            break;
        default:
            help();
            error(`"${options.cmd}" is not a valid command!`);
            break;
    }
};
