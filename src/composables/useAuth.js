import { ref, onMounted, watch } from 'vue'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import router from '@/router'

const user = ref(null)
const auth = getAuth()

const googleAuthProvider = new GoogleAuthProvider()



export function useAuth() { 
    onMounted(() => {
        onAuthStateChanged(auth, (firebaseUser) => {
            user.value = firebaseUser
            
        })
        
    })
    const login = async (email, password) => { 
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error("error al iniciar sesión:", error)
            
        }
        router.push('/')
    }
    const signInWithGoogle = async () => { 
        try {
            const result = await signInWithPopup(auth, googleAuthProvider)
            if (result) router.push('/')
            
        } catch (error) {
            console.error("error al iniciar con google:", error)
            
        }
    }

    const register = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword( auth, email, password)
            await updateProfile(userCredential.user, {
                displayName: username
            })
        } catch (error) {
            console.error("hubo un error al crear la cuenta", error);
            
        }
        router.push('/')
    }
    const logout = async () => {
        try {
            await signOut(auth);
            user.value = null
            router.push('/auth')
        } catch (error) {
            console.error("error al cerrar sesión:", error)
            
        }
    }
    return {
        user,
        login,
        logout,
        register,
        signInWithGoogle

    }
}