import React, { useState } from 'react'
import SearchMovie from './SearchMovie'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate()
    const [searchMovie, setSearchMovie] = useState("")
    const [isUserSearching, setIsUserSearching] = useState<boolean>(false)
    const handleSearchInput = (query: string) => {
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
        <div className="container">
            <div className="row">
                <div className="col-12 pt-4">
                    <div className="searchInput">
                        <input className='p-2 w-100 border border-info' type="text" value={searchMovie} onChange={(e) => { handleSearchInput(e.target.value) }} placeholder='search movie...' />
                    </div>
                    <SearchMovie query={searchMovie} />
                </div>
            </div>
        </div>
    )
}
