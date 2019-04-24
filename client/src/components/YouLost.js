import React, { Component } from 'react'

export default class YouLost extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div className="container" styles={{  width: '700px'}}>
                <p style={{marginTop: '100px', fontSize:"60px", textAlign:"center"}}>Your lost? Just click "Home" or "Rock'n'Roll" and you'll find your way back.</p>
            </div>
        )
    }
}