import React, { Component } from 'react'
import * as mm from '@magenta/music'
import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/lab/Slider'

var FileSaver = require('file-saver')
const jwt = require('jsonwebtoken');
const styles = {
    root: {
      width: 100,
    },
    slider: {
    //   padding: '22px 0px',
    },
};

export default class MainScreen extends Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            number: 1,
            instrument:'drums',
            tempo: 115
        }

        this.hasChild = false;
        this.model = new mm.MusicVAE("https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_4bar_med_q2");
        this.player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus')

        this.song = {};
        this.samples = {};
        this.reset = this.reset.bind(this);
        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
        this.stop = this.stop.bind(this);
        this.save = this.save.bind(this);
        this.add = this.add.bind(this);
        this.generate = this.generate.bind(this);
        this.play = this.play.bind(this);
        this.handleChangeSample = this.handleChangeSample.bind(this);
        this.handleChangeInstr = this.handleChangeInstr.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTempo = this.handleChangeTempo.bind(this);

        
        console.log(this.player)
    }

    componentDidMount(){
        var controlObj = this.refs.tempoRef;
        var pElem = document.createElement("p");
            pElem.style.color="#32cc08";
            var errorMessage = document.createTextNode(this.state.tempo)
            pElem.appendChild(errorMessage);
            pElem.id="tempoValue"
            controlObj.appendChild(pElem);
            this.hasChild = true;
    }

    handleChangeTempo = (event, value) => {
        this.setState({
            tempo: value
        })

        var controlObj = this.refs.tempoRef;
        if(this.hasChild){
            var pElem = document.getElementById("tempoValue")
            controlObj.removeChild(pElem)
        }
            var pElem = document.createElement("p");
            pElem.style.color="#32cc08";
            var errorMessage = document.createTextNode(this.state.tempo)
            pElem.appendChild(errorMessage);
            pElem.id="tempoValue"
            controlObj.appendChild(pElem);
            this.hasChild = true;
        
    }

    handleChangeInstr(e){
        e.preventDefault();
        this.setState({
            instrument:e.target.value 
        })
    }

    handleChangeSample(e){
        e.preventDefault()
        this.setState({
            number: e.target.value
        }); 
    }

    handleSubmit(e){
        e.preventDefault();

        var sampleNo = this.state.number;
        if(sampleNo >=1 && sampleNo <= 3){
            this.song = this.samples[sampleNo - 1];

        }

        switch(this.state.instrument){
            case 'piano':
                this.model = new mm.MusicVAE("https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2");
                break;
            case 'multitrack':
                this.model = new mm.MusicVAE("https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/multitrack");
                break;
            default:
                break;

        }
        console.log(this.state)
    }

    reset(e){
        e.preventDefault();
        console.log("asdadasd")
    }

    pause(e){
        e.preventDefault();
        if(this.player.isPlaying()){
            this.player.pause();
        }
    }

    resume(e){
        e.preventDefault();
        if(this.player.getPlayState() == "paused"){
            this.player.resume();
        }
    }

    stop(e){
        e.preventDefault();
        if(this.player.isPlaying()){
            this.player.stop();
        }
    }

    add(e){
        e.preventDefault();
        if(Object.keys(this.song).length){
             var songHash = jwt.sign({
                 song: this.song
             }, 'secret', { expiresIn: "1000 days" })
            
             console.log( songHash);

             var decoded = jwt.decode(songHash, 'secret')

             console.log(decoded.song)

             this.player.start(decoded.song, this.state.tempo)
        }

    }
    save(e){
        e.preventDefault();
        if(Object.keys(this.song).length){
            var songSave = new Blob([this.song], {type: "audio/mpeg"});
            FileSaver.saveAs(songSave, "epicness.mp3"); 
        }        
    }

    generate(e){
        e.preventDefault();
        var controlObj = this.refs.tempoRef;
        var pElem = document.createElement("p");
        var rockBtn = this.refs.rock;
        pElem.style.color="#32cc08";
        var errorMessage = document.createTextNode("Patience please...")
        pElem.appendChild(errorMessage);
        controlObj.appendChild(pElem);
        rockBtn.hidden = true;

        console.log(rockBtn)
        this.model
                .initialize()
                .then(() => this.model.sample(3))
                .then( samples => {
                    this.samples = samples;
                    this.song = this.samples[0]
                    console.log(this.samples)
                    this.player.resumeContext();
                    controlObj.removeChild(pElem);
                    rockBtn.hidden= false;
                })
    }

    play(e){
        e.preventDefault();
        if(!Object.keys(this.samples).length){ //verify for empty samples obj
            var controlObj = this.refs.tempoRef;
            var pElem = document.createElement("p");
            pElem.style.color="#a50109";
            var errorMessage = document.createTextNode("Make sure you generate first time")
            pElem.appendChild(errorMessage);
            controlObj.appendChild(pElem)
            setTimeout(() => {
                controlObj.removeChild(pElem);
            }, 2000)
        }

        if(Object.keys(this.samples).length)
            this.player.start(this.song, this.state.tempo)
    }

    render(){
        let tempo = this.state.tempo
        return (
            <div className="container" styles={{ marginTop: '50px', width: '700px'}}>
                <head>
                </head>
                <body>
                    <div style={{marginTop: "20px"}}>
                        <button className="button" onClick={this.reset}><h1>Reset</h1></button>
                        <button className="button" onClick={this.generate}><h1>Generate</h1></button>
                        <br></br>
                        <br></br>
                        <button className="button" onClick={this.play} id="playBtn" ref="rock"><h1>Rock'n'Roll</h1></button>
                        
                        <button className="button" onClick={this.pause} id="stopBtn"><h1>Pause</h1></button>
                        <button className="button" onClick={this.resume} id="stopBtn"><h1>Resume</h1></button>
                        <button className="button" onClick={this.stop} id="stopBtn"><h1>Stop</h1></button>
                    </div>
                    <div className="controls" ref="cntrl">  
                             
                    </div>
                    
                        <form onSubmit={this.handleSubmit}>
                            <div className="d-inline-block container">
                                <br/>
                                    <div className="col-md-4" ref="tempoRef">
                                        <p style={{color:'white'}} >Tempo</p>
                                        <Slider
                                            classes={{ container: styles.slider}}
                                            value = {tempo}
                                            min={0}
                                            max={500}
                                            step={5}
                                            onChange={this.handleChangeTempo} 
                                        />
                                
                                    </div>
                                    <div className="col-md-4">
                                        <p style={{color:'white'}} > Select Sample</p>
                                        <select onChange={this.handleChangeSample} value={this.state.value} >
                                            <option value="1">Sample 1</option>
                                            <option value="2">Sample 2</option>
                                            <option value="3">Sample 3</option>
                                        </select>

                                    </div>
                                    <div className="col-md-4">
                                    <p style={{color:'white'}} > Select Instrument</p>
                                        <select onChange={this.handleChangeInstr} value={this.state.value} >
                                            <option value="drums">Drums</option>
                                            <option value="piano">Piano</option>
                                            <option value="multitrack">Random Melody</option>
                                        </select>

                                    </div>
                                </div>
                            
                            <br></br>
                            <button className="button" style={{marginLeft: "550px", marginBottom:"50px"}} type="submit">Submit Choice</button>
                        </form>
                        

                        <button className="button" onClick={this.save} id="stopBtn"><h1>Save Locally</h1></button>
                        {/* <button className="button" onClick={this.add} id="stopBtn"><h1>Add to Library</h1></button> */}
                        <br></br>
                        <p style={{color:'white'}}> - Make sure you "Generate" after submiting if you want the effect to work -  </p>
                        <p style={{color:'white'}}> * The "Rock'n'Roll" button will the dissapear each time you generate to prevent errors * </p>
                        <p style={{color:'white'}}> * The first generation will be slow (15 sec max), so have patience * </p>
                </body>
            </div>
        )
    }
}