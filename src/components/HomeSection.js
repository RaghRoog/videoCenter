import HomeSectionItem from "./HomeSectionItem"

export default function HomeSection({data, title}) {

    return(
        <div className="home-section">
            <div className="section-title">
                <p>{title}</p>
            </div>
            <div className="section-container">
                {data.map(item => HomeSectionItem(item))}
            </div>
        </div>
    )
}