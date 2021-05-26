import { WebClient } from "@slack/web-api";

const token = process.env.SLACK_TOKEN;
const conversationId = process.env.SLACK_CHANNEL_ID;

const web = new WebClient(token);

async function getChannelId(channelName) {
    let channelId = "";
    for await (const page of web.paginate("conversations.list", {
        limit: 50,
    })) {
        for (const channel of page.channels) {
            if (channel.name === channelName) {
                console.log(`Found ${channelName} with slack id ${channel.id}`);
                channelId = channel.id;
                break;
            }
        }
    }
    return channelId;
}

export async function postMessage(message) {
    const result = await web.chat.postMessage({
        text: message,
        channel: conversationId,
    });
    return result;
}
