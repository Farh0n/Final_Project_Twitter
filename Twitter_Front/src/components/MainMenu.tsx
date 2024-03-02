import{Link,useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


function MainMenu(){

    const navigate = useNavigate();
    const renderTweets=()=>{

    };

    useEffect(() => {
        // Check if the user is logged in
        if (!localStorage.getItem("user")) {
            // If not logged in, redirect to the login page
            navigate('/login');
        }
    }, []);
    

    return(
        <>
            <div className='container'>    
                <div className='header'>
                    <Link to={'/profile'}><div className='profile'> Hi User</div></Link>
                    <Link to={'/tweet'}><div className='new tweet'>New Tweet</div></Link>
                </div>

                <div className='tweets'>

                </div>
            </div>

        </>
    )
}
export default MainMenu;