
const Header = () => {


    return (
        <div className="header">
            <div className="spacer"></div> {/* Spacer div */}
            <div className="spacer"></div> {/* Spacer div */}
            <div>Gear Gremlin</div>
            <div className="spacer"></div> {/* Spacer div */}
            <button className="login-button">
                <a href="/signin">Login</a>
            </button>
        </div>
    )
}

export default Header;