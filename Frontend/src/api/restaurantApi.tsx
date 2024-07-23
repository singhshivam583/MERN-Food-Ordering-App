import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useSearchRestaurants = (city?:string) => {
//     const createSearchRequest = async() => {
//         const response = await fetch(`${API_BASE_URL}/api/restaurant/search/:${city}`,
//             { method: 'GET' }
//         );

//         if(!response.ok){
//             throw new Error('Could not search for restaurants');
//         }
//         return response.json();
//     }

//     const {data:results, isLoading} = useQuery(
//         ["searchRestaurants"],
//         createSearchRequest,
//         { enabled: !!city}  // Only run the query if city has a value
//     )
// }