import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { api, setToken } from '../services/api';
import { redirectForLoginOrStayHere } from '../services/login';
import { Link } from 'react-router-dom';

const Register: React.FC<RegisterProps> = props => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    //use helper function to see if we stay or go
    redirectForLoginOrStayHere().then(decision => {
      if (decision) {
        //decision was true?
        //route back to home!
        props.history.push('/');
      }

    });
  }, []);

  function validate() {
    if (username === "") {
      alert("Please provide your name!");
      return false;
    }
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

  const registerSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validate()) {
      let newBody = {
        username,
        email,
        password
      };
      try {
        let userData = await fetch(`/auth/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newBody)

        });
        let userDataInfo = await userData.json();

        setToken(userDataInfo.token);

        if (userData.ok) {
          localStorage.setItem('userid', userDataInfo.userid);  // Set the USER ID to local storage which we'll need to create a blog post later as the the Blogs.Authorid.
          localStorage.setItem('email', email);
          localStorage.setItem('name', username);

          props.history.push('/profile');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

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
          <input value={username} className="form-control mb-1" onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter your name" required />
          <input value={email} className="form-control mb-1" onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter your email" required />
          <input value={password} className="form-control mb-1" onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter your password" required />
          <button className="btn btn-primary w-100" onClick={registerSignup}>Sign up!</button>
        </form>
      </div>
    </main>
  );
};

interface RegisterProps extends RouteComponentProps { }

export default Register;
