import React, { useEffect, useState } from "react";
import Data from "./Data"
import Details from "./Details";
const GigDetail = () => {
    const [gigDetail, setGigdetail] = useState();
    useEffect(() => {
        let id = window.location.pathname.split("/")[2];
        const requireData = Data.find((item) => {
            return item.id === parseInt(id);
        })
        setGigdetail(requireData)
    }, [])
    return <>
        {gigDetail && <Details
            id={gigDetail.id}
            name={gigDetail.Name}
            img={gigDetail.img}
            gig={gigDetail.gig}
            avgReview={gigDetail.avgReview}
            price={gigDetail.price}
        />}
    </>
}
export default GigDetail;
