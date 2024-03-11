import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './SignUp.css';
import {post} from '../../utils/httpClient';


function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();


    const handleNewUser =async()=>{
        if(!name || !password || !email || !username){
            alert("please fill all the details");
            return;
        }
        try {
            // Make a POST request to add a new task
            // const response = await fetch('http://localhost:3002/signup', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(newUser),
            // });

            // const addedUser = await response.json();
            // // localStorage.setItem('newUser',JSON.stringify(newUser));
            // navigate('/login');
            const response = await post('/signup',{ username:username,
                password:password,
                email:email,
                firstname: name
            });
            if(response){
                navigate('/login');
            }
            
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Error adding task. Please try again.');
        }
        
    };


    return (
        <>
        <div className='sign-up-form'>
            <h2>Sign In</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button onClick={handleNewUser}>Sign Up</button>
            <Link to={'/login'}><div className='cancel-button'>Cancel</div></Link>
        </div>
        </>
    );
};

export default SignUp;