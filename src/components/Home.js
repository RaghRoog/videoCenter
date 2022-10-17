import { useEffect, useState } from "react"
import HomeSection from "./HomeSection"

export default function Home() {

    let imageRender = () => {
        let container = document.querySelector('.title-section')
        container.style.backgroundImage = `linear-gradient(to bottom, rgba(194, 5, 52, 0.459), 
        rgba(16, 109, 145, 0.459)), url(${'/imgs/home-imgs/the-good.png'})`
        container.style.backgroundPosition = 'center'
    }

    useEffect(() => {
        imageRender()
    }, [])

    let apiKey = '8094b5fa839c8f201f3f76b8a0d0eb0d'
    let [popular, setPopular] = useState([])

    let callPopular = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        const jsonResponse = await response.json();
        console.log(jsonResponse.results);
        return jsonResponse.results
    }

    useEffect(() => {
        callPopular()
         .then(result => setPopular(result));
    }, [])

    return(
        <div className="home">
            <div className="title-section">
                <p>What are you looking for?</p>
                <div className="selector-container">
                    <p className="selector-item">Film</p>
                    <p className="selector-item">TV show</p>
                    <p className="selector-item">Person</p>    
                </div>    
                <div className="search-container">
                    <input type="text" name="search" id="search" placeholder="search..."/>
                    <button>Search</button>
                </div>
            </div> 
            <HomeSection data={popular}/>
        </div>
    )
}