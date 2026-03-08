import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard"
import "../css/Home.css"
import { getPopularMovies, searchMovies } from "../services/api";
function Home(){
    const [searchQuery, setSearchQuery] = useState("");
   const[movies,setMovies] = useState([]);
   const[error,setError] = useState(null);
   const[loading,setLoading] = useState(true);

   useEffect(() =>
{
    const loadPopularMovies = async () => {
        try{
            const popularMovies = await getPopularMovies()
            setMovies(popularMovies)
        }
        catch(err){
            setError("Failed to load Movies..")

        }
        finally{
            setLoading(false)
        }
    }
    loadPopularMovies()
},[])

   // const movies = getPopularMovies()

const handleSearch = async (e) => {
    e.preventDefault()
    if(!searchQuery.trim()) return
    if(loading) return
    setLoading(true)
    try{
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    }
    catch(err){
        setError("Failed to load content..")
    }
    finally{
        setLoading(false)
    }
    
};

    return <div className="home">
        <form  onSubmit={handleSearch} className="search-form">
            <input type = "text" placeholder="Search for movies.." className="search-imput"
             value = {searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             />
            <button type = "submit" className="search-button">Search</button>
        </form>
        <div className="movies-grid">
            {movies.map((movie) => 
            
                <MovieCard movie = {movie} key = {movie.id} />
            )}
        </div>
    </div>
}

export default Home;