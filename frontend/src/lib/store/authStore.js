import {create} from 'zustand'
import {persist} from 'zustand/middleware'


const useAuthStore = create(

    persist(

        (set,get) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            // Set user data and token after successfull login
            setAuth: (userData, token) => set({
                user: userData,
                token,
                isAuthenticated: true
            }),

            // clear user data and token after logout
            clearAuth: () => set({
                user: null,
                token: null,
                isAuthenticated: false
            }),

            // Get token outside React components
            getToken: ()=> get().token
        }),
        {
            name: "auth-store",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            })
        }
    )

)

export default useAuthStore;