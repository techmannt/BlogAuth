import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactMarkdown from 'react-markdown';

class Edit extends React.Component<IEditProps, IEditState> {
  constructor(props: IEditProps) {
    super(props);
    this.state = {
      title: '',
      tag: '',
      content: '',
      blogId: "0",
      tags: [],
    };
  }

  async componentDidMount() {
    try {
      let blogData = await fetch(`/api/entries/${this.props.match.params.id}`);
      let blogInfo = await blogData.json();

      this.setState({
        title: blogInfo.title,
        content: blogInfo.content,
        blogId: blogInfo.id
      });
    } catch (error) {
      console.log(error);
    }
  }

  async handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let editedBody = {
      title: this.state.title,
      content: this.state.content,
      blogId: this.state.blogId
    };
    try {
      let blogData = await fetch(`/api/entries/${this.props.match.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedBody)
      });
      if (blogData.ok) {
        this.props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let res = await fetch(`/api/entries/${this.props.match.params.id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <main className="container">
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
  tags: ITags[]
}

export default Edit;
