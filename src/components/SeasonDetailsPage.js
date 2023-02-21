import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import getSeasonDetails from "../functions/getSeasonDetails"

export default function SeasonDetailsPage(){
    let apiKey = process.env.REACT_APP_API_KEY
    let tvId = localStorage.getItem('id')
    let seasonNumber = localStorage.getItem('seasonNumber')
    let [detailsData, setDetailsData] = useState([])
    let [episodes, setEpisodes] = useState([])
    useEffect(() => {
        getSeasonDetails(tvId, seasonNumber, apiKey)
         .then(result => {
            setDetailsData(result)
            for(let i = 0; i < result.episodes.length; i++){
                setEpisodes(prev => [...prev, result.episodes[i]])
            }
         })
    }, [])

    function getImage(data){
        if(data.profile_path === null){
            return `/imgs/placeholder.png`
        }else{
            return `https://image.tmdb.org/t/p/original${data.profile_path}`
        }
    }

    function clickHandler(target, id){
        let item = document.getElementById(`${target}-${id}`)
        if(item.style.display === 'flex'){
            item.style.display = 'none'
        }else{
            item.style.display = 'flex'
        }
    }

    return(
        <div className="season-details">
            <p className="season-name">{detailsData.name}</p>
            <div className="poster">
                <img src={`https://image.tmdb.org/t/p/original${detailsData.poster_path}`} alt="season poster" />
            </div>
            <p className="air-date">First episode: {detailsData.air_date}</p>
            <p className="overview">{detailsData.overview}</p>
            {episodes.slice(0, episodes.length/2).map(item => {return <div className="episode" key={item.id}>
                <p className="name">{item.episode_number}. {item.name}</p>
                <div className="episode-img">
                    <img src={`https://image.tmdb.org/t/p/w200${item.still_path}`} alt="episode image" />
                </div>
                <p>Air date: {item.air_date}</p>
                <p className="section">Overview:</p>
                <p>{item.overview}</p>
                <p className="section">Vote average: <span>{item.vote_average}</span></p>
                <p onClick={() => clickHandler('crew', item.id)} className="section">Crew: <span>(click)</span></p>
                <div id={`crew-${item.id}`} className="container">
                    {item.crew.map(crewItem => {return <Link to={`/person/${crewItem.id}`}><div onClick={() => {
                        localStorage.setItem('personId', crewItem.id)
                    }} key={crewItem.credit_id}>
                        <div className="image">
                            <img src={getImage(crewItem)} alt="crew" />
                        </div>
                        <p>{crewItem.name}</p>
                        <p>{crewItem.job}</p>
                    </div></Link>})}
                </div>
                <p onClick={() => clickHandler('guest', item.id)} className="section">Guest stars: <span>(click)</span></p>
                <div id={`guest-${item.id}`} className="container">
                    {item.guest_stars.map(guestStar => {return <Link to={`/person/${guestStar.id}`}><div onClick={() => {
                        localStorage.setItem('personId', guestStar.id)
                    }} key={guestStar.credit_id}>
                        <div className="image">
                            <img src={getImage(guestStar)} alt="guest star" />
                        </div>
                        <p>{guestStar.character}</p>
                        <p>{guestStar.name}</p>
                    </div></Link>})}
                </div>
            </div>})}
        </div>
    )
}