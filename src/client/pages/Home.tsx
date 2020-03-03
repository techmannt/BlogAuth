import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
var moment = require('moment');

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      loaded: false,
      blogInfo: [],
      title: '',
      message: '',
      tag: '',
      users: [],
      tags: [],
    };
  }

  async componentDidMount() {

    let tagData = await fetch(`/api/tags`);
    let tagInfo = await tagData.json();

    let res = await fetch('/api/entries');
    let blogInfo = await res.json();
    this.setState({
      loaded: true,
      blogInfo,
      tags: tagInfo
    });

  }

  async handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let newBody = {
      tag: this.state.tag,
      title: this.state.title,
      message: this.state.message

    };
    try {
      let blogData = await fetch(`/api/entries/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBody)

      });
      if (blogData.ok) {
        let blogData = await fetch('/api/entries');
        let blogInfo = await blogData.json();
        this.setState({ blogInfo, title: '', message: '' });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleBlogTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ title: e.target.value });
  }

  handleBlogMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ message: e.target.value });
  }

  render() {
    if (this.state.loaded) {
      return (
        <main className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="nav-alt">
              <div className="navbar-nav ml-auto">
                <Link className="btn btn-primary mx-1" to={`/profile`}>Your Profile</Link>
                <Link className="btn btn-primary mx-1" to={`/addentry`}>Add A Blog</Link>
                <Link className="btn btn-primary mx-1" to={`/donate`}>Donate!</Link>
                <Link className="btn btn-primary mx-1" to={`/login`}>Login/Register</Link>
              </div>
            </div>
          </nav>

          <div className="row">
            {this.state.blogInfo.map(entry => (
              <div className="col-md-4" key={entry.id}>
                <div className="card">
                  <img src="https://i.ibb.co/rG6jhns/starwars.jpg" alt="theme" width="100%" height="auto"></img>
                  <div className="card-body">
                    <h5 className="card-title">{entry.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{moment(entry.created).format("MMM. DD, YYYY")}</h6>
                    <p className="card-text">{entry.name}</p>

                    <Link className="card-link btn btn-primary" to={`/details/${entry.id}`}>View Blog</Link>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      );
    } else {
      return (
        <main className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="nav-alt">
              <div className="navbar-nav ml-auto">
                <Link className="btn btn-primary mx-1" to={`/profile`}>Your Profile</Link>
                <Link className="btn btn-primary mx-1" to={`/addentry`}>Add A Blog</Link>
                <Link className="btn btn-primary mx-1" to={`/donate`}>Donate!</Link>
                <Link className="btn btn-primary mx-1" to={`/login`}>Login/Register</Link>
              </div></div></nav>
        </main>
      );
    }
  }
}

export interface IHomeProps extends RouteComponentProps<{ id: string }> { }

interface blogObject {
  name: string;
  message: string;
  id: number;
  title: string;
  content: string;
  created: string;
  tagid: number;
}

interface IUsers {
  userid: number;
  name: string;
  email: string;
  created_at: Date;
}

interface ITags {
  name: string;
  id: string;
}

export interface IHomeState {
  loaded: boolean;
  blogInfo: blogObject[];
  title: string;
  message: string;
  tag: string;
  users: IUsers[];
  tags: ITags[];
}

export default Home;
