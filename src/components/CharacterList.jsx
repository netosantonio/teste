import {useEffect , useState} from "react";


function NavPage(props){
  return(
    <header className="d-flex justify-content-between align-items-center">
      <p className="text-dark">page:{props.page}</p>
      <button className="btn btn-primary btn-sm"
      onClick={() => props.setPage(props.page + 1)}
      >
        page {props.page + 1}
      </button>

    
    </header>
  )
}

function CharacterList() {
    const [characters, setCharacters]= useState([])
    const [ loading , setLoading ] = useState(true)
    const [ page , setPage ] = useState(1)


    useEffect(() => {
        
       async function fetchData() {
            const response = await fetch( `https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await response.json();
            setLoading(false)
            setCharacters(data.results);
        }
    
     fetchData()
    
    },[page])

    if(loading){
      return(
        <div>Loading</div>
      )
    }

    return <div className="container bg-white">
<NavPage page={page} setPage={setPage} />

      {loading ? (
        <h1>Loading...</h1>
         ) : (
         <div className="row">
        {
        characters.map(character => {
                  return(
                    <div className="col-md-4" key={character.id}>
                    <div className="text-center p-5">
                    <h3 className="text-dark">{character.name}</h3>
                    <img src={character.image} alt={character.name} />
                    <p className="text-dark">{character.origin.name}</p>
                    </div>
                    </div>
                  );
              
              })}
        </div>  

      )}
  </div>

}
export default CharacterList;