const reminder = require('./index.js')

reminder.getUsers().then(function(users) {
  const noTitleUsers = users.filter(reminder.filterBadProfiles)
  const noImageUsers = users.filter(reminder.filterBadImages)
  const both = users.filter(reminder.filterBadProfiles).filter(reminder.filterBadImages)

  const names = noTitleUsers.map(reminder.getRealName)

  console.log("Total active users:", users.length)
  console.log("Users without profile descriptions:", noTitleUsers.length)
  console.log("Users without profile images:", noImageUsers.length)
  console.log("Users without either:", both.length)
}).catch(console.warn)
