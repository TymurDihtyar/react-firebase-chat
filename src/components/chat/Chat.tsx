import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {useEffect, useRef, useState} from "react";
import {arrayUnion, doc, onSnapshot, updateDoc, getDoc} from "firebase/firestore";
import {db} from "../../lib/firebase";
import {useChatStore} from "../../lib/chatStore";
import {useUserStore} from "../../lib/userStore";
import upLoad from "../../lib/upload";

const Chat = () => {
    const [openEmoji, setOpenEmoji] = useState(false);
    const [text, setText] = useState('');
    const [chat, setChat] = useState<any>();
    const [img, setImg] = useState<any>({
        file: null,
        url: '',
    });

    const {currentUser} = useUserStore()
    const {chatId, user, isReceiverBlocked, isCurrentUserBlocked} = useChatStore()

    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior: "smooth"});
    }, [chat]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId), async (res) => {
            setChat(res.data())
        })

        return () => {
            unSub();
        }
    }, [chatId]);


    const handleEmoji = (emoji: any) => {
        setText(prev => prev + emoji.emoji);
        setOpenEmoji(false);
    }

    const handleImg = (e: any) => {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            })
        }
    }

    const handleSend = async () => {
        if (text === "") return;

        let imgUrl = null;

        try {
            if (img.file) {
                imgUrl = await upLoad(img.file);
            }

            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    text,
                    createAt: new Date(),
                    senderId: currentUser?.id,
                    ...(imgUrl && {img: imgUrl}),
                })
            })

            const userIDs = [currentUser.id, user.id]

            for (const id of userIDs) {
                const userChatsRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();

                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);
                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex].lastMessage = text;
                        userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
                        userChatsData.chats[chatIndex].updatedAt = Date.now();
                    }

                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats
                    })
                }
            }
        } catch (err) {
            console.log(err)
        }

        setImg({
            file: null,
            url: '',
        })
        setText('');
    }

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={user?.avatar || "/avatar.png"} alt=""/>
                    <div className="texts">
                        <span>{user?.username}</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="/phone.png" alt=""/>
                    <img src="/video.png" alt=""/>
                    <img src="/info.png" alt=""/>
                </div>
            </div>
            <div className="center">
                {chat?.messages?.map((message: any) => (
                    <div className={message.senderId === currentUser.id ? "message own" : "message"}
                         key={message?.createAt}>
                        <div className="texts">
                            {message.img && <img
                                src={message.img}
                                alt=""/>}
                            <p>{message.text}</p>
                            {/*<span>{}</span>*/}
                        </div>
                    </div>)
                )}
                {img.url && <div className="message own">
                    <div className="texts">
                        <img src={img.url} alt=""/>
                    </div>
                </div>}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src="/img.png" alt=""/>
                    </label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleImg}/>
                    <img src="/camera.png" alt=""/>
                    <img src="/mic.png" alt=""/>
                </div>
                <input type="text" value={text}
                       placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You are blocked" : "Type a message..."}
                       onChange={(e) => setText(e.target.value)}
                       disabled={isCurrentUserBlocked || isReceiverBlocked}
                />
                <div className="emoji">
                    <img src="/emoji.png" alt="" onClick={() => setOpenEmoji(!openEmoji)}/>
                    <div className="piker">
                        <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton" onClick={handleSend}
                        disabled={isCurrentUserBlocked || isReceiverBlocked}>Send
                </button>
            </div>
        </div>
    );
};

export {Chat};