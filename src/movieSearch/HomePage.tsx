import React, { useState } from 'react'
import SearchMovie from './SearchMovie'
import PopularMovieList from './PopularMovieList'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate()
    const [searchMovie, setSearchMovie] = useState("")
    const [isUserSearching, setIsUserSearching] = useState<boolean>(false)
    const handleSearchInput = (query: string) => {
        console.log(query, "query")
        setSearchMovie(query)
        if (query.trim() === "") {
            setIsUserSearching(false)
            if (isUserSearching === true) {
                navigate(`?page=1`)
            }
        }
        else {
            setIsUserSearching(true)
            if (isUserSearching === false) {
                navigate(`?page=1`)
            }
        }
    }
    return (
        <div>
            <div className="searchInput">
                <input type="text" value={searchMovie} onChange={(e) => { handleSearchInput(e.target.value) }} />
            </div>
            {isUserSearching ? <SearchMovie query={searchMovie} /> :
                <PopularMovieList />}
        </div>
    )
}
