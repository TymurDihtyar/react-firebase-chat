import "./detail.css";
import {auth} from "../../lib/firebase";
import {useChatStore} from "../../lib/chatStore";
import {useUserStore} from "../../lib/userStore";
import {doc} from "firebase/firestore";
import {db} from "../../lib/firebase";
import {updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";

const Detail = () => {
    const {chatId, user, isReceiverBlocked, isCurrentUserBlocked, changeBlock} = useChatStore();
    const {currentUser} = useUserStore();
    const handleBlock = async () => {
        if(!user) return;

        const userDocRef = doc(db, "users", currentUser.id);
        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) :  arrayUnion(user.id)
            });
            changeBlock();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "/avatar.png"} alt=""/>
                <h2>{user?.username}</h2>
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
                <button onClick={handleBlock}>{isCurrentUserBlocked ? "You are blocked" : isReceiverBlocked ? "Unblock User" : "Block User"}</button>
                <button className="logout" onClick={() => auth.signOut()}>Logout</button>
            </div>
        </div>
    );
};

export {Detail};