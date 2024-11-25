import React from 'react'
import playstore from '../../../images/fazi.png'
import appstore from '../../../images/playstore.png'
import './Footer.css'

const Footer = () => {
  return (
  <>
  <footer id="footer">

<div className="leftFooter">
    <h4>DOWNLOAD OUR AP4</h4>
    <p>Download App for Android and ios mobile phone.</p>
    <img src={playstore }alt="playstore" />
    <img src={appstore }alt="playstore" />

</div>

<div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; RanaFaiz</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/ranafaiz6537">Instagram</a>
        <a href="http://youtube.com/">Youtube</a>
        <a href="http://Facebook.com/Rana Faiz">Facebook</a>
      </div>

  </footer>
  </>
  )
}

export default Footer