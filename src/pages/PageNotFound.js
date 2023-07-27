import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const PageNotFound = () => {
  return (
    <Layout title="Out of Bazar">
        <div style={{color: "red", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh"}}>
        <h1 style={{fontSize: "2.5rem", fontWeight: "800"}}>404</h1>
        <h3>Opps! Page Not Found</h3>
        <button style={{padding: "5px 12px", borderRadius: "5px"}}> <Link to="/" style={{textDecoration: "none"}}>Go Back</Link> </button>
        </div>
    </Layout>
  )
}

export default PageNotFound