import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { api, setToken } from '../services/api';
import { redirectForLoginOrStayHere } from '../services/login';
import { Link } from 'react-router-dom';

const Login: React.FC<LoginProps> = props => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    redirectForLoginOrStayHere().then(decision => {
      if (decision) {
        //decision was true?
        //route back to home!
        props.history.push('/');
      }
      //otherwise just stay here to login :P
    });
  }, []);

  function validate() {
    if (email === "") {
      alert("Please provide your email!");
      return false;
    }
    if (password === "") {
      alert("Please provide a password");
      return false;
    }
    return (true);
  }

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate()) {
      let result = await api<{ token: string }>('/auth/login', 'POST', { email, password });
      if (result?.token) {
        setToken(result.token);

        localStorage.setItem('email', email);  // Set the email to Local Storage so that it can be retrieved from the Add component because we'll need to query the Authors table to get the ID so that we can THEN do an UPDATE on the Blogs table WHERE ID = AuthorID!!!

        props.history.push('/');
      } else {
        setError(true);  // Set the error so that "invalid login" can be displayed.
      }
    }
  };

  return (
    <main className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="nav-alt">
          <div className="navbar-nav ml-auto">
            <Link className="btn btn-primary mx-1" to={`/donate`}>Donate!</Link>
            <Link className="btn btn-primary mx-1" to={`/`}>View Blogs</Link>
          </div>
        </div>
      </nav>

      <div className="row justify-content-center my-2">
        <form action="" className="form-group p-3 shadow border">
          <input value={email} className="form-control mb-1" onChange={e => setEmail(e.target.value)} type="email" required placeholder="Enter your email" />
          <input value={password} className="form-control mb-1" onChange={e => setPassword(e.target.value)} type="password" required placeholder="Enter your password" />
          <div className="d-flex mt-3 justify-content-between">
            <button className="btn btn-primary" onClick={handleLogin}>Login!</button>
            <button><Link className="btn btn-primary" to={`/register`}>Register</Link></button>
          </div>
          {error ? <small>Invalid Login!!!!!</small> : null}
        </form>
      </div>
    </main>
  );
};

interface LoginProps extends RouteComponentProps { }

export default Login;
