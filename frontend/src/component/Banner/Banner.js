import React from 'react'
import { Link } from 'react-router-dom'

export default function Banner() {
    return (
        // <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
        //     <div className="col-md-6 px-0">
        //     </div>
        <>
            <Link to="/"><img className="image-banner" src="https://cdn.appleigeek.com/2021/06/maxresdefault-5.jpg" alt="hình banner" /></Link>
        </>
        // </div>
    )
}
