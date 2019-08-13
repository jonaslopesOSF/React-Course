import React, { Component } from "react";
// import axios from "axios";
import axios from '../../axios';

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  componentDidMount() {
    axios.get( "/posts" )
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Jonas',
          }
        })
        this.setState({ posts: updatedPosts });
        // console.log(response);
      })
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id })
  }

  getPosts = () => {
    let posts = <p style={{textAlign: "center"}}>Something went wrong with load posts...</p>

    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return <Post 
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
          />
      });  
    }
    return posts;
  } 

  render() {
    return (
      <div>
        <section className="Posts">
          {this.getPosts()}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId}/>
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
