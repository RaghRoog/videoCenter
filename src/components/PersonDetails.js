import getDetails from "../functions/getDetails"
import getCredits from "../functions/getCredits"
import { useEffect } from "react"
import { useState } from "react"

export default function PesronDetails(){
    let apiKey = process.env.REACT_APP_API_KEY

    let [data, setData] = useState([])
    function personBio(className) {
        if(document.querySelector(`.${className}`).hasAttribute('id')){
            document.querySelector(`.${className}`).removeAttribute('id')
        }else{
            document.querySelector(`.${className}`).setAttribute('id', 'bio-overflow')
        }
    }

    let [movieCredits, setMovieCredits] = useState([])
    let [tvCredits, setTvCredits] = useState([])
    let [movieCreditsCast, setMovieCreditsCast] = useState([])
    let [movieCreditsCrew, setMovieCreditsCrew] = useState([])
    let [tvCreditsCast, setTvCreditsCast] = useState([])
    let [tvCreditsCrew, setTvCreditsCrew] = useState([])
    useEffect(() => {
        getDetails('person', localStorage.getItem('personId'), apiKey)
         .then(result => {
         setData(result)
         })
        getCredits(apiKey, 'movie', localStorage.getItem('personId'))
         .then(result => {
            setMovieCredits(result)
            setMovieCreditsCast(result.cast)
            setMovieCreditsCrew(result.crew)
         })
          getCredits(apiKey, 'tv', localStorage.getItem('personId'))
          .then(result => {
             setTvCredits(result)
             setTvCreditsCast(result.cast)
             setTvCreditsCrew(result.crew)
          })
    }, [])

    return(
        <div className="person-details">
            <p className="name">{data.name}</p>
            <div className="image">
                <img src={`https://image.tmdb.org/t/p/w200${data.profile_path}`} alt={`${data.name} picture`} />
            </div>
            {data.birthday == null ? null : <p className="info">Birth date: {data.birthday}</p>}
            {data.deathday == null ? null : <p className="info">Death date: {data.deathday}</p>}
            <p onClick={() => personBio('bio')} id="bio-overflow" className="bio">{data.biography}</p>
            {movieCredits.length === 0 ? null : <p className="section">Movies</p>}
            {movieCreditsCast.length === 0 ? null  : <p className="subsection">Cast</p>}
            <div className="container">
                {movieCreditsCast.map(item => <div key={item.credit_id} className="item">
                    <div>
                        <img src={item.poster_path != null ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 
                        '/imgs/placeholder.png'} alt="poster" />
                    </div>
                    <p className="title">{item.title}</p>
                    <p>{item.character}</p>
                    <p>{item.release_date}</p>
                </div>
                )}
            </div>
            {movieCreditsCrew.length === 0 ? null : <p className="subsection">Crew</p>}
            <div className="container">
                {movieCreditsCrew.map(item => <div key={item.credit_id} className="item">
                    <div>
                        <img src={item.poster_path != null ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 
                        '/imgs/placeholder.png'} alt="poster" />
                    </div>
                    <p className="title">{item.title}</p>
                    <p>{item.job}</p>
                    <p>{item.release_date}</p>
                </div>
                )}
            </div>
            {tvCredits.length === 0 ? null : <p className="section">TV series</p>}
            {tvCreditsCast.length === 0 ? null : <p className="subsection">Cast</p>}
            <div className="container">
                {tvCreditsCast.map(item => <div key={item.credit_id} className="item">
                    <div>
                        <img src={item.poster_path != null ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 
                        '/imgs/placeholder.png'} alt="poster" />
                    </div>
                    <p className="title">{item.name}</p>
                    <p>{item.character}</p>
                    <p>{item.first_air_date}</p>
                </div>
                )}
            </div>
            {tvCreditsCrew.length === 0 ? null : <p className="subsection">Crew</p>}
            <div className="container">
                {tvCreditsCrew.map(item => <div key={item.credit_id} className="item">
                    <div>
                        <img src={item.poster_path != null ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 
                        '/imgs/placeholder.png'} alt="poster" />
                    </div>
                    <p className="title">{item.name}</p>
                    <p>{item.job}</p>
                    <p>{item.first_air_date}</p>
                </div>
                )}
            </div>
        </div>
    )
}