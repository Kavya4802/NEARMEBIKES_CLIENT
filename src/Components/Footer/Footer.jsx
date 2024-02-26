import "./Footer.css"
function Footer() {
    return (
        <div className="footer-container">
            <div className="social-footer">
                    <h1>Nearme Bikes</h1>
                <div className="social-media">
                    <a href="#"><img className="social-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="ig"/></a>
                    <a href="#"><img className="social-logo" src="https://www.facebook.com/images/fb_icon_325x325.png" alt="ig"/></a>
                    <a href="#"><img className="social-logo" src="https://help.apple.com/assets/63FE2AC4F8C4756FAE6CEF81/63FE2AC4F8C4756FAE6CEF88/en_GB/e4dbb8e240d50cf30bab73b272a3760b.png" alt="ig"/></a>
                    <a href="#"><img className="social-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/220px-Logo_of_Twitter.svg.png" alt="ig"/></a>
                </div>
            </div>


            <div className="social-footer">
                    <h1>Quick Links</h1>
                <div className="other-media" style={{textAlign:"left"}}>
                    <a href="#">About us</a>
                    <a href="#">Contact us</a>
                    <a href="#">Services</a>
                </div>
            </div>
            
            <div className="social-footer">
                        <h1>Quick Contact</h1>
                <div className="other-media">
                    <a href="#">91919191991</a>
                    <a href="#">rabbani@gmail.com</a>
                    <a href="#">Visakapatnam</a>
                </div>
            </div>

        </div>
    )
}
export default Footer;