import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import getDetails from "../functions/getDetails"
import CastAndCrewItem from "./CastAndCrewItem"
import PesronDetails from "./PersonDetails"

export default function DetailsPage() {
    let [data, setData] = useState([])
    let [poster, setPoster] = useState()
    let [time, setTime] = useState({})
    let [genre, setGenre] = useState()
    let [director, setDirector] = useState('')
    let [writing, setWriting] = useState([])
    let [createdBy, setCreatedBy] = useState([])
    let [cast, setCast] = useState([])
    let [crew, setCrew] = useState([])
    let [seasons, setSeasons] = useState([])
    let [tvId, setTvId] = useState()
    let apiKey = process.env.REACT_APP_API_KEY
    let mediaType = localStorage.getItem('type')

    function minutesToHours(data) {
        let hours = data / 60
        hours = Math.floor(hours)
        let minutes = data - hours * 60
        let time = {
            hours,
            minutes
        }
        return time;
    }

    let getCrew = async (id) => {
        const data = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${apiKey}&language=en-US`)
        const jsonResponse = await data.json()
        setCast(jsonResponse.cast)
        setCrew(jsonResponse.crew)
        for(let i = 0; i < jsonResponse.crew.length; i++){
            switch(jsonResponse.crew[i].job){
                case "Director":
                    setDirector(jsonResponse.crew[i].name)
                    break;
                case "Novel":
                    setWriting(prev => [...prev, {job:jsonResponse.crew[i].job, name:jsonResponse.crew[i].name}])
                    break;
                case "Writer":
                    setWriting(prev => [...prev, {job:jsonResponse.crew[i].job, name:jsonResponse.crew[i].name}])
                    break;
                case "Story":
                    setWriting(prev => [...prev, {job:jsonResponse.crew[i].job, name:jsonResponse.crew[i].name}])
                    break;
                case "Screenplay":
                    setWriting(prev => [...prev, {job:jsonResponse.crew[i].job, name:jsonResponse.crew[i].name}])
                    break;
            }
        }
    }

    useEffect(() => {
        switch(mediaType){
            case 'movie':
                getDetails('movie', localStorage.getItem('id'), apiKey)
                .then(result => {
                   setData(result)
                   setPoster(`https://image.tmdb.org/t/p/w500${result.poster_path}`)
                   setTime(minutesToHours(result.runtime))
                   setGenre(result.genres[0].name)
                   getCrew(result.id)
                })
                break;
            case 'tv':
                getDetails('tv', localStorage.getItem('id'), apiKey)
                .then(result => {
                    setData(result)
                    setPoster(`https://image.tmdb.org/t/p/w500${result.poster_path}`)
                    setGenre(result.genres[0].name)
                    getCrew(result.id)
                    setSeasons(result.seasons)
                    setTvId(result.id)
                    for(let i = 0; i < result.created_by.length; i++){
                        setCreatedBy(prev => [...prev, {job:'Created by', name:result.created_by[i].name}])
                    }
                })
                break;
        }
        
    }, [])

    return(
        <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`}}
            className="details-page">
            <div className="container">
                <div className="poster">
                    <img src={poster} alt="poster"/>
                </div>
                <div className="right">
                    <p className="title">{mediaType == 'movie' ? data.title : data.name}</p>
                    <div className="info">
                        <p className="genre">{genre}</p>
                        <p>&#9679;</p>
                        <p className="date">{mediaType == 'movie' ? 
                        data.release_date : "First episode: " + data.first_air_date}</p>
                        <p>&#9679;</p>
                        {mediaType == 'movie' ? 
                        <p className="time">{time.hours}h {time.minutes}m</p>
                        : "Status: " + data.status}
                    </div>
                    <div className="bottom">
                        {director != '' ? 
                        <div>
                            <p>{director}</p>
                            <p>Director</p>
                        </div> : null}
                        {mediaType == 'movie' ?
                        writing.slice(0, writing.length/2).map(item => {return(
                            <div>
                                <p>{item.name}</p>
                                <p>{item.job}</p>
                            </div>
                        )}) : createdBy.slice(0, createdBy.length/2).map(item => {return(
                            <div>
                                <p>{item.name}</p>
                                <p>{item.job}</p>
                            </div>
                        )})
                        }
                    </div>
                </div>
            </div>
            <div className="overview">
                <p>Overview:</p>
                <p>{data.overview}</p>
            </div>
            {mediaType == 'tv' ?
                <div className="episodes-info">
                    <p>Status:</p>
                    <p>{data.status}</p>
                    <p>First episode: {data.first_air_date}</p>
                    <p>Last episode: {data.last_air_date}</p>
                    <p>Number of seasons: {data.number_of_seasons}</p>
                    <p>Number of episodes: {data.number_of_episodes}</p>
                </div> : null
            }
            <div className="cast-crew">
                <p>Cast:</p>
                <div className="cast-crew-container">
                    {cast.map(item => {return <CastAndCrewItem item={item}/>})}
                </div>
            </div>
            <div className="cast-crew">
                <p>Crew:</p>
                <div className="cast-crew-container">
                    {crew.map(item => {return <CastAndCrewItem item={item}/>})}
                </div>
            </div>
            {mediaType == 'tv' ?
            <div className="seasons">
                <p className="section-title">Seasons:</p>
                <div className="seasons-container">
                    {seasons.map(item => 
                    <Link to={`/tv/${item.id}`}>
                        <div onClick={()=>localStorage.setItem('seasonNumber', item.season_number)} 
                        className="seasons-item" key={item.id}>
                            <p>{item.name}</p>
                            <div>
                                <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt="season" />
                            </div>
                            <p>Air date: {item.air_date}</p>
                            <p>Episodes: {item.episode_count}</p>
                        </div>
                    </Link>)}
                </div>
            </div> : null
            }
        </div>
    )
}