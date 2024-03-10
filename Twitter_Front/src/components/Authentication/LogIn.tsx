import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './LogIn.css'
import {post} from '../../utils/httpClient'


function LogIn(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    // const [users,setUsers] = useState([
    //   {
    //     name: "Farhan",
    //     username: "farhan1",
    //     email: "farhan@gamil.com",
    //     password: "test1234"
    // },
    // {
    //     name: "sahand",
    //     username: "sahand2",
    //     email: "sahand@example.com",
    //     password: "password123"
    // },
    // {
    //     name: "shadan",
    //     username: "shirzadi",
    //     email: "shadan@example.com",
    //     password: "test23"
    // }
    // ]);
    const navigate = useNavigate();
    
    
    // useEffect(()=>{
    //   try {
    //     const newUser = localStorage.getItem('newUser');
    //     if (newUser) {
    //       const parsedUser = JSON.parse(newUser);
    //       const newValue =[parsedUser, ...users];
    //       setUsers(newValue);
    //       localStorage.removeItem('newUser');
    //     }
    //   } catch (error) {
    //     console.error('Error parsing user data:', error);
    //   }
    // }); 


    const handleLogin = async () => {
    try{
        const response = await post('/login',{
            username:username,
            password:password
        });
        console.log(response);
        if (response) {
            const loggedInUser = response; // Assuming the response includes user details
            setLoggedIn(true);
            console.log(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            navigate('/');
        } 

    }catch(error){
        console.error('Error occurred during login:', error);
        alert('An error occurred during login');
    }
  };
  
  
    return(
        <>
             <div className='login'>
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