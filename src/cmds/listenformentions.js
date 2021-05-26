import express from "express";
import { createEventAdapter } from "@slack/events-api";
import respondToMention from "../cmds/sendmessage";

const port = process.env.PORT || 3000;
const app = express();
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

app.use('/slack/events', slackEvents.expressMiddleware());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

slackEvents.on('app_mention', async (event) => {
    try {
        console.log("I got a mention in this channel", event.channel);
        console.log("Received message: ", event.text);
        await respondToMention();
    } catch (e) {
        console.log(e);
    }
});

// Starts server
export default function () {
    app.listen(port, function (err) {
        if (err) console.log(err);
        console.log('Slack events listener server is listening on port ' + port)
    });
}


