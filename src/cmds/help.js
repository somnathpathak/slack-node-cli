import chalk from "chalk";

export default function () {
    const usageText = `
    ${chalk.inverse("slack-node-cli helps you send messages to slack channel.")}
  
    usage:
      ${chalk.greenBright("slack-node-cli <command>")}
  
      commands can be:
        ${chalk.blueBright("sendmessage")}:       send message to slack channel
        ${chalk.blueBright("version")}:           show package version
        ${chalk.blueBright("help")}:              show the usage guide
    `;
    console.log(usageText);
}
