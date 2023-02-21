let search = async (apiKey, query, page) => {
    const response  = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}&page=${page}`)
    const jsonResponse = await response.json()
    return jsonResponse
}

export default search;