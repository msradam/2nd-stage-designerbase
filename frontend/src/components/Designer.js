import React from 'react'

const Designer = ({ designer }) => {
 
  return (
    <div className='cards_item'>
    <div className='card'>
        <div className='card_content'>
        <h1 className="card_title">{designer.first_name} {designer.last_name}</h1>
        <h2 className="card_subtitle"> Class of {designer.class_year} </h2> 
        <h2 className="card_subtitle">{designer.email} </h2> 
        <p className="card_text">Interested in: {designer.design_positions.replace("'", "")} , {designer.specialized_positions}</p>
        <p className="card_experience">Relevant Experience: {designer.relevant_experience}</p>

        </div>
    
    </div>
    </div>
  )
}

export default Designer