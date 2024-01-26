const SerialPort = require('serialport');
const xbee_api = require('xbee-api');
const C = xbee_api.constants;
//const storage = require("./storage")
require('dotenv').config()


var mqtt = require('mqtt')

var options = {
  host: process.env.CLUSTER_MQTT_HOST,
  port: process.env.CLUSTER_MQTT_PORT,
  protocol: process.env.CLUSTER_MQTT_PROTOCOL,
  username: process.env.CLUSTER_MQTT_USERNAME,
  password: process.env.CLUSTER_MQTT_PASSWORD,
}

var client = mqtt.connect(options);

const SERIAL_PORT = process.env.SERIAL_PORT;

const xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 2
});

let serialport = new SerialPort(SERIAL_PORT, {
  baudRate: parseInt(process.env.SERIAL_BAUDRATE) || 9600,
}, function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

serialport.on("open", function () {
  var frame_obj = { // AT Request to be sent
    type: C.FRAME_TYPE.AT_COMMAND,
    command: "NI",
    commandParameter: [],
  };

  xbeeAPI.builder.write(frame_obj);

  frame_obj = { // AT Request to be sent
    type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
    destination64: "FFFFFFFFFFFFFFFF",
    command: "NI",
    commandParameter: [],
  };
  xbeeAPI.builder.write(frame_obj);

  const off_frame = {
    type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
    destination64: "FFFFFFFFFFFFFFFF",
    command: "D1",
    commandParameter: [0x01]
  };

  xbeeAPI.builder.write(off_frame);

  const off_frame2 = {
    type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
    destination64: "FFFFFFFFFFFFFFFF",
    command: "D0",
    commandParameter: [0x05]
  }

  xbeeAPI.builder.write(off_frame2);
});

// All frames parsed by the XBee will be emitted here

// storage.listSensors().then((sensors) => sensors.forEach((sensor) => console.log(sensor.data())))
const topics = ["partieXbeeQuizz", "timerXbeeQuizz", "participationXbeeQuizz", "playerXbeeQuizz"]
client.subscribe(topics, (err) => {
  if (!err) {
    client.on('message', function (topic, message) {
      console.log('Received message on topic:', topic, 'with message:', message.toString());

      if(topic === "partieXbeeQuizz"){
        if (message.toString() === "Start") {
          const off_frame = {
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination64: "FFFFFFFFFFFFFFFF",
            command: "D0",
            commandParameter: [0x04]
          };
          xbeeAPI.builder.write(off_frame);

          const off_frame2 = {
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination64: "FFFFFFFFFFFFFFFF",
            command: "D1",
            commandParameter: [0x03]
          }
          xbeeAPI.builder.write(off_frame2);
        }

        if(message.toString() === "NextQuestion"){
          const off_frame = {
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination64: "FFFFFFFFFFFFFFFF",
            command: "D0",
            commandParameter: [0x04]
          };
          xbeeAPI.builder.write(off_frame);

          const off_frame2 = {
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination64: "FFFFFFFFFFFFFFFF",
            command: "D1",
            commandParameter: [0x03]
          }
          xbeeAPI.builder.write(off_frame2);
        }
      }

      if(topic === "timerXbeeQuizz"){
        if(message.toString() === "NoMoreTime"){
          console.log('partie stoped')
          const off_frame = {
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination64: "FFFFFFFFFFFFFFFF",
            command: "D0",
            commandParameter: [0x05]
          };
          xbeeAPI.builder.write(off_frame);

          const off_frame2 = {
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination64: "FFFFFFFFFFFFFFFF",
            command: "D1",
            commandParameter: [0x01]
          }

          xbeeAPI.builder.write(off_frame2);
        }
      }

    });
  }
})

xbeeAPI.parser.on("data", function (frame) {
  let buzzerOn = true;
  //on new device is joined, register it

  //on packet received, dispatch event
  //let dataReceived = String.fromCharCode.apply(null, frame.data);
  if (C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET === frame.type) {
    console.log("C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET");
    // let dataReceived = String.fromCharCode.apply(null, frame.data);
    // console.log(">> ZIGBEE_RECEIVE_PACKET >", dataReceived);

  }

  if (C.FRAME_TYPE.NODE_IDENTIFICATION === frame.type) {
    // let dataReceived = String.fromCharCode.apply(null, frame.nodeIdentifier);
    console.log("NODE_IDENTIFICATION");
    //storage.registerSensor(frame.remote64)

  } else if (C.FRAME_TYPE.ZIGBEE_IO_DATA_SAMPLE_RX === frame.type) {
    //
    // console.log(frame)
    // console.log(">> ZIGBEE_IO_DATA_SAMPLE_RX >", frame.remote64, frame.digitalSamples.DIO0)
    if (frame.digitalSamples.DIO0 === 0 && frame.digitalSamples.DIO1 === 1 && buzzerOn) {
      client.subscribe("participationXbeeQuizz", (err) => {
        if (!err) {
          console.log(">> ZIGBEE_RECEIVE_PACKET subscribe>", frame.remote64);
          client.publish("participationXbeeQuizz", frame.remote64);

          var off_frame = {
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination64: 'FFFFFFFFFFFFFFFF',
            command: 'D0',
            commandParameter: [0x05]
          };

          xbeeAPI.builder.write(off_frame);

         off_frame = {
            type: C.FRAME_TYPE.REMOTE_AT_COMMAND_REQUEST,
            destination64: frame.remote64,
            command: 'D0',
            commandParameter: [0x04]
          };

          xbeeAPI.builder.write(off_frame);

          buzzerOn = false;
        }
      })


    }

    //storage.registerSample(frame.remote64,frame.analogSamples.AD0 )

  } else if (C.FRAME_TYPE.REMOTE_COMMAND_RESPONSE === frame.type) {
    // console.log("REMOTE_COMMAND_RESPONSE")
    // console.log(frame)
    let dataReceived = String.fromCharCode.apply(null, frame.commandData)
    // console.log(dataReceived)
    let userInformation = {
      name: dataReceived,
      remote64: frame.remote64
    }
    // console.log(userInformation);

    client.subscribe("playerXbeeQuizz", (err) => {
      if (!err && dataReceived) {
        // console.log(">> ZIGBEE_RECEIVE_PACKET client mqtt >", JSON.stringify(userInformation));
        client.publish("playerXbeeQuizz", JSON.stringify(userInformation));
      }
    })
  } else if (C.FRAME_TYPE.JOIN_NOTIFICATION_STATUS){
    console.log("JOIN_NOTIFICATION_STATUS")
    // console.log(frame)
  }else {
    console.log("AT_COMMAND_RESPONSE")
    // console.debug(frame)
    // let dataReceived = String.fromCharCode.apply(null, frame.commandData)
    // console.log(dataReceived);
  }

});
