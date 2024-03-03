import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './SignUp.css';


function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();


    const handleNewUser =()=>{
        if(!name || !password || !email || !username){
            alert("please fill all the details");
            return;
        }
        const newUser={
            name: name,
            username:username,
            password:password,
            email:email
        }
        localStorage.setItem('newUser',JSON.stringify(newUser));
        navigate('/login');
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