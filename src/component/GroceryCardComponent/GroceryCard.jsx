import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import CurrencyFormat from "../CurrencyFormatComponent/CurrencyFormat";


export default function GroceryCard({ allGroceries, fetchGroceries }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function Update(id) {
        navigate(`/update-grocery/${id}`);
    }
    async function Delete(id) {
        try {
            setLoading(true);
            const response = await axios({
                method: "DELETE",
                url: import.meta.env.VITE_API_BASE_URL + "/groceries/" + id,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success'
            });
            fetchGroceries();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
            const errMsg = error.response.data.message
            Swal.fire({
                title: 'Error',
                text: errMsg,
                icon: 'error',
            })
        }
    }
    return (
        <>
            {allGroceries.map((grocery) => (
                <div className="card" style={{ width: "18rem" }} key={grocery.id}>
                    <div className="card-body">
                        <img
                            src={grocery.imageUrl}
                            className="card-img-top"
                            width="200"
                            height="200"
                        />
                        <div className="card-body" width="auto">
                            <p className="card-text">{grocery.title}</p>
                            <p className="card-text"><CurrencyFormat value={grocery.price} /></p>
                            <p className="card-text" style={{ background: 'orange', padding: '5px 10px',width:'fit-content'}} >{grocery.tag}</p>
                            <button type="button" className="bg-danger border" onClick={()=>Delete(grocery.id)} style={{ width: '95px', padding: '5px 10px',color:'white' }} disabled={loading} >{loading ? 'Loading...' : 'Delete'}
                            </button>
                            <button type="button" className="bg-light border" onClick={() =>Update(grocery.id)} style={{ width: '95px', padding: '5px 10px' }} >
                                <span className="text-dark">
                                    Edit
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
