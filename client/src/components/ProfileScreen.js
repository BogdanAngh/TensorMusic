import React, { Component } from 'react'
import axios from 'axios'
import * as mm from '@magenta/music'

const jwt = require('jsonwebtoken');


export default class ProfileScreen extends Component{
    constructor(props){
        super(props);
        this.state ={
            library:[],
            token:"",
            user:""
        }
        
        this.newName = ""
        this.player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus')
        this.handleRename = this.handleRename.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.resume = this.resume.bind(this)
        this.stop = this.stop.bind(this)
        
    }

    handleRename(name){
        axios.request(
            {
                url:'/api/songs/rename',
                method:'post',
                headers:{'Authorization': this.state.token},
                data:{
                    userName: this.state.user,
                    name: name,
                    newName: this.newName
                }
            }
        ).then( res => {
            console.log(res.data.message)
            window.location.reload(); 
        } )
    }

    handleChange(e){
        e.preventDefault()
        this.newName = e.target.value
    }

    componentDidMount(){
        var token = localStorage["jwtToken"]
        var userName = localStorage["user"]

        this.setState({
            token: token,
            user: userName
        })

        axios.request(
            {
                url:'/api/songs/library',
                method:'get',
                params:{
                    userName: userName
                },
                headers:{'Authorization': token}
            }
        ).then(res => {
            this.setState({
                library: res.data
            })
        })
    }

    play(payload){
         var decoded = jwt.decode(payload, 'secret')

         console.log(payload)
         this.player.start(decoded.song, decoded.tempo)
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

    delete(name){
        axios.request(
            {
                url:'/api/songs/remove',
                method:'post',
                headers:{'Authorization': this.state.token},
                data:{
                    userName: this.state.user,
                    name: name
                }
            }
        ).then( res => {
            console.log(res.data.message)
            window.location.reload(); 
        } )
    }

    render(){
        const size = this.state.library.length;
        const isEmpty = (size == 0)

        console.log("is empty", isEmpty)

        const emptyMessage = (
            <div>
                <p style={{fontSize:"40px"}}> * wind blowing * </p>
            </div>
        )

        const Library = ({library}) => (
            <div>
                <table>
                    {library.map( song => (
                        <tr >
                            <td>
                                <p style={{display:"inline-block", marginRight:"10px"}} className="profile" key={song.name} >{song.name}</p>
                            </td>
                            <td>
                                <button  className="button" onClick={() => this.play(song.songPayload)} id="stopBtn"><p>Play</p></button>
                            </td>

                            <td>
                                <button  className="button" onClick={this.pause} id="stopBtn"><p>Pause</p></button>
                            </td>

                            <td>
                                <button  className="button" onClick={this.resume} id="stopBtn"><p>Resume</p></button>
                            </td>

                            <td>
                                <button  className="button" onClick={this.stop} id="stopBtn"><p>Stop</p></button>
                            </td> 

                            <td>
                                <button  className="button" onClick={() => this.delete(song.name)} id="stopBtn"><p>Remove</p></button>
                            </td>

                            <td>
                                <div >
                                    <div style={{marginLeft:"8px"}}>
                                        <form  >
                                            <p style={{color:"white"}}>Rename your beat</p>
                                            <input type="text" placeholder="Name" name="songName" onChange={this.handleChange} ></input>
                                        </form>
                                    </div><br/>
                                    <button style={{float:"right", display:"block", position:"relative", marginTop:"-90px", marginLeft:"220px"}}
                                    className="button" onClick={() => this.handleRename(song.name)} id="stopBtn" >
                                        <h1>Rename</h1>
                                    </button>
                                </div>
                            </td>                            

                        </tr>
                    ))}
                </table>
            </div>
        );
        return (
            <div className="container" styles={{ marginTop: '50px', width: '700px'}}>
                <p style={{fontSize:"70px"}}>Your epic creations:</p>
                {/* < Library library={this.state.library} /> */}
                {isEmpty ? emptyMessage : < Library library={this.state.library} />}
                
            </div>
        )
    }
}