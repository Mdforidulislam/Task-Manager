import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { Password } from "@mui/icons-material";


export const shareAuth = createContext(null)
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();


const Authentication = ({children}) => {
    const [loadin,setLoading] = useState(false)
    const [user,currentUser] = useState({})

    const userCreateWithEmail = ( email,Password) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email,Password)
    }

    const singinPassword = (email, password) =>{
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    } 

    const googleLogin = () =>{
        setLoading(false)
        return signInWithPopup(auth,providerGoogle)
    }

    const singInGithub = () =>{
        setLoading(false)
        return signInWithPopup(auth,providerGithub)
    }
    const logOut = async ( ) =>{   
        setLoading(false)
       return  signOut(auth)
         .then(result => console.log(result))
         .catch(error =>console.log(error))

    }

    useEffect(()=>{
        const unsuscripber = onAuthStateChanged(auth,(user) =>{
            if(user){
                console.log(user);
                currentUser(user)
            }  
        })

      return ()=> unsuscripber()

    },[])

    const infoList = { loadin,userCreateWithEmail , singinPassword ,user , logOut ,googleLogin , singInGithub }

    return (
        <shareAuth.Provider value={infoList}>
            {children}
        </shareAuth.Provider>
    );
};

export default Authentication;