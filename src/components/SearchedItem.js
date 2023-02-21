import { Link } from "react-router-dom"

export default function SearchedItem(data) {

    let mediaType = data.media_type
    
    function getImage(data) {
        if (data.poster_path === null || data.profile_path === null){
            return '/imgs/placeholder.png'
        }else if (mediaType == 'person'){
            let url = `https://image.tmdb.org/t/p/w200${data.profile_path}`
            return url
        }else if (mediaType == 'movie' || mediaType == 'tv'){
            let url = `https://image.tmdb.org/t/p/w200${data.poster_path}`
            return url
        }
    }


    let url = getImage(data)

    return(
        <Link key={data.id} className="searched-item" 
        onClick={()=>{
                {mediaType === 'person' ? localStorage.setItem('personId', data.id) : 
                localStorage.setItem('id', data.id)}
                localStorage.setItem('type', mediaType)}} to={mediaType != 'person' ? `/${data.id}` : `/person/${data.id}`}>
            <div>
                <div className="image-container">
                    <img src={url} alt="searched item image" />
                </div>
                <div className="searched-item-info">
                    <p className="name">{
                        mediaType == 'movie'
                        ? data.title
                        : data.name
                    }</p>
                    <p className="type">{
                        (() => {
                            if(mediaType == 'movie'){
                                return `Movie`
                            }else if(mediaType == 'tv'){
                                return `TV Series`
                            }else{
                                return `Person`
                            }
                        })()
                    }</p>
                    <p className="date">{
                        (() => {
                            if(mediaType == 'movie'){
                                return `Release date: ${data.release_date}`
                            }else if(mediaType == 'tv'){
                                return `First episode: ${data.first_air_date}`
                            }else{
                                return null
                            }
                        })()
                    }</p>
                </div>
            </div>
        </Link>
    )
}