import React, { Component } from "react";
// import axios from "axios";
import "./Blog.css";
import { Route, NavLink } from 'react-router-dom';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
   render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink 
                    to="/"
                    exact 
                    activeClassName="my-active"
                    activeStyle={{
                      color: '#fa923f',
                      textDecoration: 'underline',
                    }}>Home</NavLink></li>
                    {/* activeClassName is your custom className
                     to the active class */}
              <li><NavLink to={{
                pathname: "/new-post",
                hash: "#submit",
                search: '?quick-submit=true'
              }}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        {/* <Route exact path="/" render={() =>  <h1>Home</h1>} />
        <Route path="/" render={() =>  <h1>Home</h1>} /> */}
        <Route exact path="/" component={Posts} />
        <Route path="/new-post" component={NewPost} />
        <Route path="/:id" component={FullPost} />
      </div>
    );
  }
}

export default Blog;
