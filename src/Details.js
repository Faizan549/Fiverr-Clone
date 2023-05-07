const Details=({id,name,img,avgReview,gig,price})=>{
    return<>
    <div>
        <h2>{name}</h2>
        <img src={img} alt="alter"></img>
        <h4>{avgReview}</h4>
        <p>{gig}</p>
        <h3>{price}</h3>
    </div>

    </>
}
export default Details;