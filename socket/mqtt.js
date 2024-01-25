const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://mqtt-dashboard.com") // OR url, options


client.on("connect", function () {

  console.log("Connected to HiveMQ: " + client.connected);

  client.subscribe('0013a20041642063', function (err) {
    if (!err) {
      client.publish('0013a20041642063', 'Hello mqtt')
    }
  })

  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic, message.toString())

  })

  var message = "test message";
  var topic = "testTopic";

  var options={
    retain:true,
    qos:1};
    client.publish(topic, message, options);
  var timer_id = setInterval( function() { publish(topic, message, options); } ,5000);

  //publish function
  function publish(topic, msg, options){
      console.log("publishing", msg);
    if (client.connected == true){
      client.publish(topic, msg, options);
    }
  }
})
