
let getSeasonDetails = async (tv_id, season_number, api_key) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}?api_key=${api_key}&language=en-US`)
    const jsonResponse = await response.json()
    return jsonResponse
}

export default getSeasonDetails