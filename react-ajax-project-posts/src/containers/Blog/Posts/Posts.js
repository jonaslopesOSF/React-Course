import React, { Component } from 'react';
import axios from "../../../axios";
import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios.get("/posts").then(response => {
      const posts = response.data.slice(0, 4);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: "Jonas"
        };
      });
      this.setState({ posts: updatedPosts });
      // console.log(response); 
    })
    .catch(error => {
      console.log(error)
    });
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  getPosts = () => {
    let posts = (
      <p style={{ textAlign: "center" }}>
        Something went wrong with load posts...
      </p>
    );
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Link to={'/' + post.id} key={post.id}>
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
        );
      });
    }
    return posts;
  };

  render () {
    return (
      <section className="Posts">{this.getPosts()}</section>
    )
  }
}

export default Posts;