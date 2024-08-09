import "./login.css";
import {useState} from "react";
import {toast} from "react-toastify";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import {auth, db} from "../../lib/firebase";
import upLoad from "../../lib/upload";


const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: '',
    });

    const [loading, setLoading] = useState(false);

    const handleAvatar = (e: any) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            })
        }
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const formData: any = new FormData(e.target)
        const {email, password} = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Login success")
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const formData: any = new FormData(e.target)
        const {username, email, password} = Object.fromEntries(formData);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const imgUrl = await upLoad(avatar.file)

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            })
            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            })
            toast.success("Account created")
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button disabled={loading} type="submit">{loading ? "Loading..." : "Sing In"}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "/avatar.png"} alt=""/>
                        Upload photo
                    </label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar}/>
                    <input type="text" placeholder="Username" name="username"/>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button type="submit" disabled={loading}>{loading ? "Loading..." : "Sing Up"}</button>
                </form>
            </div>
        </div>
    );
};

export {Login};