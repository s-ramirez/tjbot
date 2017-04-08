const fs = require('fs');
const chalk = require('chalk');
const config = require('../config.json');

const childProcess = require('child_process');
const Speaker = require('speaker');
const watson = require('watson-developer-cloud');
const Sound = require('node-aplay');

class Actions {
  constructor() {
    this.path = process.env.PWD;
    
    this.tts = watson.text_to_speech({
      username: config["WATSON_TTS"]["USERNAME"],
      password: config["WATSON_TTS"]["PASSWORD"],
      version: 'v1'
    });

    this.speaker = new Speaker();

    this.options = {
      config: {
        encoding: 'LINEAR16',
        sampleRate: 16000
      }
    };
  }

  process_action(command){
    f(command.indexOf("raise") >= 0 || command.indexOf("weave") >= 0 || command.indexOf("wave") >= 0 || command.indexOf("arm") >= 0) {
      self.speak("Ok, I will wave my arm. Just for you.");
      self.execute('wave');
    } else if(command.indexOf("dance") >= 0) { /* dance */
      self.execute('dance');
    } else if(command.indexOf("pump") >= 0 || command.indexOf("workout") >= 0 || command.indexOf("work out") >= 0 || command.indexOf('credits') >= 0) { /* dance */
      self.play_sound(self.path + '/resources/sounds/tiger.wav');
    } else if(command.indexOf("time") >= 0 && command.indexOf("is it") >= 0) { /* dance */
      self.play_sound(self.path + '/resources/sounds/pbj_time.wav');
    } else if(command.indexOf("introduce") >= 0 && command.indexOf("yourself")) { /* introduce */
      self.speak("Hi. my name is Watson. I'm here to show you a little bit of what I can do. I'm a doctor. I'm a chef. I can design clothes. I'm the best DJ and Jeopardy player... Oh, and I like waffles and puppies.")
    } else{
      // var received = {
      //   from: '',
      //   adapter: 'speech',
      //   message: command || "Sorry, I didn't get that"
      // };
      //
      // request({ url: config["SERVER"]["ACTION_URL"], qs: { message: received }}, (error, response, body) => {
      //   if(error) {
      //     console.log(chalk.red('[ERROR] Speech Client: ' + error));
      //     process.exit();
      //   }
      //   console.log('Response:', body);
      //   self.speak(body);
      // });
    }
  }

  stop_sound() {
    if(this.music){
      this.music.stop();
    }
  }

  play_sound(sound) {
    var self = this;
    Sonus.pause(self.sonus);

    self.music = new Sound(sound);
    self.music.play();
    self.music.on('complete', () => {
      Sonus.resume(self.sonus);
      self.music = false;
    });
  }

  execute(file) {
   var self = this;

   childProcess.exec('sudo node ' + self.path + '/clients/'+ file +'.js', (err, stdout, stderr) => {
      if(err || stderr) {
        console.log(err);
        console.log(stderr);
        self.speak("Sorry, I don't feel like doing that right now");
      }
    });
  }
  speak(message) {
    var self = this;

    this.tts.createVoice(message, {
      body: {
        voice: config["IVONA"]["VOICE"]
      }
    })
    .pipe(new lame.Decoder())
    .on('format', function(format) {
      this.pipe(new Speaker(format))
      .on('close', function() {
        Sonus.resume(self.sonus);
      });
    });
  }
}

module.exports = Actions;
