import React from 'react'
import { useEffect, useState } from 'react'
import search from '../functions/search'
import SearchedItem from './SearchedItem'

export default function SearchPage({}){

    //key
    let apiKey = process.env.REACT_APP_API_KEY

    let [searchData, setSearchData] = useState([])
    let [currentPage, setCurrentPage] = useState(0)
    let [totalPages, setTotalPages] = useState(0)
    let [pages, setPages] = useState([])
    
    useEffect(() => {
        let data = localStorage.getItem('searchData')
        let parsedData = JSON.parse(data)
        setSearchData(parsedData.results)
        setCurrentPage(parsedData.page)
        setTotalPages(parsedData.total_pages)
    }, [])
    
    useEffect(() => {
        let arr = []
        for(let i = 1; i <= totalPages; i++){
            arr.push(i)
        }
        setPages(arr)
    }, [totalPages])
    
    let pageSelector = (pageNumber) => {
        return(
            <button key={pageNumber} style={{border: pageNumber === currentPage ? '2px solid rgb(194, 5, 52)' : '1px solid rgb(16, 108, 145)',
                            display: ((pageNumber > currentPage + 3) && (pageNumber != totalPages)) ||
                            ((currentPage > pageNumber + 2) && (pageNumber != 1)) ? 'none' : 'block'}} 
                    onClick={()=>{
                let query = localStorage.getItem('query')
                search(apiKey, query, pageNumber)
                 .then(result => {
                    setSearchData(result.results)
                    setCurrentPage(result.page)
                    setTotalPages(result.total_pages)
                    window.scroll(0, 0)
                })
            }}>{pageNumber}</button>
        )
    }
    
    return(
        <div className="search-page-container">
            <h1 className='heading'>Search results</h1>
            <div className="search-page">
                <div className="search-items-container">
                    {searchData.map(item => SearchedItem(item))}
                    <div className="page-indicator-container">
                        {pages.map(element => pageSelector(element))}
                    </div>
                </div>
            </div>
        </div>
    )
}