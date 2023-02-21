import { Link } from "react-router-dom"
export default function CastAndCrewItem({item}){
let url = getImage(item)
function getImage(data) {
    if (data.profile_path === null){
        return '/imgs/placeholder.png'
    }else{
        let url = `https://image.tmdb.org/t/p/w200${item.profile_path}`
        return url
    }
}

    return(
        <Link onClick={()=>{
            localStorage.setItem('personId', item.id)
            }} to={`/person/${item.id}`} className='cast-crew-link' key={item.id}>
            <div className="cast-crew-item">
                <div className="image">
                    <img src={url} alt="image" />
                </div>
                <p className="name">{item.name}</p>
                <p>{item.known_for_department == "Acting" ? item.character : item.job}</p>
            </div>
        </Link>
    )
}