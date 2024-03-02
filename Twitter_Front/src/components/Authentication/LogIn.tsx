import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';


function LogIn(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    
    const handleLogin = () => {
    // Here you would typically make an API call to validate the username and password
    // For simplicity, I'm just checking if the username is 'admin' and password is 'password'
    if (username === 'admin' && password === 'password') {
      setLoggedIn(true);
      //save user to local storage
      navigate('/'); // Navigate to '/dashboard' route using navigate function
    } else {
      alert('Invalid username or password');
    // navigate('/');
    }
  };
    return(
        <>
             <div>
                <h2>Login</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button onClick={handleLogin}>Log In</button>
                <Link to={'/signup'}><div className='sign-up'>Sign Up</div></Link>
                {loggedIn && <p>Redirecting...</p>}
            </div>
        </>
    )
}

export default LogIn;