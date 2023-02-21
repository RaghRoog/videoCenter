import { useEffect, useState } from "react"
import HomeSection from "./HomeSection"
import getData from "../functions/getData"
import Navbar from "./Navbar"

export default function Home() {

    let apiKey = process.env.REACT_APP_API_KEY
    let [popular, setPopular] = useState([])
    let [nowPlaying, setNowPlaying] = useState([])
    let [topRated, setTopRated] = useState([])
    let [upcoming, setUpcoming] = useState([])

    useEffect(() => {
        getData(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
        .then(result => setPopular(result));
        getData(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
        .then(result => setNowPlaying(result));
        getData(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
         .then(result => setTopRated(result));
        getData(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
         .then(result => setUpcoming(result));
    }, [])

    return(
        <div className="home">
            <Navbar/>
            <HomeSection data={popular} title={"Popular now"}/>
            <HomeSection data={nowPlaying} title={"Now playing"}/>
            <HomeSection data={topRated} title={"Top rated"}/>
            <HomeSection data={upcoming} title={"Upcoming"}/>
        </div>
    )
}