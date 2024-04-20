import { useParams } from "react-router-dom";


function SearchPage() {
    const {city} = useParams();

  return (
    <div>{city}</div>
  )
}

export default SearchPage