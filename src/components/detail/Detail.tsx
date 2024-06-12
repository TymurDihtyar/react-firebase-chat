import "./detail.css";

const Detail = () => {
    return (
        <div className="detail">
            <div className="user">
                <img src="/avatar.png" alt=""/>
                <h2>Jane Doe</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="/arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="/arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="/arrowDown.png" alt=""/>
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://t3.ftcdn.net/jpg/06/21/88/92/360_F_621889237_RrEunt4ybaBYfrJElszI0JbELSyTHx9W.jpg"
                                    alt=""/>
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="/download.png" className="icon" alt=""/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://t3.ftcdn.net/jpg/06/21/88/92/360_F_621889237_RrEunt4ybaBYfrJElszI0JbELSyTHx9W.jpg"
                                    alt=""/>
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="/download.png" className="icon" alt=""/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://t3.ftcdn.net/jpg/06/21/88/92/360_F_621889237_RrEunt4ybaBYfrJElszI0JbELSyTHx9W.jpg"
                                    alt=""/>
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="/download.png" className="icon" alt=""/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://t3.ftcdn.net/jpg/06/21/88/92/360_F_621889237_RrEunt4ybaBYfrJElszI0JbELSyTHx9W.jpg"
                                    alt=""/>
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="/download.png" className="icon" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="/arrowUp.png" alt=""/>
                    </div>
                </div>
                <button>Block User</button>
                <button className="logout">Logout</button>
            </div>
        </div>
    );
};

export {Detail};