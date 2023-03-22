import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {signUp,sendOTP,verifyEmail, signIn, getCurrentUser,postParkingLot, getFreeParkingLots, bookSlot, getBookedSlots, postFeedback, getUsersName, getUserHistory, getParkingLots, getParkingLotsNear, getParkingLotHistory, setProfilePic, cancelBookedSlot, deleteParkingLot, makeActiveParkingLot, getCancelledSlots,sendResetEmail, resetPassword, resendOTP} from '../api/index.js'
import decode from 'jwt-decode'

const initialStore = {
    user: {},
    alert: {},
    freeParkingLots: [],
    bookedTimeSlots: [],
    usersName: [],
    parkingLotNames:[],
    parkingLotDetails:{}
}

export const asyncsignUp = createAsyncThunk('users/signUp',async()=>{
    const {data} = await signUp();
    console.log(data)
    
    return data;
})

export const asyncsendOTP = createAsyncThunk('users/sendOTP',async(formData)=>{
    console.log(formData)
    try{
        const {data} = await sendOTP(formData);
        console.log(data)
        return {...data,type:'success'};
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log(err);
        }
    }
    
    
})

export const asyncresendOtp = createAsyncThunk('users/resendOtp',async(formData)=>{
    console.log(formData)
    try{
        const {data} = await resendOTP(formData);
        console.log(data)
        return {...data,type:'success'};
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log(err);
        }
    }
    
    
})

export const asyncverifyEmail = createAsyncThunk('users/verifyEmail',async(formData)=>{
    console.log(formData)
    try{
        const {data} = await verifyEmail(formData);
        console.log(data)
        return {...data,type:'success'}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})


export const asyncsignIn = createAsyncThunk('users/signIn',async(formData)=>{
    console.log(formData)
    try{
        const {data} = await signIn(formData);
        console.log(data)
        localStorage.setItem('authToken',JSON.stringify(data))
        const response = await getCurrentUser()
        const userData = response.data;
        return {alertData:{msg:"Logged In Successfully",type:"success"},userData:userData}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {alertData:{...data,type:"error"},userData:{}}
        }else{
            console.log("Error",err)
        }
    }
})

export const asyncloadUser = createAsyncThunk('users/loadUser',async()=>{
    console.log("loading user")
    try{
        if(localStorage.getItem('authToken')){
            console.log("user found")
            const token = localStorage.getItem('authToken')
            const decodedToken = decode(token);
            if(decodedToken.exp*1000<new Date().getTime()){
                return {msg:"LogOut"};
            }else{
                const {data} = await getCurrentUser()
                console.log(data)
                return data;
            }
        }
    }catch(err){
        console.log(err)
    }
})

