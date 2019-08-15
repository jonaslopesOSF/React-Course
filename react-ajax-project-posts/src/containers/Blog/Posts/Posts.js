import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from "../../../axios";
// import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
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
    // this.props.history.push({pathname: '/posts/' + id});
    this.props.history.push('/posts/' + id);
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
          // <Link to={'/posts/' + post.id} key={post.id}>
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          // </Link>
        );
      });
    }
    return posts;
  };

  render () {
    return (
      <div>
        <section className="Posts">{this.getPosts()}</section>
        <Route path={this.props.match.url + "/:id"} component={FullPost} />  
      </div>
    ) 
  }
}

export default Posts;