var LaunchDarkly = require('ldclient-node');
var secrets = require('./secrets.json');

var client = LaunchDarkly.init(secrets.ldSkdkey);

var user = {
  key: 'bob@example.com'
};

client.waitUntilReady().then(() => {
  /**
   * @param {string} Feature flag name
   * @param {object} User data (key property is required)
   * @param {boolean} Default value (used if errors such as a case that the flag is not found and a case that user.key is not specified)
   */
  client.variation('marty-flag', user, false)
    .then(showFeature => {
      if (showFeature) {
        // application code to show the feature
        console.log('[ ON ] Showing your feature to ' + user.key);
      } else {
        // the code to run if the feature is off
        console.log('[ OFF ] Not showing your feature to ' + user.key);
      }

      client.flush().then(() => {
        client.close();
      });
    })
    .catch(err => {
      console.log('Error');
    });
});
