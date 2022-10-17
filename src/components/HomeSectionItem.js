
let HomeSectionItem = (data) => {
    return(
        <div className="item">
            <div className="image"></div>
            <p className="user-score">12/100</p>
            <p className="title">{data.title}</p>
            <p className="date">{data.release_date}</p>
        </div>
    )
}

export default HomeSectionItem