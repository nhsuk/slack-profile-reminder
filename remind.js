const reminder = require('./index.js')
const prompt = require('prompt-promise');

reminder.getUsers().then(function(users) {
  const noTitleUsers = users.filter(reminder.filterBadProfiles)
  // We might want to also send messages to users without images
  //const noImageUsers = users.filter(reminder.filterBadImages)
  return noTitleUsers
}).then(function(users) {
  // Ask for confirmation before doing any actual messaging
  return prompt(`About to send ${users.length} messages, do you want to continue? (y/n)`)
    .then(function(answer) {
      if(answer === "y") {
        return users
      } else {
        throw new Error("Cancelled by user")
      }
    })
}).then(function(users) {

  const fn = function(user) {
    return new Promise(function(resolve, reject) {
      //1 second delay
      setTimeout(function() {
        resolve();
      }, 1000);
    }).then(function() {
      reminder.notifyUser(user).catch(function() {
        console.trace(`Something went wrong notifying a user`)
      })
    })
  }

  // Turn array of user objects into an array of functions that create promises
  // which wait 1 second before sending a user notification.
  const functions = users.map(function(user) {
    return fn.bind(this, user)
  })

  // Now the array of functions can be chained together to produce
  // a chain of promises Promise.resolve().then(fn1).then(fn2).then(fn3)...
  return functions.reduce(function(accumulator, item) {
    return accumulator.then(item);
  }, Promise.resolve());

}).catch(console.warn)
