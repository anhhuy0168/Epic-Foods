import {createContext,useReducer } from 'react'
import { authReducer } from '../reducers/authReducer'
import {apiUrl,LOCAL_STORAGE_TOKEN_NAME} from'./constants'
import axios from 'axios'
export const AuthContext = createContext()
const AuthContextProvider = ({children})=>{
    const [authState , dispatch] = useReducer(authReducer,{
        authLoading: true,
        isAuthenticated:false,
        user:null
    })
    //login

    const loginUser = async userForm =>{
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if(response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME ,response.data.accessToken)
            console.log(response.data.accessToken,"day la token")
            return response.data
        } catch (error) {
            //send req in back-end
            if(error.response.data) return error.response.data
            else return{success:false,message:error.message}
        }
    }
    //register
    const registerUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            
			if (response.data.success)
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				)
			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}
    //context data
    const authContextData = {loginUser,registerUser,authState }

    //return provide

    return(
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider