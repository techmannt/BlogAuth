import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
var moment = require('moment');

const DisplayBlog: React.FC<BlogCardProps> = (props) => {
  const [blogEntry, setBlogEntry] = useState<IBlog>({
    id: '0',
    title: '',
    content: '',
    authorid: 1,
    created: new Date(),
    name: '',
    tags: ''
  });

  useEffect(() => {

    async function loadBlog() {
      let res = await fetch(`/api/entries/${props.match.params.id}`);
      let blogInfo = await res.json();
      setBlogEntry(blogInfo);
    }

    loadBlog();

  }, []);

  return (
    <main className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="nav-alt">
          <div className="navbar-nav ml-auto">
            <Link className="btn btn-primary mx-1" to={`/profile`}>Your Profile</Link>
            <Link className="btn btn-primary mx-1" to={`/addentry`}>Add A Blog</Link>
            <Link className="btn btn-primary mx-1" to={`/login`}>Login/Register</Link>
          </div>
        </div>
      </nav>

      <div className="col-md-12" key={blogEntry.id}>
        <div className="card w-75">
          <div className="card-body">
            <h5 className="card-title">{blogEntry.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{moment(blogEntry.created).format("MMM. DD, YYYY")}</h6>
            <span className="card-text text-white bg-dark">{blogEntry.tags}</span>
            <p className="card-text">by {blogEntry.name}</p>
            <div className="card-text">{blogEntry.content.split('\n').map((paragraph, index) => (
              <span key={index}>
                <ReactMarkdown source={paragraph} />
              </span>
            ))}</div>
            <div className="d-flex mt-3 justify-content-between">
              <Link className="card-link btn btn-primary" to={`/`}>Go Back</Link>
              {(Number(localStorage.getItem('userid')) === blogEntry.authorid) ?
                <>
                  <Link className="card-link btn btn-primary" to={`/edit/${blogEntry.id}`}>Edit</Link>
                </> : null
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

interface IBlog {
  id: string,
  title: string,
  content: string,
  authorid: number,
  created: Date,
  name: string,
  tags: string
}

interface BlogCardProps extends RouteComponentProps<{ id: string }> { }

export default DisplayBlog;
