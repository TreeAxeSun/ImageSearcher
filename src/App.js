import React, { Component } from 'react';
import './App.css';

const appId = '19200fcf5e7c8e0618aa997ddaee8232cba67cf8637226576644c58e97569aaf'

class App extends Component {
  state = {
    photos: [],
    randomPhoto: [],
    text: "",
    quantity: 5,
    imgType: ""
  }

  componentDidMount() {
   this.searchPhoto();
   this.getRandomPhoto();
  }

  searchPhoto = (query) => {
    if(this.state.imgType === "all"){
      fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=${this.state.quantity}&query=${query}&client_id=${appId}`)
		    .then(response => response.json())
		    .then(data => {
          this.setState({photos: data.results});
		    })
		    .catch(error => {
			    console.log('Fetching Error', error);
	    	});
    }else{
      fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=${this.state.quantity}&orientation=${this.state.imgType}&query=${query}&client_id=${appId}`)
		    .then(response => response.json())
		    .then(data => {
          this.setState({photos: data.results});
        })
		    .catch(error => {
		      console.log('Fetching Error', error);
		    });
    }
  }

  getRandomPhoto =() =>{
    fetch(`https://api.unsplash.com/photos/?page=1&per_page=1&client_id=${appId}`)
		    .then(response => response.json())
		    .then(data => {
          this.setState({randomPhoto: data});
        })
		    .catch(error => {
			    console.log('Fetching Error', error);
	    	});
  }

  inputText = (event) => {
    this.setState({text: event.target.value});
  }

  inputSubmit = (event) => {
    event.preventDefault();
    this.searchPhoto(this.state.text);
  }

  quantitySelect = (event) => {
    this.setState({quantity: event.target.value})
  }

  imgTypeSelect = (event) => {
    this.setState({imgType: event.target.value})
  }
  
  render() {
    return (
      <div className="App">
       <h5>Avatar</h5>
       {this.state.randomPhoto.map((pic) => {
         return (
           <div key={pic.id}>
              <img src={pic.urls.thumb} className ="avatar" />
           </div>
         )
       })}

       <h1>Images</h1>
				<input name="search" onChange={this.inputText} placeholder="Search Images"/>
        <select name="quantity" onChange={this.quantitySelect}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
        </select>
        <select name="imgType" onChange={this.imgTypeSelect}>
            <option value="all">all</option>
            <option value="portrait">portrait</option>
            <option value="landscape">landscape</option>
            <option value="squarish">squarish</option>
        </select>
        <button onClick={this.inputSubmit}>search</button>
			  <hr />
      
       {this.state.photos.map((photo) => {
         return (
           <div key={photo.id}>
             <img src={photo.urls.thumb} />
           </div>
         )
       })}
      </div>
    );
  }
}

export default App;
