import { useEffect,useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import GroceryCard from "../component/GroceryCardComponent/GroceryCard";


export default function Home() {
    const [loading, setLoading] = useState(true);
    const [allGroceries, setGroceries] = useState([])
        async function fetchGroceries(){
            try {
                const response = await axios(
                    {
                        method: "GET",
                        url: import.meta.env.VITE_API_BASE_URL + "/groceries",
                        headers: {
                            Authorization: `Bearer ${localStorage.access_token}`,
                        },
                    }
                );
                console.log(response.data);
                setGroceries(response.data)
                setLoading(false);
            } catch (error) {
                setLoading(false);
                const errMsg = error.response.data.message
                Swal.fire({
                    title: 'Error',
                    text: errMsg,
                    icon: 'error',
                });
            }
    }
    useEffect(() => {
        fetchGroceries();
    }, []);
    return (
        <div className="container mt-4">
            {loading ? (
                <h1>Loading...</h1>

            ) : (
            <div className="row">
                <GroceryCard allGroceries={allGroceries} fetchGroceries={fetchGroceries} />
            </div>              
            )}
        </div>
    )
}