import { Link } from "react-router-dom"

let HomeSectionItem = (data) => {

    let url = `https://image.tmdb.org/t/p/w200${data.poster_path}`

    return(
        <div key={data.id} className="item">
            <Link onClick={()=>{localStorage.setItem('id', data.id)
                  localStorage.setItem('type', 'movie')}} to={`/${data.id}`}>
                <div className="image-container">
                    <img src={url} alt="poster" />
                </div>
                <p className="user-score">{data.vote_average}/10</p>
                <p className="date">{data.release_date}</p>
            </Link>
        </div>
    )
}

export default HomeSectionItem