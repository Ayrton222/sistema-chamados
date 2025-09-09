import {useState, createContext, useEffect} from 'react';
import {auth, db} from '../services/firebaseConnection';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() =>{
        async function loadUser() {
            const storageUser = localStorage.getItem("@userLogin");

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadUser();
    }, [])

   async function signIn(email, password){
         setLoadingAuth(true);
         await signInWithEmailAndPassword(auth, email, password)
         .then(async (value) => {
              let uid = value.user.uid;
              const docRef = doc(db, "users",uid);
              const docSnap = await getDoc(docRef);

              let data = {
                uid: uid, 
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
              };
              setUser(data);
              storageUser(data);
              setLoadingAuth(false);
              toast.success("Bem-vindo(a) de volta!");
              navigate("/dashboard");
         })
         .catch((error) =>{
            console.log("Erro ao realizar o login do usuario: ", error);
            setLoadingAuth(false);
            toast.error("Erro ao realizar o login");
         })
    }

    async function signUp(nome, email, password){
        setLoadingAuth(true);
        await createUserWithEmailAndPassword(auth,email, password)
        .then(async (value) =>{
            let uid = value.user.uid;
            await setDoc(doc(db, "users", uid), {
                nome: nome,
                avatarUrl: null
            })
            .then(() =>{
               let data = {
                uid: uid, 
                nome: nome,
                email: value.user.email,
                avatarUrl: null
               };
               setUser(data);
               storageUser(data);
               setLoadingAuth(false);
               toast.success("Seja bem vindo ao sistema!");
               navigate("/dashboard");
            })
            .catch((error) =>{
                console.log("Erro ao cadastrar o usuario", error);
                setLoadingAuth(false);
            })
        })
        .catch((error) =>{
            console.log("Erro ao realizar o cadastro do usuario: ", error);
            setLoadingAuth(false);
        })
    }

    function storageUser(data){
        localStorage.setItem("@userLogin", JSON.stringify(data));
    }

    async function logout() {
        await signOut(auth);
        localStorage.removeItem("@userLogin");
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user,signIn,signUp, logout,loadingAuth, loading, storageUser,setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;