export const asyncpostParkingLot = createAsyncThunk('parkings/postParkingLot',async(formData)=>{
    console.log("posting parking lot")
    try{
        const {data} = await postParkingLot(formData);
        return {...data,type:'success'}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncgetParkingLot = createAsyncThunk('parkings/getParkingLot',async(formData)=>{
    
    console.log("Get Booked Slots")
    console.log(formData)
    try{
        const {data} = await getFreeParkingLots(formData);
        console.log(formData)
        return {alertData:{msg:data.msg,type:'success'},freeParkingLots:data.freeParkingLots}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncBookSlot = createAsyncThunk('parkings/bookSlot',async(formData)=>{
    console.log("Book parking slot")
    console.log(formData)
    try{
        const {data} = await bookSlot(formData);
        console.log(data)
        return {msg:data.msg,type:'success'}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})



export const asyncpostFeedback = createAsyncThunk('users/postFeedback',async(formData)=>{
    console.log("Post feedback form")
    try{
        const {data} = await postFeedback(formData);
        console.log(data)
        return {msg:data.msg,type:'success'}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})
export const asyncgetBookedSlots = createAsyncThunk('parkings/getBookedSlots',async()=>{
    
    try{
        const {data} = await getBookedSlots();
        return {alertData:{msg:data.msg,type:'success'},bookedTimeSlots:data.bookedTimeSlots}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})


export const asyncCancelParkingSlot = createAsyncThunk('parkings/cancelParkingSlot',async(id)=>{
    try{
        console.log(id)
        const {data} = await cancelBookedSlot(id);
        return {alertData:{msg:data.msg,type:'success'},id:id}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncgetUsersName = createAsyncThunk('admin/getUsersName',async()=>{
    try{
        const {data} = await getUsersName();
        return {alertData:{msg:data.msg,type:'success'},usersName:data.usersName}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncgetUserHistory = createAsyncThunk('admin/getUserHistory',async(formData)=>{
    try{
        const {data} = await getUserHistory(formData)
        return {alertData:{msg:data.msg,type:'success'},bookedTimeSlots:data.bookedTimeSlots}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncgetParkingLots = createAsyncThunk('admin/getparkingLots',async()=>{
    try{
        console.log("getting parking lots")
        const {data} = await getParkingLots();
        return {alertData:{msg:data.msg,type:'success'},parkingLots:data.parkingLots}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncgetParkingLotsNear = createAsyncThunk('admin/getparkingLotsNear',async(formData)=>{
    try{
        const {data} = await getParkingLotsNear(formData);
        return {alertData:{msg:data.msg,type:'success'},parkingLots:data.parkingLots}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncgetParkingLotHistory = createAsyncThunk('admin/getParkingLotHistory',async(formData)=>{
    try{
        const {data} = await getParkingLotHistory(formData);
        console.log(data)
        return {alertData:{msg:data.msg,type:'success'},bookedTimeSlots:data.bookedTimeSlots,parkingLotDetails:data.parkingLotDetails}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncDeleteParkingLot = createAsyncThunk('admin/removeParkingLot',async(formData)=>{
    try{
        const {data} = await deleteParkingLot(formData);
        console.log(data)
        return {alertData:{msg:data.msg,type:'success'},id:formData}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncMakeActiveLot = createAsyncThunk('admin/makeActiveLot',async(formData)=>{
    try{
        const {data} = await makeActiveParkingLot(formData);
        console.log(data)
        return {alertData:{msg:data.msg,type:'success'},id:formData}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncgetCancelledSlots = createAsyncThunk('admin/cancelledSlots',async()=>{
    try{
        const {data} = await getCancelledSlots();
        console.log(data)
        return {alertData:{msg:data.msg,type:'success'},cancelledSlots:data.cancelledSlots}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncsetProfilePic = createAsyncThunk('users/profilePic',async(formData)=>{
    try{
        const {data} = await setProfilePic(formData);
        console.log(data)
        return {msg:data.msg,type:'success'}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncSendResetEmail = createAsyncThunk('users/resetEmail',async(formData)=>{
    try{
        const {data} = await sendResetEmail(formData)
        console.log(data)
        return {msg:data.msg,type:'success'}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})

export const asyncresetPassword = createAsyncThunk('users/resetPassword',async(formData)=>{
    try{
        const {data} = await resetPassword(formData)
        console.log(data)
        return {msg:data.msg,type:'success'}
    }catch(err){
        if(err.response){
            const data = err.response.data
            console.log(data)
            return {...data,type:"error"};
        }else{
            console.log("Error",err);
        }
    }
})


const authSlice = createSlice({
    name:"auth",
    initialState:initialStore,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        setLogout:(state)=>{
            localStorage.removeItem('authToken')
            state.user = {};
            state.bookedTimeSlots = []
            state.freeParkingLots = []
            state.usersName = []
            state.parkingLotNames = []
            state.parkingLotDetails = {}
        },
        clearAlert:(state)=>{
            state.alert = {}
        },
        setAlert:(state,action)=>{
            state.alert = action.payload
        },
        clearFreeParkingLots:(state)=>{
            state.freeParkingLots = []
        },
        clearBookedTimeSlots:(state)=>{
            state.bookedTimeSlots = []
        },
        clearParkingLotDetails:(state)=>{
            state.parkingLotDetails = {}
        },
        setUserProfilePic:(state,action)=>{
            state.user = {...state.user,profilePic:action.payload}
        }
    },
    extraReducers(builder){
        builder.addCase(asyncsignUp.fulfilled,(state,action)=>{
            state.alert = action.payload
            console.log("In extra reducer")
        }).addCase(asyncsendOTP.fulfilled,(state,action)=>{
            state.alert = action.payload
            console.log("In otp reducer")
        }).addCase(asyncresendOtp.fulfilled,(state,action)=>{
            state.alert = action.payload
            console.log("In resend otp reducer")
        }).addCase(asyncverifyEmail.fulfilled,(state,action)=>{
            state.alert = action.payload
            console.log("In verifyotp reducer")
        }).addCase(asyncsignIn.fulfilled,(state,action)=>{
            state.alert = action.payload.alertData
            state.user = action.payload.userData
            console.log("In signIn reducer")
        }).addCase(asyncloadUser.fulfilled,(state,action)=>{
            if(action.payload){
                if(action.payload.msg){
                    localStorage.removeItem('authToken')
                    state.user = {};
                }else{
                    state.user = action.payload
                }
                console.log("In loaduser reducer")
            }
           
        }).addCase(asyncpostParkingLot.fulfilled,(state,action)=>{
            state.alert=action.payload
            console.log("In postParking reducer")
        }).addCase(asyncgetParkingLot.fulfilled,(state,action)=>{
            console.log(action.payload)
            if(action.payload){
                if(action.payload.msg){
                   state.alert = action.payload
                }else{
                    state.alert = action.payload.alertData
                    state.freeParkingLots = action.payload.freeParkingLots
                }
            }
            
            console.log("In get free Parking reducer")
        }).addCase(asyncBookSlot.fulfilled,(state,action)=>{
            state.alert = action.payload
            console.log("In bookslot reducer")
        }).addCase(asyncgetBookedSlots.fulfilled,(state,action)=>{
            if(action.payload){
                if(action.payload.msg){
                    state.alert=action.payload
                }else{
                    state.alert = action.payload.alertData
                    state.bookedTimeSlots = action.payload.bookedTimeSlots
                }
            }
        }).addCase(asyncpostFeedback.fulfilled,(state,action)=>{
            state.alert = action.payload
            console.log("in feedback reducer")
        }).addCase(asyncgetUsersName.fulfilled,(state,action)=>{
            
            if(action.payload){
                if(action.payload.msg){
                    state.alert=action.payload
                }else{
                    state.alert = action.payload.alertData;
                    state.usersName = action.payload.usersName;
                }
            }
        }).addCase(asyncgetUserHistory.fulfilled,(state,action)=>{
            if(action.payload){
                if(action.payload.msg){
                    state.alert=action.payload
                }else{
                    state.alert = action.payload.alertData
                    state.bookedTimeSlots = action.payload.bookedTimeSlots
                }
            }
        }).addCase(asyncgetParkingLots.fulfilled,(state,action)=>{
            if(action.payload){
                if(action.payload.msg){
                    state.alert=action.payload
                }else{
                    state.alert = action.payload.alertData
                    state.parkingLotNames = action.payload.parkingLots
                }
            }
        }).addCase(asyncgetParkingLotsNear.fulfilled,(state,action)=>{
            if(action.payload){
                if(action.payload.msg){
                    state.alert=action.payload
                }else{
                    state.alert = action.payload.alertData
                    state.parkingLotNames = action.payload.parkingLots
                }
            }
        }).addCase(asyncgetParkingLotHistory.fulfilled,(state,action)=>{
            console.log("Parking lot history reducer")
            if(action.payload){
                if(action.payload.msg){
                    console.log("Here2")
                    state.alert=action.payload
                }else{
                    console.log("Here")
                    state.alert = action.payload.alertData;
                    state.bookedTimeSlots = action.payload.bookedTimeSlots;
                    state.parkingLotDetails = action.payload.parkingLotDetails;
                }
            }
        }).addCase(asyncsetProfilePic.fulfilled,(state,action)=>{
            state.alert = action.payload
            console.log("In set profilepic reducer")
        }).addCase(asyncCancelParkingSlot.fulfilled,(state,action)=>{
            state.alert = action.payload.alertData
            state.bookedTimeSlots = state.bookedTimeSlots.map(slot=>slot._id!==action.payload.id?slot:{...slot,cancelled:true})
            console.log("In cancel booked slot reducer")
        }).addCase(asyncDeleteParkingLot.fulfilled,(state,action)=>{
            state.alert = action.payload.alertData
            state.bookedTimeSlots = state.bookedTimeSlots.map(slot=>slot.parkingLot!==action.payload.id?slot:{...slot,cancelled:true,adminCancelled:true})
            state.parkingLotDetails = {...state.parkingLotDetails,isActive:false}
            state.parkingLotNames = state.parkingLotNames.map(lot=>lot._id!==action.payload.id?lot:{...lot,isActive:false})
            console.log("delete parking lot reducer")
        }).addCase(asyncDeleteParkingLot.pending,(state,action)=>{
            state.alert = {msg:"Processing",type:"info"}
            console.log("deleet pending parking lot reducer")
        }).addCase(asyncMakeActiveLot.fulfilled,(state,action)=>{
            state.alert = action.payload.alertData
            state.parkingLotDetails = {...state.parkingLotDetails,isActive:true}
            state.parkingLotNames = state.parkingLotNames.map(lot=>lot._id!==action.payload.id?lot:{...lot,isActive:true})
            console.log("Make Active Parking Lot Reducer")
        }).addCase(asyncgetCancelledSlots.fulfilled,(state,action)=>{
            state.alert = action.payload.alertData
            state.bookedTimeSlots = action.payload.cancelledSlots
            console.log("Cancelled slots reducer")
        }).addCase(asyncSendResetEmail.fulfilled,(state,action)=>{
            state.alert = action.payload
            console.log("Reset Email reducer")
        }).addCase(asyncresetPassword.fulfilled,(state,action)=>{
            state.alert = action.payload
            console.log("Reset password reducer")
        })

    }
})



export const {setUser,setLogout,clearAlert,clearFreeParkingLots,clearBookedTimeSlots,clearParkingLotDetails,setAlert,setUserProfilePic} = authSlice.actions
export default authSlice.reducer;