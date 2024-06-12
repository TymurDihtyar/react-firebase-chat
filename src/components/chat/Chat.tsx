import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {useEffect, useRef, useState} from "react";

const Chat = () => {
    const [openEmoji, setOpenEmoji] = useState(false);
    const [text, setText] = useState('');

    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior: "smooth"});
    }, []);

    const handleEmoji = (emoji: any) => {
        setText(prev => prev + emoji.emoji);
        setOpenEmoji(false);
    }

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="/avatar.png" alt=""/>
                    <div className="texts">
                        <span>Jane Doe</span>
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
                <div className="message">
                    <img src="/avatar.png" alt=""/>
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda, beatae enim
                            expedita ipsam itaque iure laudantium magni nam nobis quisquam similique. Aliquid dolores et
                            ipsam possimus! Cumque dolore ducimus eum modi nemo nostrum odit quaerat rerum soluta
                            voluptatum. Aspernatur consectetur dolor laboriosam maiores nobis placeat quisquam sapiente
                            sequi unde voluptates. A ab aliquam atque aut dicta dignissimos ea eos error eum eveniet
                            facere fugit minima mollitia nam, neque nobis officiis praesentium rem rerum sint, sit
                            tempore temporibus unde ut vel vero voluptatem! A alias commodi dolorum explicabo facilis,
                            illo maiores minima odit quibusdam quis quo rerum sit temporibus velit.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda, beatae enim
                            expedita ipsam itaque iure laudantium magni nam nobis quisquam similique. Aliquid dolores et
                            ipsam possimus! Cumque dolore ducimus eum modi nemo nostrum odit quaerat rerum soluta
                            voluptatum. Aspernatur consectetur dolor laboriosam maiores nobis placeat quisquam sapiente
                            sequi unde voluptates. A ab aliquam atque aut dicta dignissimos ea eos error eum eveniet
                            facere fugit minima mollitia nam, neque nobis officiis praesentium rem rerum sint, sit
                            tempore temporibus unde ut vel vero voluptatem! A alias commodi dolorum explicabo facilis,
                            illo maiores minima odit quibusdam quis quo rerum sit temporibus velit.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="/avatar.png" alt=""/>
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda, beatae enim
                            expedita ipsam itaque iure laudantium magni nam nobis quisquam similique. Aliquid dolores et
                            ipsam possimus! Cumque dolore ducimus eum modi nemo nostrum odit quaerat rerum soluta
                            voluptatum. Aspernatur consectetur dolor laboriosam maiores nobis placeat quisquam sapiente
                            sequi unde voluptates. A ab aliquam atque aut dicta dignissimos ea eos error eum eveniet
                            facere fugit minima mollitia nam, neque nobis officiis praesentium rem rerum sint, sit
                            tempore temporibus unde ut vel vero voluptatem! A alias commodi dolorum explicabo facilis,
                            illo maiores minima odit quibusdam quis quo rerum sit temporibus velit.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt=""/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda, beatae enim
                            expedita ipsam itaque iure laudantium magni nam nobis quisquam similique. Aliquid dolores et
                            ipsam possimus! Cumque dolore ducimus eum modi nemo nostrum odit quaerat rerum soluta
                            voluptatum. Aspernatur consectetur dolor laboriosam maiores nobis placeat quisquam sapiente
                            sequi unde voluptates. A ab aliquam atque aut dicta dignissimos ea eos error eum eveniet
                            facere fugit minima mollitia nam, neque nobis officiis praesentium rem rerum sint, sit
                            tempore temporibus unde ut vel vero voluptatem! A alias commodi dolorum explicabo facilis,
                            illo maiores minima odit quibusdam quis quo rerum sit temporibus velit.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="/img.png" alt=""/>
                    <img src="/camera.png" alt=""/>
                    <img src="/mic.png" alt=""/>
                </div>
                <input type="text" value={text} placeholder="Type a message..."
                       onChange={(e) => setText(e.target.value)}/>
                <div className="emoji">
                    <img src="/emoji.png" alt="" onClick={() => setOpenEmoji(!openEmoji)}/>
                    <div className="piker">
                        <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    );
};

export {Chat};