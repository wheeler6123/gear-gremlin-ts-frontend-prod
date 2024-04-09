
const Header = () => {


    return (
        <div className="header">
            <div className="spacer"></div> {/* Spacer div */}
            <div className="spacer"></div> {/* Spacer div */}
            <div>Gear Gremlin</div>
            <div className="spacer"></div> {/* Spacer div */}
            <div className="spacer login-button-container"><button className="login-button">
                <a href="/signin">Login</a>
            </button></div>
        </div>
    )
}

export default Header;