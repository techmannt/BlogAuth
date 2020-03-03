import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { api } from '../services/api';
import { redirectForLoginOrStayHere } from '../services/login';
import { useState, useEffect } from 'react';

const Add: React.FC<IAddProps> = props => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<Array<ITags>>([]);

  useEffect(() => {
    async function GetTagData() {
      let tagData = await fetch(`/api/tags`);
      let tagInfo = await tagData.json();
      setTags(tagInfo);
    }

    //use helper function to see if we stay or go
    redirectForLoginOrStayHere().then(decision => {
      if (!decision) {
        //decision was false?
        //route to login!
        props.history.push('/login');
      } else {
        //decision was true?
        //fetch protected data!
        setLoggedIn(true);
      }
    });

    GetTagData();

  }, []);

  async function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      // Send a "POST" request to the "api" function which takes 3 parameters to add "Bearer <token>" to 'Authorization' headers before doing a "POST" fetch on "api/entries".
      let result = await api<{ token: string }>('/api/entries', 'POST', { tag, title, message });
      if (result !== null) {
        props.history.push('/');  // Route back to Home after a blog has been posted to display all blogs.
      }
    } catch (error) {
      console.log(error);
    }
  }

  return <main className="container">{loggedIn ? (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="nav-alt">
          <div className="navbar-nav ml-auto">
            <Link className="btn btn-primary mx-1" to={`/donate`}>Donate!</Link>
            <Link className="btn btn-primary mx-1" to={`/`}>View Blogs</Link>
          </div>
        </div>
      </nav>

      <form className="col-12 form-group p-3 shadow">
        <input className="form-control shadow" type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
        <textarea rows={10} className="form-control shadow" name="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter blog post" />

        <ReactMarkdown source={message} />

        <label>Tag:</label>
        <select
          value={tag}
          onChange={e => setTag(e.target.value)}
          className="form-control">
          <option value="0">Select...</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAdd(e)}>Submit it!</button>
      </form>
    </>
  ) : null
  }</main>;
}

export interface IAddProps extends RouteComponentProps<{ id: string }> { }

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

export interface IAddState {
  loaded: boolean;
  blogInfo: blogObject[];
  title: string;
  message: string;
  tag: string;
  users: IUsers[];
  tags: ITags[];
}

export default Add;
