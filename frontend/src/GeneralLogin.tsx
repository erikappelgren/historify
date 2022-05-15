interface Props {
    loginRoute: string
}

const GeneralLogin = ({loginRoute}: Props) => {
    // const backendLoginRoute = 'http://localhost:5005/login'
    
    return(
        <div className="PersonalLoginBoxCapsule" id="GeneralBox">
        <div className="GeneralLoginBox">
            <a href={loginRoute} className="PersonalLoginLink">
                <div className="PersonalLoginTextCapsule"> 
                 <img className="PersonaolLoginSpotifyIcon" src="https://upload.wikimedia.org/wikipedia/commons/7/71/Spotify.png"></img>
                </div>
                    LOG IN TO SPOTIFY HERE 
                <div className="PersonalLoginArrowIcon">&#129130;</div>
            </a>
        </div>
        </div>
    );
}

export default GeneralLogin;