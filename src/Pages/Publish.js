//? React states import 
import {  useState } from "react"

//? Axios import
import axios from "axios" 

const Publish = ({token})=>{
    const [file, setFile]= useState()
    const [title, setTitle] = useState("")
    const [description, setDescription]=useState("")
    const [brand, setBrand] =useState("")
    const [size, setSize] =useState("")
    const [color, setColor]=useState("")
    const [condition, setCondition]=useState("")
    const [location, setLocation]=useState("")
    const [price, setPrice]=useState("")
    const [trade, setTrade]=useState(false)


          return(
        <section>
            <form 
            onSubmit={async e=>{
                e.preventDefault();
                
                const formData = new FormData();
                formData.append("picture",file)
                formData.append("title", title)
                formData.append("description", description)
                formData.append("condition", condition)
                formData.append("city", location)
                formData.append("brand", brand)
                formData.append("size", size)
                formData.append("color", color)
            try{
                const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/offer/publish",formData,
                {
                    headers:{
                        Authorization : `Bearer ${token}`, 
                        "Content-Type" : "multipart/form-data"
                    }
                }  )
                
            }
            catch(error){
                if(error.response.status === 500){
                    console.error("an error occured")
                }else{
                    console.error(error.response.data.msg)
                }


            }
            }}
            
            
            className="publish-offer" id = "publish-offer" action="submit">
                <h2>Vends ton article</h2>
                <div className="publish-offer__img">
                    <input onChange={(e)=>{
                        setFile(e.target.files[0])
                    }} type="file" name="" id="" />
                </div>
                <div className="publish-offer__txt">
                    <div className="col">
                        <label htmlFor="titre">Titre</label>
                        <label htmlFor="description">Décris ton article</label>
                    </div>
                    <div className="col">
                    <input onChange={(e)=>{
                        setTitle(e.target.value)
                    }} value = {title} type="text" name="titre" id="titre" placeholder="ex : Chemise Sézane verte" />
                    <textarea onChange={(e)=>{
                        setDescription(e.target.value)
                    }} value = {description} placeholder="ex : Portée quelques fois, taille correctement"></textarea>
                    </div>
                </div>
                <div className="publish-offer__details">
                    <div className="col">
                        <label htmlFor="brand">Marque</label>
                        <label htmlFor="size">Taille</label>
                        <label htmlFor="color">Couleur</label>
                        <label htmlFor="condition">État</label>
                        <label htmlFor="location">Lieu</label>
                        
                    </div>
                    <div className="col">
                        <input  onChange={(e)=>{
                            setBrand(e.target.value)
                        }} value={brand} type="text" name="brand" id="brand" placeholder="ex : Picture" />
                        <input onChange={(e)=>{
                            setSize(e.target.value)
                        }} value={size} type="text" name="size" id="size" placeholder="ex : L / 43 / 12ans" />
                        <input onChange={(e)=>{
                            setColor(e.target.value)
                        }} value={color} type="text" name="color" id="color" placeholder="ex : Beige" />
                        <input onChange={(e)=>{
                            setCondition(e.target.value)
                        }} value={condition} type="text" name="condition" id="condition"  placeholder="ex : Très bon état"/>
                        <input onChange={(e)=>{
                            setLocation(e.target.value)
                        }} value={location} type="text" name="location" id="location" placeholder="ex : Pau, 64000" />
                    </div>
                </div>
                <div className="publish-offer__price">
                    <div className="col">
                        <label htmlFor="price">Prix</label>
                    </div>
                    <div className="col">
                    <input onChange={(e)=>{
                        setPrice(e.target.value)
                    }} value={price} type="number" name="price" id="price" placeholder="0,00€" />
                    <input onClick={()=>{
                        setTrade(!trade)
                    }} type="checkbox" name="trade" id="trade" />
                    <label htmlFor="trade">Je suis intéressé(e) par les échanges</label>
                    </div>
                </div>
                <button className="btn">Submit</button>
            </form>
        </section>
    )

}

export default Publish;