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

Find stats about how many users will be affected:
```
npm run stats
```

Send message to users without profile descriptions
```
npm run remind
```

# Env variables

You must have a bot token environment variable to run this app.

Get a token from your organisation's slack settings.
