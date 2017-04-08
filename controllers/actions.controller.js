const fs = require('fs');
const chalk = require('chalk');
const config = require('../config.json');

const childProcess = require('child_process');
const Speaker = require('speaker');
const Ivona = require('ivona-node');
const Sound = require('node-aplay');
const lame = require('lame');

class Actions {
  constructor() {
    this.path = process.env.PWD;
    
    this.tts = new Ivona({
        accessKey: config['IVONA']['ACCESS_KEY'],
        secretKey: config['IVONA']['SECRET_KEY']
    });

    this.speaker = new Speaker();

    this.options = {
      config: {
        encoding: 'LINEAR16',
        sampleRate: 16000
      }
    };
  }

  process(command, opts){
    switch(command){
      case "wave":
        this.speak("Ok, I will wave my arm. Just for you.");
        this.execute('wave');
      break;
      case "say":
		this.speak(opts);
      break;
      case "dance":
		this.execute('dance');
	  break;
	  case "workout":
		this.play_sound(this.path + '/resources/sounds/tiger.wav');
	  break;
	  case "time":
		this.play_sound(this.path + '/resources/sounds/pbj_time.wav');
	  break;
	  case "introduce":
		this.speak("Hi. my name is Watson. I'm here to show you a little bit of what I can do. I'm a doctor. I'm a chef. I can design clothes. I'm the best DJ and Jeopardy player... Oh, and I like waffles and puppies.")
	  break;
	  default:
	  break;
    }
  }

  stop_sound() {
    if(this.music){
      this.music.stop();
    }
  }

  play_sound(sound) {
    var self = this;

    self.music = new Sound(sound);
    self.music.play();
    self.music.on('complete', () => {
      self.music = false;
    });
  }

  execute(file) {
   var self = this;
   console.log(self.path);

   childProcess.exec('sudo node ' + self.path + '/actions/'+ file +'.js', (err, stdout, stderr) => {
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
      });
    });
  }
}

module.exports = Actions;
