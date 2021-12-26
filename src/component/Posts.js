import React, { Component } from 'react';

class Posts extends Component {
    render() {
        return (
            <div style={{ border: "3px #3B3BA4 solid", margin: '15px', padding: '10px' }}>
                <h2>{this.props.title}</h2>
                <p>{this.props.body}</p>
            </div>
        );
    }
}
export default Posts;