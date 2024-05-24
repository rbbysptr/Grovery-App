import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate,useParams } from "react-router-dom";
import Button from "../component/ButtonComponent/Button";


export default function Update() {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [tag, setTag] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    // async function fetchGroceryById() {
    //     try {
    //         const response = await axios({
    //             method: "GET",
    //             url: "https://api.p2.slc1.foxhub.space/groceries/" + params.id,
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.access_token}`,
    //             },
    //         });
    //         console.log(response.data)
    //         setTitle(response.data.title);
    //         setPrice(response.data.price);
    //         setTag(response.data.tag);
    //         setImageUrl(response.data.imageUrl);
    //         setLoading(true);
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false)
    //         const errMsg = error.response.data.message
    //         Swal.fire({
    //             title: 'Error',
    //             text: errMsg,
    //             icon: 'error',
    //         });
    //     }
    // }
    // useEffect(() => {
    //     fetchGroceryById()
    // }, [])
    return (
        <section >
            <div className="container">
                <div className="col-12 col-md-5 mx-auto">
                    <div className="pt-4 pb-3 mb-5 ">
                        <form style={{ background: '#FFC374', padding: '50px 50px', borderRadius: '20px' }} onSubmit={async (e) => {
                            e.preventDefault()
                            try {
                                setLoading(true)
                                const response = await axios({
                                    method: "PUT",
                                    url: import.meta.env.VITE_API_BASE_URL +"/groceries/" + params.id,
                                    data: {
                                        title,
                                        price,
                                        tag,
                                        imageUrl,
                                    },
                                    headers: {
                                        Authorization: `Bearer ${localStorage.access_token}`,
                                    }
                                });
                                console.log(response.data);
                                Swal.fire({
                                    title: 'Success',
                                    text: response.data.message,
                                    icon: 'success',
                                });
                                navigate('/')
                                setLoading(false)
                            } catch (error) {
                                console.log(error);
                                setLoading(false)
                                const errMsg = error.response.data.message
                                Swal.fire({
                                    title: 'Error',
                                    text: errMsg,
                                    icon: 'error',

                                });
                            }
                        }}
                            id="add-form">
                            <h4 className="h3 mb-3 text-center">Edit Grocery</h4>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="add-title">Title</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="add-title"
                                    name='title'
                                    disabled={loading}
                                    onChange={
                                        (e) => setTitle(e.target.value)}
                                    value={title}
                                    autoComplete="off"
                                    required=""
                                />
                            </div>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="add-price">Price</label>
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="add-price"
                                    name='price'
                                    disabled={loading}
                                    onChange={
                                        (e) => setPrice(e.target.value)}
                                    value={price}
                                    autoComplete="off"
                                    required=""
                                />
                            </div>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="add-tag">Tag</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="add-tag"
                                    name='tag'
                                    disabled={loading}
                                    onChange={
                                        (e) => setTag(e.target.value)}
                                    value={tag}
                                    autoComplete="off"
                                    required=""
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="add-phone">Image URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="add-imageURL"
                                    name='imageURL'
                                    disabled={loading}
                                    onChange={
                                        (e) => setImageUrl(e.target.value)}
                                    value={imageUrl}
                                    autoComplete="off"
                                    required=""
                                />
                            </div>
                            <div className="row mt-5 mb-3">

                                <div className="col-6">
                                    <a
                                        className="btn btn-lg btn-light w-100 p-2"
                                        href="/"
                                    >
                                        back
                                    </a>
                                </div>

                                <div className="col-6">
                                    <Button
                                        name={loading ? "Loading..." : "Submit"}
                                        buttonClass={"btn btn-lg btn-warning w-100"}
                                        buttonType={"submit"}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}