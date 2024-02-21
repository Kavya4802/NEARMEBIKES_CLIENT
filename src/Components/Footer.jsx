import "./Footerstyles.css"
function Footer() {
    return (
        <div className="footer">
            <meta name="viewport" content="width=device-width, initial-scale=1.o" />
            <div className="top">
                <div>
                    <h1>Nearme Bikes</h1>
                    <p>Hit the road in style with our wheels!</p>
                    <a href="/">
                        <i className="fas fa-phone"></i>
                    </a>
                    <p style={{ display: "inline", marginLeft: "20px" }}>9787453560</p>
                    <br></br>
                    <a href="/" style={{ textDecoration: "none" }}>
                        <i className="fas fa-envelope"></i>
                        <p style={{ display: "inline", marginLeft: "20px", color: "white" }}>nearmebikes@gmail.com</p>
                    </a>
                </div>
                <div>
                    <a href="/">
                        <i className="fa-brands fa-facebook-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-instagram-square"></i>
                    </a>
                </div>
            </div>
            <div className="bottom">

                <div>
                    <h4>Help</h4>
                    <a href="/about">About Us</a>
                    <a href="/">Contact Us</a>
                </div>
                <div>
                    <h4>Others</h4>
                    <a href="/terms">Terms of Service</a>
                    <a href="/privacypolicy">Privacy Policy</a>
                </div>
            </div>
        </div>
    )
}
export default Footer;