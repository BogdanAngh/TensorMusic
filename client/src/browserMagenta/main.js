 // Instantiate model by loading desired config.
 var model = new mm.MusicVAE(
    'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_4bar_med_q2');
 var player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus')
 var samples = {};
  var tempoSlider = document.getElementById('tempoSlider');
  var drumRadio = document.getElementById('drumsOpt');
  var pianoRadio = document.getElementById('pianoOpt');
  var multiRadio = document.getElementById('multiOpt');
  var eightbitRadio = document.getElementById('8bitOpt');
  var playBtn = document.getElementById('playBtn');
  var control = document.getElementById('cntrl')
  var sample1 = document.getElementById('sample1');
  var sample2 = document.getElementById('sample2');
  var sample3 = document.getElementById('sample3');
  var tempo = 115;
  var index = 1
  var song = {};
  tempoSlider.value = tempo;
  
  drumRadio.addEventListener('change', () => {
    model = new mm.MusicVAE(
        'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_4bar_med_q2');
  })

    pianoRadio.addEventListener('change', () =>{
        model = new mm.MusicVAE(
            'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_q2');
    })

    multiRadio.addEventListener('change', () => {
        model = new mm.MusicVAE(
            'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/multitrack_med');
    })

    eightbitRadio.addEventListener('change', () => {
        player2 = new mm.Player(false)
    })

    tempoSlider.addEventListener('change', () => {
        tempo = tempoSlider.value;
    })

    sample1.addEventListener('change', () => {
        index = 1;
    })

    sample2.addEventListener('change', () => {
        index = 2;
    })

    sample3.addEventListener('change', () => {
        index = 3;
    })

  function pause(){
    if (player.isPlaying()){
        player.pause();
    }
  }

  function resume(){
    if( player.getPlayState() == "paused"){
        player.resume();
    }
  }

  function stop(){
    if (player.isPlaying()){
        player.stop();
    }
  }

  function save(){
      if(Object.keys(song).length)
        saveAs(new File([mm.sequenceProtoToMidi(song)], 'epicStuff.mp3'))
      else{
          console.log("sdasd")
      }
  }

  function reset(){
    model = new mm.MusicVAE(
        'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_4bar_med_q2');
    player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
    drumRadio.checked = true;
    pianoRadio.checked = false;
    eightbitRadio.checked = false;
    multiRadio.checked = false;
  }

  function generate() {
   
    // samples = await model.sample(3);
    playBtn.disabled = true;
    playBtn.hidden = true;
    var pElem = document.createElement("p");
        pElem.style.color="#32cc08";
        var errorMessage = document.createTextNode("Patience please...")
        pElem.appendChild(errorMessage);
        control.appendChild(pElem);
    model.sample(3)
         .then((values) => {
            samples = values;
            console.log(samples);
            playBtn.disabled = false;
            playBtn.hidden = false;
            control.removeChild(pElem);
         })
    // console.log(samples);
   
 }

 function play(){
    if(!Object.keys(samples).length){ //verify for empty samples obj
        var pElem = document.createElement("p");
        pElem.style.color="#a50109";
        var errorMessage = document.createTextNode("Make sure you generate first time")
        pElem.appendChild(errorMessage);
        control.appendChild(pElem);
        setTimeout(() => {
            control.removeChild(pElem);
        }, 2000)

    }else{
        if(index >= 1 && index <= 3){
            player.resumeContext();
            song = samples[index-1];
            player.start(song, tempo);
        }else{
            var pElem = document.createElement("p");
            pElem.style.color="#a50109";
            var errorMessage = document.createTextNode("Nice try, smart ass")
            pElem.appendChild(errorMessage);
            control.appendChild(pElem);
            setTimeout(() => {
                control.removeChild(pElem);
            }, 2000) 
        }
    }
 }

 var rangeSlider = function(){
var slider = $('.range-slider'),
range = $('.range-slider__range'),
value = $('.range-slider__value');

slider.each(function(){

value.each(function(){
var value = $(this).prev().attr('value');
$(this).html(value);
});

range.on('input', function(){
$(this).next(value).html(this.value);
});
});
};

rangeSlider();