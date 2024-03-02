import{Link} from 'react-router-dom'


function MainMenu(){

    const renderTweets=()=>{

    };

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