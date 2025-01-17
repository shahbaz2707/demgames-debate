import React, { Component } from 'react';
import {Route, Nav, Link, BrowserRouter as Router} from "react-router-dom";
import list from '../../components/List/List';
import UpdatePlayer from '../../components/Update/UpdateProfile';
import Register from '../Add/Register';
import AddGame from '../Add/AddGame';
import AddChoices from '../Add/AddChoices';
import AddQuestion from '../Add/AddQuestion';
import ListQuestions from '../List/ListQuestions';
import ListChoices from '../List/ListChoices';
import ListGames from '../List/ListGames';
import RemovePlayer from '../Remove/RemovePlayer';
import removequestion from '../Remove/RemoveQuestion';
import RemoveChoice from '../Remove/RemoveChoice';
import UpdateGame from '../Update/UpdateGame';
import UpdateQuestion from '../Update/UpdateQuestion';
import UpdateChoice from '../Update/UpdateChoice';
//import NotFound from '../../pages/Landin';



import Auth from '../../Auth';
//import notfound from './NotFound';
import Callback from '../../pages/LandingPage/callback';


const auth=  new Auth();

class Admin extends Component{
   constructor(props){
       super(props);
       this.state={
           score:0,
           email:this.props.email||null,
           id:null,
           given_name:this.props.given_name,
           family_name:this.props.family_name,
           picture:this.props.picture,
           gender:this.props.gender,
           total:0,
           program_rank:null,
           total_rank:null
       }

       this.handleChange=this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
   }
   
   componentDidMount(){
    if(this.props.email!==null)
    {
        const encodedValue = encodeURIComponent(this.state.email);               
        fetch(`http://localhost:9000/selectPlayerProfile`, {
            method: 'post',        
            headers: {
              "Content-Type": "Application/json",
              "Accept":"application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then((res) => res.json())      
        .then((data)=>{
            console.log(data);
            this.setState({              
                play_id:data[0].play_id,
                player_id:data[0].player_id,
                game_id:data[0].game_id,
                username:data[0].username,
                score:data[0].score,
                total:data[0].total,
                gender:data[0].gender,
                city:data[0].city,
                country:data[0].country,
                program:data[0].program,
                program_rank:data[0].program_rank,
                total_rank:data[0].total_rank,
                email:data[0].email
            });
        })
        .catch((error)=>console.log(error))   
    }
   }

   handleChange(e){
       e.preventDefault();
       const sc=e.target.value;
       this.setState({
           score:sc}
       );      
   }


   handleSubmit(e){
        e.preventDefault();
        
        this.setState({
            total:Number(this.state.score)+Number(this.state.total)}
        );
       
        const url ="http://localhost:9000/updateplayerscore";
        fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "Application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify(this.state),
        mode:'cors'
      })
      .then((res) => res.json())      
      .then((data)=>{
            
            console.log(data)
        })
      .catch((error)=>console.log(error))  
   }
    render(){
  ;      
        return (
                <div> 
                   
                    <Router>
                       <div>
                        <div>
                            <Link to="/list">List players</Link> || 
                            <Link to="/listgames">List games</Link> || 
                            <Link to="/listquestions">List questions</Link> || 
                            <Link to="/listchoices">List choices</Link> || 
                            <Link to="/UpdatePlayer">Update player</Link> || 
                            <Link to="/registerplayer">Register new player</Link> || 
                            <Link to="/addgame">Add game</Link> ||
                            <Link to="/addchoices">Add choices</Link> || 
                            <Link to="/addquestion">Add question</Link> || 
                            <Link to="/removeplayer">Remove player</Link> ||                    
                            <Link to="/removechoice">Remove choice</Link> || 
                            <Link to="/removequestion">Remove question</Link> || 
                            <Link to="/updategame">Update game</Link> ||  
                            <Link to="/updatequestion">Update question</Link> || 
                            <Link to="/updatechoice">Update choice</Link> ||  
                        </div>
                        <div>
                            <Route path="/list" component={list} />
                            <Route path="/UpdatePlayer" component={UpdatePlayer} />
                            <Route path="/registerplayer" component={Register} />
                            <Route path="/addgame" component={AddGame} />
                            <Route path="/addchoices" component={AddChoices} />
                            <Route path="/addquestion" component={AddQuestion} />
                            <Route path="/listquestions" component={ListQuestions} />  
                            <Route path="/listchoices" component={ListChoices} />
                            <Route path="/listgames" component={ListGames} />
                            <Route path="/removeplayer" component={RemovePlayer} />
                            <Route path="/removechoice" component={RemoveChoice} />
                            <Route path="/removequestion" component={removequestion} />
                            <Route path="/updategame" component={UpdateGame} />
                            <Route path="/updatequestion" component={UpdateQuestion} />
                            <Route path="/updatechoice" component={UpdateChoice} />
                        </div>
                       </div>
                    </Router>   

                </div>
        )
    }
}

export default Admin;