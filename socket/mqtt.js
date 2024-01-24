const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://test.mosquitto.org") // OR url, options

client.on("connect", function () {
  console.log("connected");
  client.subscribe('0013a20041642063', function (err) {
    if (!err) {
      client.publish('0013a20041642063', 'Hello mqtt')
    }
  })

  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic, message.toString())
    client.end()
  })
})
