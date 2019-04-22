import React, { Component } from 'react'
import { withRouter } from "react-router";

class WelcomeScreen extends Component{

    constructor(){
        super();
        
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(){
        let path="/rocknroll";
        this.props.history.push(path)
    }
    render(){
        return(
            <div>
                <div class="splash" style={{marginTop:"50px"}}>
                    <h1 style={{fontSize: "70px"}}>B<span class="alternate">e</span>at G<span>e</span>nera<span>t</span>or </h1>
                    <div style={{color:"white", marginTop:"80px", fontSize: "16px" }}>
                        <p>
                        Drums. The base of every song, no matter the genre.
                        </p>
                        <hr/>
                        <p>
                        This is a simple app that let's you generate your own drum and piano beats and also have <b>fun</b> while you're doing it.
                        <br/>
                        On top of that, you have the option the generate random musical bits made of different instruments. The possibilities
                        are countless, you just have to experiment.
                        </p>
                        <p>
                        Also, you can save your marvelous creations locally or on the server, so you can impress your friends.<br/>
                        Oh, and, depending on the tempo, you can turn a jazzy beat into an epic punk/metal headbanging monstrosity. Cool, huh?
                        </p>
                        <hr/>
                        <p>
                        Go ahead, <b>rockstar</b> , show'em what you got.
                        </p>
                    </div>
                    <div class="controls" style={{marginLeft:"37%"}}>
                        <button class="button" onClick={ this.routeChange }>let's do this</button>
                    </div>
                </div>       
            </div>
        )
    }
}

export default withRouter(WelcomeScreen);