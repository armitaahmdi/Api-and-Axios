import React, { Component } from 'react';
import styles from './App.module.css'

import axios from 'axios'
import Posts from './component/Posts';
import Comments from './component/Comments'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postData: [],
      int: 2,
      input: '',
      textarea: '',
      showResults: false,
    }
  }
  addHandler = () => {
    this.setState((prevState) => ({
      int: prevState.int + 1
    }))
  }
  deleteHandler = () => {
    this.setState((prevState) => ({
      int: prevState.int - 1
    }))
  }
  inputHandler = (e) => {
    this.setState({
      input: e.target.value,
    })
  }
  commentHandler = (e) => {
    this.setState({
      textarea: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
  }
  postHandler = () => {
    this.setState({ showResults: true });
    const data = {
      title: this.state.input,
      body: this.state.textarea,
    }
    axios.post('https://jsonplaceholder.typicode.com/posts/', data)
      .then(response => console.log(response.data))
  }
  
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts/')
      .then(response => this.setState({ postData: response.data }))
  }

  render() {
    const { postData, input, textarea, int } = this.state;
    return (
      <>
        <h1>Posts:</h1>
        <button className={styles.addButton} onClick={this.addHandler}>
          Click For One More
        </button>
        <button className={styles.addButton} onClick={this.deleteHandler}>
          Click For Delete One
        </button>
        {postData.map(post => <Posts key={post.id} title={post.title} body={post.body} />).slice(0, int)}
        {this.state.showResults && <Comments title={input} body={textarea} />}
        <h2>Your Comment:</h2>
        <form onSubmit={(e) => this.handleSubmit(e)} className={styles.commentBox}>
          <input onChange={(e) => this.inputHandler(e)} type='text' placeholder='Title' />
          <textarea onChange={(e) => this.commentHandler(e)} placeholder='Body' />
        </form>
        <button className={styles.submitButton} onClick={this.postHandler} > Send </button>
      </>
    );
  }
}

export default App;