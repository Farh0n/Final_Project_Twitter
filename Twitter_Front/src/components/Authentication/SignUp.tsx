import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';


function signup() {
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
        //add the user to the arrays
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
            <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
            <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} required />
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>

            <button onClick={handleNewUser}>Sign Up</button>
            <Link to={'/login'}><div className='cancel-button'>Cancel</div></Link>
        </>
    );
};

export default signup;