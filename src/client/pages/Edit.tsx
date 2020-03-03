import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { api } from '../services/api';
import { redirectForLoginOrStayHere } from '../services/login';
import { Link } from 'react-router-dom';

class Edit extends React.Component<IEditProps, IEditState> {
  constructor(props: IEditProps) {
    super(props);
    this.state = {
      title: '',
      tag: '',
      content: '',
      blogId: "0",
      tags: [],
      authorId: "0",
      email: ''
    };
  }

  componentDidMount() {
    redirectForLoginOrStayHere().then(async decision => {
      if (!decision) {
        //decision was false?
        //route to login!
        this.props.history.push('/login');
      } else {
        //decision was true?
        //fetch protected data!
        try {
          let blogData = await fetch(`/api/entries/${this.props.match.params.id}`);
          let blogInfo = await blogData.json();

          this.setState({
            title: blogInfo.title,
            content: blogInfo.content,
            blogId: blogInfo.id,
            authorId: blogInfo.authorid
          });

          if (Number(this.state.authorId) !== Number(localStorage.getItem('userid')) &&
            (this.state.email !== localStorage.getItem('email'))) {
            this.props.history.push("/");  // If the blog's author ID != current user ID, then go back to the previous page!
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  async handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let loggedInId: string = localStorage.getItem('userid');

    if (Number(this.state.authorId) === Number(loggedInId)) {
      let editedBody = {
        title: this.state.title,
        content: this.state.content,
        blogId: this.state.blogId
      };
      try {
        let result = await api<{ token: string }>(`/api/entries/${this.props.match.params.id}`, 'PUT', editedBody);
        if (result !== null) {
          this.props.history.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let loggedInId: string = localStorage.getItem('userid');

    if (Number(this.state.authorId) === Number(loggedInId)) {
      let result = await api<{ token: string }>(`/api/entries/${this.props.match.params.id}`, 'DELETE');
      if (result !== null) {
        this.props.history.push('/');
      }
    }
  }

  render() {
    return (
      <main className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="collapse navbar-collapse" id="nav-alt">
            <div className="navbar-nav ml-auto">
              <Link className="btn btn-primary mx-1" to={`/`}>View Blogs</Link>
              <Link className="btn btn-primary mx-1" to={`/profile`}>Your Profile</Link>
              <Link className="btn btn-primary mx-1" to={`/addentry`}>Add A Blog</Link>
              <Link className="btn btn-primary mx-1" to={`/donate`}>Donate!</Link>
            </div>
          </div>
        </nav>

        <section className="row justify-content-center my-2">
          <div className="col-md-8">
            <form className="form-group p-3 shadow border">
              <label>Title:</label>
              <input type="text" className="form-control" name="title" value={this.state.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })} />

              <label>Message:</label>
              <textarea rows={10} className="form-control" name="content" value={this.state.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })} />

              <ReactMarkdown source={this.state.content} />

              <div className="d-flex mt-3 justify-content-between">
                <button className="btn btn-primary shadow" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleEdit(e)}>Save Edit</button>
                <button className="btn btn-danger shadow" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleDelete(e)}>DELETE!</button>
              </div>
            </form>

          </div>
        </section>
      </main>
    )
  }
}

interface IEditProps extends RouteComponentProps<{ id: string }> { }

interface ITags {
  name: string;
  id: string;
}

interface IEditState {
  title: string,
  tag: string,
  content: string,
  blogId: string,
  tags: ITags[],
  authorId: string,
  email: string
}

export default Edit;
