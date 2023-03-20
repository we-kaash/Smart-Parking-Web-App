const mongoose = require('mongoose')
const PointSchema = require('./Point')

const ParkingLotSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    noOfCarSlots:{
        type:Number,
        required:true
    },
    noOfBikeSlots:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    parkingChargesCar:{
        type:Number,
        required:true
    },
    parkingChargesBike:{
        type:Number,
        required:true
    },
    openTime:{
        type:Number
    },
    closeTime:{
        type:Number
    },
    carParkingSlots:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ParkingSlot'
    }],
    bikeParkingSlots:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ParkingSlot'
    }],
    location:{
        type:PointSchema,
        required:true
    },
    lotImages:{
        type:[String]
    },
    isActive:{
        type:Boolean,
        default:true,
        required:true
    }
})

ParkingLotSchema.index({location:"2dsphere"})
const ParkingLot = mongoose.model('ParkingLot',ParkingLotSchema)

module.exports = ParkingLot