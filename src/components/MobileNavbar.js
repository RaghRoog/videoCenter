import { useEffect, useState } from "react"

export default function MobileNavbar() {

    let [filmsClicked, setFilmsClicked] = useState(false)
    let [TvClicked, setTvClicked] = useState(false)
    let [peopleClicked, setPeopleClicked] = useState(false)

    let openMobileContainer = (isClicked, changeClicked, id) => {
        let container = document.getElementById(`${id}`)
        let containers = document.querySelectorAll('.nav-selector-container-mobile')
        if(!isClicked){
            containers.forEach((item) => item.style.display = 'none')
            container.style.display = 'block'
            setFilmsClicked(false)
            setTvClicked(false)
            setPeopleClicked(false)
            changeClicked(true)
        }else{
            container.style.display = 'none'
            changeClicked(false)
        }
    }

    return(
        <div className="mobile-navbar">
            <p className="title">VideoCenter</p>
            <div className="nav-container">
                <div onClick={() => openMobileContainer(filmsClicked, setFilmsClicked, 'films-mobile')} className="nav-item">Movies
                    <div id='films-mobile' className="nav-selector-container-mobile">
                        <div className="selector-item">Popular</div>
                        <div className="selector-item">Upcoming</div>
                        <div className="selector-item">Top rated</div>
                    </div>
                </div>
                <div onClick={() => openMobileContainer(TvClicked, setTvClicked, 'tv-shows-mobile')} className="nav-item">TV shows
                    <div id='tv-shows-mobile' className="nav-selector-container-mobile">
                        <div className="selector-item">Popular</div>
                        <div className="selector-item">Top rated</div>
                    </div>
                </div>
                <div onClick={() => openMobileContainer(peopleClicked, setPeopleClicked, 'people-mobile')} className="nav-item">People
                    <div id='people-mobile' className="nav-selector-container-mobile">
                        <div className="selector-item">Popular people</div>
                    </div>
                </div>
                <div className="nav-item">Account</div>
            </div>
        </div>
    )
}