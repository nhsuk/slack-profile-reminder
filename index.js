const BOT_TOKEN = process.env.BOT_TOKEN;
const slack = require('slack')

const bot = slack({token: BOT_TOKEN})

const getUsers = function() {
  return bot.users.list().then(function(response) {
    var users = response.members.filter(function(user) {
      // filter out bots
      return !user.is_bot;
    }).filter(function(user) {
      // filter out deleted users
      return user.deleted === false
    })
    return users
  })
}

const filterBadProfiles = function(user) {
  return user.profile.title === ''
}

const filterBadImages = function(user) {
  return user.profile.image_72.search("d=https%3A%2F%2Fa.slack-edge.com%2F") > 0
}

const getRealName = function(user) {
  return user.profile.real_name
}

const notifyUser = function(user) {

  return bot.chat.postMessage({
    channel: user.id,
    user: user.id,
    text: `I have detected that you have no slack profile description.
Please update your profile so that people know who you are.

A good example:
> Project Manager, based in Leeds. Working on the Slack Profile Reminder project.

How to update your slack profile: https://get.slack.help/hc/en-us/articles/204092246-Edit-your-profile
    `
  }).then(function(response) {
    if(response.ok) {
      console.log(`Message sent to user ${user.id}`)
    } else {
      console.warn(`Message sending to user ${user.id} failed`)
      console.warn(response)
    }
  })
}

module.exports = {
  getUsers,
  getRealName,
  filterBadProfiles,
  filterBadImages,
  notifyUser,
}
