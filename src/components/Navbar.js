import { displayContainer, containerDisplayNone } from "../functions/changeContainerDisplay"

export default function Navbar() {



    return(
        <div className="navbar">
            <p className="title">VideoCenter</p>
            <div className="nav-container">
                <div onMouseEnter={()=>displayContainer('films')} 
                     onMouseLeave={()=>containerDisplayNone('films')}  
                     className="nav-item">Movies
                    <div id='films' className="nav-selector-container">
                        <div className="selector-item">Popular</div>
                        <div className="selector-item">Upcoming</div>
                        <div className="selector-item">Top rated</div>
                    </div>
                </div>
                <div onMouseEnter={()=>displayContainer('tv-shows')}
                     onMouseLeave={()=>containerDisplayNone('tv-shows')}
                     className="nav-item">TV shows
                    <div id='tv-shows' className="nav-selector-container">
                        <div className="selector-item">Popular</div>
                        <div className="selector-item">Top rated</div>
                    </div>
                </div>
                <div onMouseEnter={()=>displayContainer('people')} 
                     onMouseLeave={()=>containerDisplayNone('people')}
                     className="nav-item">People
                    <div id='people' className="nav-selector-container">
                        <div className="selector-item">Popular people</div>
                    </div>
                </div>
            </div>
            <div className="account-image"></div>
        </div>
    )
}