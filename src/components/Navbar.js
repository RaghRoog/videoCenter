import { displayContainer, containerDisplayNone } from "../functions/changeContainerDisplay"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import search from "../functions/search"

export default function Navbar() {

    let apiKey = process.env.REACT_APP_API_KEY
    let navigate = useNavigate()
    let [searchInput, setSearchInput] = useState('')
    let handleSearch = () => {
        if(searchInput.length > 0){
            localStorage.setItem('query', searchInput)
            search(apiKey, searchInput, 1)
             .then(result => {
                localStorage.setItem('searchData', JSON.stringify(result))
                navigate('/search')
            })
        }
    }

    return(
        <div className="navbar">
            <p className="title">VideoCenter</p>
            <div className="search-container">
                <input onChange={(event) => setSearchInput(event.target.value)} 
                        type="text" name="search" 
                        id="search" placeholder="search..."/>
                <button onClick={()=>handleSearch()}>Search</button>
            </div>
        </div>
    )
}