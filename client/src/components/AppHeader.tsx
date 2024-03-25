

const AppHeader = () => {


    return (
        <header className="navbar pcoded-header navbar-expand-lg navbar-light">
            <div className="m-header">
                <a className="mobile-menu" id="mobile-collapse1" href=""><span></span></a>
                <a href="index.html" className="b-brand">
                    <div className="b-bg">
                        <i className="feather icon-sun"></i>
                    </div>
                    <span className="b-title">Gear Gremlin</span>
                </a>
            </div>
            <a className="mobile-menu" id="mobile-header" href="">
                <i className="feather icon-more-horizontal"></i>
            </a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {/* <li><a href="" className="full-screen" onclick={toggleFullScreen()}><i className="feather icon-maximize"></i></a></li> */}
                    <li className="nav-item dropdown">
                        <a className="dropdown-toggle" href="" data-toggle="dropdown">Dropdown</a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="">Action</a></li>
                            <li><a className="dropdown-item" href="">Another action</a></li>
                            <li><a className="dropdown-item" href="">Something else here</a></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <div className="main-search">
                            <div className="input-group">
                                <input type="text" id="m-search" className="form-control" placeholder="Search . . ."/>
                                    <a href="" className="input-group-append search-close">
                                        <i className="feather icon-x input-group-text"></i>
                                    </a>
                                    <span className="input-group-append search-btn btn btn-primary">
                                        <i className="feather icon-search input-group-text"></i>
                                    </span>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <div className="dropdown">
                            <a className="dropdown-toggle" href="" data-toggle="dropdown"><i className="icon feather icon-bell"></i></a>
                            <div className="dropdown-menu dropdown-menu-right notification">
                                <div className="noti-head">
                                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                                    <div className="float-right">
                                        <a href="" className="m-r-10">mark as read</a>
                                        <a href="">clear all</a>
                                    </div>
                                </div>
                                <ul className="noti-body">
                                    <li className="n-title">
                                        <p className="m-b-0">NEW</p>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            
                                        </div>
                                    </li>
                                    <li className="n-title">
                                        <p className="m-b-0">EARLIER</p>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            
                                        </div>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            
                                        </div>
                                    </li>
                                </ul>
                                <div className="noti-footer">
                                    <a href="">show all</a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="dropdown drp-user">
                            <a href="" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon feather icon-settings"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right profile-notification">
                                <div className="pro-head">
                                    
                                </div>
                                <ul className="pro-body">
                                    <li><a href="" className="dropdown-item"><i className="feather icon-settings"></i> Settings</a></li>
                                    <li><a href="" className="dropdown-item"><i className="feather icon-user"></i> Profile</a></li>
                                    <li><a href="message.html" className="dropdown-item"><i className="feather icon-mail"></i> My Messages</a></li>
                                    <li><a href="auth-signin.html" className="dropdown-item"><i className="feather icon-lock"></i> Lock Screen</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default AppHeader;