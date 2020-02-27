import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
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
        <main className="container py-5">
          <Link className="btn btn-primary" to={`/donate`}>Donate!</Link>
          <div className="row">
            {this.state.blogInfo.map(entry => (
              <div className="col-md-4" key={entry.id}>
                <div className="card">
                  <img src="https://i.ibb.co/rG6jhns/starwars.jpg" alt="theme"></img>
                  <div className="card-body">
                    <h5 className="card-title">{entry.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{moment(entry.created).format("MMM. DD, YYYY")}</h6>
                    <p className="card-text">{entry.name}</p>

                    <Link className="card-link btn btn-primary" to={`/details/${entry.id}`}>View Blog</Link>

                  </div>
                </div>
              </div>
            ))}

            <form className="col-12 form-group p-3 shadow">
              <input className="form-control shadow" type="text" name="title" value={this.state.title} onChange={(event) => this.handleBlogTitleChange(event)} placeholder="Enter title" />
              <textarea rows={10} className="form-control shadow" name="message" value={this.state.message} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => this.handleBlogMessageChange(event)} placeholder="Enter blog post" />

              <ReactMarkdown source={this.state.message} />

              <label>Tag:</label>
              <select
                value={this.state.tag}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ tag: e.target.value })}
                className="form-control">
                <option value="0">Select...</option>
                {this.state.tags.map(tag => (
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
              </select>

              <button className="btn btn-primary" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleAdd(e)}>Submit it!</button>
            </form>
          </div>
        </main>
      );
    } else {
      return <h6>Please wait!</h6>;
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
