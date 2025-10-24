import { create } from "zustand";
import type { SafeUser, SafeUserLogin, SafeUserRegister } from "../types";
import { persist } from "zustand/middleware";
import { apiV1 } from "../utils/axios";

interface AuthState {
  user: SafeUser | null;
  loading: boolean;
  isAuth: boolean;

  login: (data: SafeUserLogin) => Promise<boolean>;
  logout: () => Promise<void>;
  profile: () => Promise<void>;
  register: (data: SafeUserRegister) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            loading: false,
            isAuth: false,

            login: async (data) => {
                try{
                    set({loading: true})
                    await apiV1.post(`/user/login`, data);
                    await get().profile();
                    set({isAuth: true})
                    return true;
                }catch(error){
                    set({isAuth:false})
                    return false;
                }finally{
                    set({loading: false})
                }
            },
            logout: async () => {
                try{
                    set({loading:true})
                    await apiV1.post(`/user/logout`)
                }catch(error){
                    console.log("You're not authorised")
                }finally{
                    set({user: null, isAuth: false, loading: false })
                }
            },
            profile: async () => {
               try {
                    set({ loading: true });
                    const res = await apiV1.get<SafeUser>('/user/profile');
                    set({ user: res.data, isAuth: true });
                } catch (error) {
                    set({ isAuth: false });
                } finally {
                    set({ loading: false });
                }
            },
            register: async (data) => {
                try {
                    set({ loading: true });
                    await apiV1.post('/user/register', data);
                    set({ isAuth: true });
                    return true;
                } catch (error) {
                    set({ isAuth: false });
                    return false;
                } finally {
                    set({ loading: false });
                }
            }
        }),
        {           
           name: "auth-storage",
           partialize: (state) => ({isAuth:state.isAuth})  
        }
    )
)