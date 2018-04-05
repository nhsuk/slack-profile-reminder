# Slack Profile Reminder

Sends a helpful reminder to slack users who don't have a profile description.

Message:
```
I have detected that you have no slack profile description.
Please update your profile so that people know who you are.

A good example:
> Project Manager, based in Leeds. Working on the Slack Profile Reminder project.

How to update your slack profile: https://get.slack.help/hc/en-us/articles/204092246-Edit-your-profile
```

# Usage

### Stats

Find stats about how many users will be affected:
```
npm run stats
```

### Send reminders

Send message to users without profile descriptions
```
npm run remind
```

This command will warn how many messages you are about to send, and ask to continue.

Messages will be sent at a 1 second interval in accordance with slack's API usage limits

# Env variables

You must have a `BOT_TOKEN` environment variable to run this app.

Get a token from your organisation's slack settings.
