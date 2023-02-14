//? React states import 
import { useState } from "react"

//? React router import
import { Navigate, useNavigate } from "react-router-dom"

//? Axios import
import axios from "axios"

const Publish = ({ token, setModalVisible, modalVisible, setInitializeModal }) => {
    const [file, setFile] = useState()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [brand, setBrand] = useState("")
    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [condition, setCondition] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState("")
    const [trade, setTrade] = useState(false)

    const navigate = useNavigate();

    return token ? (
        <section className="background">
            <form
                onSubmit={async e => {
                    e.preventDefault();

                    const formData = new FormData();
                    formData.append("picture", file)
                    formData.append("title", title)
                    formData.append("description", description)
                    formData.append("condition", condition)
                    formData.append("city", location)
                    formData.append("brand", brand)
                    formData.append("size", size)
                    formData.append("color", color)
                    formData.append("price", price)

                    try {
                        const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/offer/publish", formData,
                            {
                                headers: {
                                    Authorization: "Bearer " + token,
                                    "Content-Type": "multipart/form-data"
                                }
                            }
                        );
                        navigate("/");

                    }
                    catch (error) {
                        if (error.response.status === 500) {
                            console.error("an error occured")
                        } else {
                            console.error(error.response.data.msg)
                        }
                    }
                }}


                className="container publish-offer column" id="publish-offer" action="submit">

                <h2 className="publish__title" >Vends ton article</h2>

                <div className="offer-section upload-file row">
                    <label className="btn--dark btn" htmlFor="load-file">Sélectionner une image</label>
                    <input hidden onChange={(e) => {
                        setFile(e.target.files[0])
                    }} type="file" name="load-file" id="load-file" />
                    {file && <img className="thumbnail" src={URL.createObjectURL(file)} alt="Article en vente" />}
                </div>
                <div className="offer-section row">
                    <div className="col column">
                        <label htmlFor="titre">Titre</label>
                        <label htmlFor="description">Décris ton article</label>
                    </div>
                    <div className="col column">
                        <input className="input-txt" onChange={(e) => {
                            setTitle(e.target.value)
                        }} value={title} type="text" name="titre" id="titre" placeholder="ex : Chemise Sézane verte" />
                        <textarea className="input-txt" onChange={(e) => {
                            setDescription(e.target.value)
                        }} value={description} placeholder="ex : Portée quelques fois, taille correctement"></textarea>
                    </div>

                </div>
                <div className="offer-section row">
                    <div className="col column">
                        <label htmlFor="brand">Marque</label>
                        <label htmlFor="size">Taille</label>
                        <label htmlFor="color">Couleur</label>
                        <label htmlFor="condition">État</label>
                        <label htmlFor="location">Lieu</label>
                    </div>
                    <div className="col column">
                        <input className="input-txt" onChange={(e) => {
                            setBrand(e.target.value)
                        }} value={brand} type="text" name="brand" id="brand" placeholder="ex : Picture" />
                        <input className="input-txt" onChange={(e) => {
                            setSize(e.target.value)
                        }} value={size} type="text" name="size" id="size" placeholder="ex : L / 43 / 12ans" />
                        <input className="input-txt" onChange={(e) => {
                            setColor(e.target.value)
                        }} value={color} type="text" name="color" id="color" placeholder="ex : Beige" />
                        <input className="input-txt" onChange={(e) => {
                            setCondition(e.target.value)
                        }} value={condition} type="text" name="condition" id="condition" placeholder="ex : Très bon état" />
                        <input className="input-txt" onChange={(e) => {
                            setLocation(e.target.value)
                        }} value={location} type="text" name="location" id="location" placeholder="ex : Pau, 64000" />
                    </div>
                </div>

                <div className="offer-section row">
                    <div className="col column">
                        <label htmlFor="price">Prix</label>
                    </div>
                    <div className="col column">
                        <input className="input-txt" onChange={(e) => {
                            setPrice(e.target.value)
                        }} value={price} type="number" name="price" id="price" placeholder="0,00€" />
                        <div row>
                            <input onClick={() => {
                                setTrade(!trade)
                            }} type="checkbox" name="trade" id="trade" />
                            <label htmlFor="trade">Je suis intéressé(e) par les échanges</label>

                        </div>
                    </div>
                </div>
                <div className="publish-offer__price">
                    <div className="col">

                    </div>
                    <div className="col">



                    </div>
                </div>
                <button className="btn btn--dark" type="submit">Publier</button>
            </form>
        </section>
    ) : (< Navigate to="/" />)
    //  )

}

export default Publish;