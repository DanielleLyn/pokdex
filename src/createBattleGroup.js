import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import './App.js';

export default class CreateBattleGroup extends Component {
    constructor(){
      super()
      this.state={
      level: '',
      myParty: []
      }

    }

   

 render(){
    return(
 <button className="create" onClick ={()=> this.props.createBattleGroup()}>Create Battle Group</button>
    )
 }
}
