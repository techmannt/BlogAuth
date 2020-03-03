import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { api, setToken } from '../services/api';
import { redirectForLoginOrStayHere } from '../services/login';
import { Link } from 'react-router-dom';

const Profile: React.FC<ProfileProps> = props => {
  const [username, setUsername] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    //use helper function to see if we stay or go
    redirectForLoginOrStayHere().then(decision => {

      if (!decision) {
        //decision was false?
        //route to login!
        props.history.push('/login');
      } else {
        //decision was true?
        //fetch protected data!
        localStorage.getItem(name);
        setUsername(localStorage.getItem('name'));
        setLoggedIn(true);
      }

    });
  }, []);

  return (

    <main className="container">
      {loggedIn ? (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="collapse navbar-collapse" id="nav-alt">
              <div className="navbar-nav ml-auto">
                <Link className="btn btn-primary mx-1" to={`/donate`}>Donate!</Link>
                <Link className="btn btn-primary mx-1" to={`/`}>View Blogs</Link>
              </div>
            </div>
          </nav>

          <div className="card shadow m-1 p-1">
            <div className="card-body">
              <div className="card-header bg-warning text-white text-center">
                <h1>Welcome, {username}</h1>
              </div>
              <div>
                <p></p>
              </div>
              <div>
                <p>
                  <Link className="btn btn-primary mx-auto btn-block" to={`/addentry`}>Compose a new blog</Link>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </main>

  );
}

interface ProfileProps extends RouteComponentProps { }

export default Profile;
