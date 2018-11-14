import React, { Component } from 'react';
import Title from './title.js';
import ScrollUp from './scroll-up.js';
import axios from 'axios';
import pokeball from './backgrounds/pokeball.png';
import plus from './backgrounds/plus.svg';
import group from './backgrounds/group.svg';
// import group from './group.svg';
import  CreateBattleGroup from './createBattleGroup.js';
import './App.css';





class App extends Component {
  constructor(){
    super()
    this.state={
      pokemon:[],
      level: '',
      myParty: [],
      battleGroup: []
    }
  }
  
  componentDidMount(){
    axios.get('/api/get_all_pokemon').then(response => {
      this.setState({
        myParty: response.data
      })
    })
  }

  getRandomPokemon = () => {
    let num = Math.floor(Math.random() * 949) + 1;
    // console.log(`https://pokeapi.co/api/v2/pokemon/${num}`)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then(pokemonApiResponse => {
      console.log(pokemonApiResponse.data)
      this.getLevel();
      this.setState({
      pokemon: pokemonApiResponse.data.name
    })
      })
  }

  getLevel = () =>{
    axios.get('/api/pokemon_power_value').then(value => {
     let randomNumber = Math.floor(Math.random() * value.data.length);
      console.log();
      this.setState({
        level: value.data[randomNumber]
      })
      
    })
  }

  addToParty =  () =>{

    axios.post('/api/add_pokemon', {name: this.state.pokemon, level: this.state.level}).then(myParty =>{
      console.log(myParty);
      this.setState({
        myParty: myParty.data
      })
    })

  }
  
  train = (id) =>{
    axios.put(`/api/train_pokemon/${id}`) 
    .then(response => {
      console.log('---',response.data);
      this.setState({
        myParty: response.data
      })
    })
  }


  delete = (id) => {
    axios.delete(`/api/remove_pokemon/${id}`)
    .then(response => {
      this.setState({
        myParty:response.data
      })
    })
  }

  createBattleGroup = () =>{

    let myBattleGroup = [...this.state.myParty].sort((a,b) => {
      return b.level - a.level;
  });
    console.log('battlegroup sorted', myBattleGroup)

    
   let newBattleGroup = myBattleGroup.splice(0, 5)
  

   this.setState({
     battleGroup: newBattleGroup
   })
  }


  render() {
    console.log(this.state.pokemon);
    let level = this.state.level
    console.log(this.state.myParty)
    const party = this.state.myParty.map((e,i) =>{
      return <div key={e.id}>
        <p>Name: {e.name} </p>
        <p>Value:{e.level}</p>
        <button onClick={()=> this.train(e.id)}>Train</button> 
        <button onClick={()=> this.delete(e.id)}>Delete</button>
        </div>
    })
    const battleGroup = this.state.battleGroup.map((e,i) =>{
      return <div key={e.id}>
       <p>Name: {e.name} </p>
        <p>Value:{e.level}</p>
        </div>
    })



    return (
      
      <div className="App">
     <div className="body">
        <div className="landing">
        <Title />
        </div>
        <div className="wild">
        <div className='pokeball4'>
            <img onClick={()=> this.getRandomPokemon()} src={pokeball} />
          </div>
          <div className="button1">
          {this.state.pokemon} {this.state.level}
           <div className='pokeball4'>
             <img onClick={()=> this.addToParty()} src={plus} />
           </div>
          </div>
          <div className="button2">
          <div className='pokeball4'>
            <img onClick={()=> this.getRandomPokemon()} src={pokeball} />
          </div>
          </div>
          <div className="button3">
          <div className='pokeball4'>
            <img onClick={()=> this.getRandomPokemon()} src={pokeball} />
          </div>
          </div>
          <div className="button4">
          <div className='pokeball4'>
            <img onClick={()=> this.getRandomPokemon()} src={pokeball} />
          </div>
          </div>
          {/* <div className='pokeball4'>
            <img onClick={()=> this.getRandomPokemon()} src={pokeball} />
          </div> */}
        </div>
        <div className="party">
        
          <div className="battleButton">

          </div>
          <div className="groupDiv">
            My Party:
        {party}
         </div>
        </div>
        <div className="battleGroup">
          <div className="empty">
          </div>
           <div className="showGroup">
          {battleGroup}
          </div>
          <div className="createGroup">
           {/* np/> */}
           <div className='pokeball4'>
<img onClick={()=> this.createBattleGroup()} src={group} />
</div>
          </div>
        </div>
        <div className="footer">
      <ScrollUp style={{width: 75}} ToggledStyle={{right: 100}}/>
        </div>
      </div>
      </div>
    );
  
  }
}

<div className='pokeball4'>
<img onClick={()=> this.createBattleGroup()} src={group} />
</div>

export default App;
