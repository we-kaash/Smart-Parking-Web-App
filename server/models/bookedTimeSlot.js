const mongoose = require('mongoose')

const BookedTimeSlotSchema = mongoose.Schema({
    startTime:{
        type:Number
    },
    endTime:{
        type:Number
    },
    parkingSlot:{
        type:mongoose.Schema.Types.ObjectId
    },
    parkingLot:{
        type:mongoose.Schema.Types.ObjectId
    },
    booker:{
        type:mongoose.Schema.Types.ObjectId
    },
    vehicleType:{
        type:String,
        required:true
    },
    cancellable:{
        type:Boolean,
        default:false,
        required:true
    },
    cancelled:{
        type:Boolean,
        default:false,
        required:true
    },
    adminCancelled:{
        type:Boolean,
        default:false,
        required:true
    },
    cancelledAt:{
        type:Number
    },
    vehicleNo:{
        type:String,
        required:true
    },
    carImage:{
        type:String,
        required:true
    },
    notified:{
        type:Boolean,
        default:false
    }
})

const BookedTimeSlot = mongoose.model('BookedTimeSlot',BookedTimeSlotSchema)
module.exports = BookedTimeSlot