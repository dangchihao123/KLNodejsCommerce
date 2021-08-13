import React from 'react'
import { Link } from 'react-router-dom'

export default function Banner() {
    return (
        // <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
        //     <div className="col-md-6 px-0">
        //     </div>
        <>
            <Link to="/"><img className="image-banner" src="https://mac24h.vn/images/companies/1/untitled%20folder%201/untitled%20folder/banner-watch-seri4.jpg?1537526795127" /></Link>
        </>
        // </div>
    )
}
