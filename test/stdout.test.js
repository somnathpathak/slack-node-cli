const { exec } = require("child_process");

describe("slack-node-cli", () => {
    describe("on success", () => {
        it("should return the version to stdout", (done) => {
            exec("node bin/slack-node-cli --version", (error, stdout, stderr) => {
                expect(stdout).toEqual("v1.0.0\n");
                done();
            });
        });
        it("should print the help message to stdout", (done) => {
            exec("node bin/slack-node-cli --help", (error, stdout, stderr) => {
                expect(stdout).toContain("slack-node-cli helps you send messages to slack channel.");
                done();
            });
        });
    });

    describe("on error", () => {
        it("should print error to stdout on invalid command", (done) => {
            exec("node bin/slack-node-cli invalidcmd", (error, stdout, stderr) => {
                expect(stderr).toContain("ERROR \"invalidcmd\" is not a valid command!");
                done();
            });
        });
        it("should print error to stdout on extra arguments", (done) => {
            exec("node bin/slack-node-cli --version --extraneous", (error, stdout, stderr) => {
                expect(stderr).toContain("ERROR Only one argument can be accepted");
                done();
            });
        });
    })
});
