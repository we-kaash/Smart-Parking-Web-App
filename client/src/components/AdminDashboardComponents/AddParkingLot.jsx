import { Button, Grid, Grow, Paper, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {styled} from '@mui/material/styles'
import dayjs from 'dayjs'
import { format } from 'date-fns'
import Alert from '../../Utils/Alert'
import { useTheme } from "@emotion/react"
import { MapContainer, TileLayer, useMap,Marker,Popup,useMapEvents,MapConsumer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import { asyncpostParkingLot } from "../../state"
import AddBox from "@mui/icons-material/AddBox"
import { DateTimePicker, LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const initialState = {
    parkName:'',noOfCarSlots:0,noOfBikeSlots:0,address:'',parkingChargesCar:0,parkingChargesBike:0,lat:'19.1485',lng:'73.133',openTime:dayjs('2022-04-17T15:30'),closeTime:dayjs('2022-04-17T15:30')
}   

const AddParkingLot = () => {
    const theme = useTheme()
    const styles = {
        form: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70%",
            margin: "auto",
            "@media (max-width : 500px)": {
                width: "100%"
            },
        },
        formContainer: {
            marginTop: "1rem"
        },

        formCont: {
            marginTop: "5em",
            width: "auto",
            marginBottom:"2em"
        },
        ipFields: {
            flexGrow: 1,
        },
        titlePaper: {
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            position: "relative",
            height: "auto",
            backgroundColor: theme.palette.primary.dark,
            padding: "0.5em 0 0.5em 0",
            color: "#ffc",
            fontWeight: 600
        },
    }

    const LocationMarker = ()=>{
        
        const map = useMapEvents({
          click(e) {
            const loc = []
            loc.push(e.latlng['lat'])
            loc.push(e.latlng['lng'])
            setPosition(loc)
          },
          load: ()=> {
            console.log("Loaded map")
          },
          zoomend: () => {
            if (!map) return;
            const position = map.getCenter();
            const loc = []
            loc.push(position.lat)
            loc.push(position.lng)
            setPosition(loc);
            setZoomLvl(map.getZoom());
          },
          dragend: () => {
            if (!map) return;
            const position = map.getCenter();
            const loc = []
            loc.push(position.lat)
            loc.push(position.lng)
            setPosition(loc);
            setZoomLvl(map.getZoom());
          },
        })
      
        // useEffect(()=>{
        //     if(!foundCurrLoc){
        //         map.locate().on("locationfound",(e)=>{
        //             console.log("Helo->>>>>>>>",e.latlng['lat'],e.latlng['lng'])
        //             console.log("rinning")
        //             const loc = []
        //             loc.push(e.latlng['lat'])
        //             loc.push(e.latlng['lng'])
        //             setPosition(loc)
        //             map.flyTo(e.latlng, zoomLvl);
        //             setFoundCurrLoc(true)
    
        //         })
                
        //     }
            
        // },[map])
        return null;
    }

    useEffect(()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                 setPosition([position.coords.latitude,position.coords.longitude])
            }, () => {
                console.log("Not able to locate")
            });
       }
    },[])
    
    const Div = styled('div')(( ) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    }));
    

    const [formData, setFormData] = useState(initialState)
    const user = useSelector(state => state.auth.user)
    const alert = useSelector(state => state.auth.alert)
    const [foundCurrLoc,setFoundCurrLoc] = useState(false)
    // const [openTime, setOpenTime] = useState()
    // const [closeTime, setCloseTime] = useState();
    const dispatch = useDispatch()
    const [zoomLvl,setZoomLvl] = useState(13);
    const [position,setPosition]= useState([19.1485, 73.133])
    
    const navigate = useNavigate()

    
    useEffect(() => {
        if (!user._id) {
            navigate("/login")
        } else {
            if (user.role === "user") {
                navigate("/home")
            }
        }
    }, [user])

    useEffect(()=>{
        if(alert.msg=="Parking Lot Added"){
            navigate("/admindb")
        }
    },[alert])
    useEffect(()=>{
        if(position!==undefined){
            // console.log(position)
            setFormData({...formData,lat:position[0].toString(),lng:position[1].toString()})
        }
        
    },[position])
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        const data ={...formData,openTime:formData.openTime.format('HH').toString(),closeTime:formData.closeTime.format('HH').toString()}
        console.log(data)
        dispatch(asyncpostParkingLot(data))
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleChangeOpen = (newValue) => {
        console.log(newValue)
        setFormData({...formData,openTime:newValue})
    }

    const handleChangeClose = (newValue)=>{
        console.log(newValue)
        setFormData({...formData,closeTime:newValue})
    }
      
    return (
        <Grow in>
            <Container sx={styles.formCont}>
                <Alert />
                <form autoComplete="off" noValidate sx={styles.form} onSubmit={handleSubmit}>
                    <Grid container sx={styles.formContainer} spacing={3}>
                        <Grid item xs={12} sm={12}>
                                <Button sx={{padding:"1em"}} fullWidth variant="contained" startIcon={<AddBox fontSize="large"/>}>
                                    <Typography variant="h3">
                                        Add a New Parking Lot
                                    </Typography>
                                </Button>
                        </Grid>
                        <Grid item sm={12} xs={12} sx={styles.ipFields}>
                            <TextField
                                name="parkName"
                                type="text"
                                variant="outlined"
                                required
                                fullWidth
                                label="Enter The name of Parking"
                                onChange={handleChange}
                                value={formData.parkName}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} sx={styles.ipFields}>
                            <Grid container>
                                <Grid item sm={5}>
                                    <Div>{"Number of Slots for Bike"}</Div>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        name="noOfBikeSlots"
                                        type="number"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Bike"
                                        
                                        onChange={handleChange}
                                        value={formData.noOfBikeSlots}
                                    />
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid item sm={6} xs={12} sx={styles.ipFields}>
                            <Grid container>
                                <Grid item sm={5}>
                                    <Div>{"Number of Slots for Car"}</Div>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        name="noOfCarSlots"
                                        type="number"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Car"
                                        
                                        onChange={handleChange}
                                        value={formData.noOfCarSlots}
                                    />
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid item sm={6} xs={12} sx={styles.ipFields}>
                            <Grid container>
                                <Grid item sm={5}>
                                    <Div>{"Parking Charges for Bike / HR"}</Div>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        name="parkingChargesBike"
                                        type="number"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Bike"
                                        
                                        onChange={handleChange}
                                        value={formData.parkingChargesBike}
                                    />
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid item sm={6} xs={12} sx={styles.ipFields}>
                            <Grid container>
                                <Grid item sm={5}>
                                    <Div>{"Parking Charges for Car / HR"}</Div>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        name="parkingChargesCar"
                                        type="number"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Car"
                                        
                                        onChange={handleChange}
                                        value={formData.parkingChargesCar}
                                    />
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Paper sx={styles.titlePaper}>
                                <Typography variant="h3" sx={styles.tit}>
                                    Set Open and Close Time
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={0} sm={2}></Grid>
                        <Grid item xs={6} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StaticTimePicker label="Select Open Time"  value={formData.openTime} renderInput={(params)=><TextField {...params} />}  views={['hours']} onChange={handleChangeOpen} defaultValue={dayjs('2022-04-17T15:30')} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StaticTimePicker minTime={formData.openTime} label="Select Close Time"  value={formData.closeTime}  renderInput={(params)=><TextField {...params} />} views={['hours']} onChange={handleChangeClose} defaultValue={dayjs('2022-04-17T15:30')} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={0} sm={2}></Grid>
                        <Grid item xs={12} sx={styles.ipFields}>
                            <TextField
                                name="address"
                                type="text"
                                variant="outlined"
                                required
                                fullWidth
                                label="Enter The address"
                                onChange={handleChange}
                                value={formData.address}
                            />
                        </Grid>
                        <Grid item xs={12} sx={styles.ipFields}>
                            <Grid container>
                                <Grid item xs={12} sm={4}>
                                    
                                    <Button variant="contained">Pick a location</Button>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Grid container>
                                        <Grid item sm={5}>
                                            <Div>{"Latitude"}</Div>
                                        </Grid>
                                        <Grid item sm={6}>
                                            <TextField
                                                name="lat"
                                                type="text"
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Latitude"
                                                
                                                onChange={handleChange}
                                                value={formData.lat}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                <Grid container>
                                        <Grid item sm={5}>
                                            <Div>{"Longitude"}</Div>
                                        </Grid>
                                        <Grid item sm={6}>
                                            <TextField
                                                name="lng"
                                                type="text"
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Longitude"
                                                
                                                onChange={handleChange}
                                                value={formData.lng}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <MapContainer  style={{ height: "400px" }} center={position} zoom={zoomLvl} >
                                        <TileLayer 
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={position}>
                                            <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
                                            </Popup>
                                        </Marker>
                                        
                                        <LocationMarker/>
                                    </MapContainer>
                                </Grid>
                            </Grid>
                            
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Button sx={{width:"100%",padding:"1em"}} variant="contained" type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>

        </Grow>
    )
}
export default AddParkingLot;