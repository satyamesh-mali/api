import React from 'react'
import "../css/Intro.css"
import introBackground from "../images/background2.jpg"

const Introscreen = () => {
  return (
    <div className='introParent'> 
    <h3 className='introHeading'>Hey Welcome To AJTAs</h3>
    <img id='introbackid' src={introBackground} alt="error" />
    </div>
  )
}

export default Introscreen
