import { Avatar, Box, Button, Divider, Grid, Grow, Link, List, ListItem, ListItemAvatar, ListItemText, MobileStepper, Paper, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import mainImage from '../../images/landingImg.svg'
import heroImage from '../../images/hero_parking.svg'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@emotion/react'
import Alert from "../../Utils/Alert";
import { Container } from '@mui/system'
import SearchBar from '@mkyy/mui-search-bar'
import SearchIcon from '@mui/icons-material/Search';
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import descData from './descData'

const LandingPage = () => {

    const theme = useTheme()
    const styles = {
        box1: {
            bgcolor: 'red',
            boxShadow: 1,
            borderRadius: 1,
            p: 1,
            minWidth: 300,
        },
        bgImg: {
            paddingTop: "2em",
            // maxHeight:"100vh",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1800px',
            backgroundPosition: '90%-25%',
            backgroundBlendMode: "multiply",
            marginTop: "5em",

        },
        heroLeft: {
            padding: "2em",
            gap: "2em"
        },
        heroImage: {
            maxWidth: "70%"
        },
        featureCont: {
            padding: "1em"
        },
        linkName: {
            color: "black",
            transition: "0.5s",
            paddingTop: "0.3em",
            paddingX: "1em",
            "&:hover": {
                color: "#E2F0F9",
                textShadow: "0 0 5px #E2F0F9",
            },
            textDecoration: 'none'
        },

        parent: {
            padding: "20px",
            backgroundColor: "white",
            textAlign: "center",
            height: "100%",
            width: "100%"
        },
        content:{
            textAlign: "center",
            zIndex: "10",
            fontSize: "20px",
            fontWeight: "400",
            fontFamily: "'Source Code Pro', monospace",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            color: "#eae7dc",
            "@media (max-width : 700px)": {
            fontSize: "30px",
            },
        },
        text: {
            "@media (max-width : 700px)": {
              fontSize: "25px",
            },
          },
          smallText: {
            "@media (max-width : 700px)": {
              fontSize: "12px",
            },
          },
        
          contentBold: {
            background: "-webkit-linear-gradient(#e73426, #e85a4f)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
        
            "@media (max-width : 700px)": {
              textAlign: "center",
              top: "30%",
              left: "50%",
              fontSize: "30px",
            },
          },
          sliderCont:{
            width: "100%",
            height: "100%",
            position:"fixed", /* add this code for position fixed */
            top:"0px", /* set top and left 0 */
            left:"0px"
          },
          carouselPaper:{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          },
          carouselImg:{
            width:"1000px",
            // height:"400px",
            display: 'block',
            maxWidth: 400,
            overflow: 'hidden',
          }
    }
    
    const user = useSelector(state => state.auth.user)
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleStepChange = (step) => {
        setActiveStep(step);
      };
      const maxSteps = 3
    const navigate = useNavigate()


    useEffect(() => {
        if (user._id) {
            if (user.role === "admin") {
                navigate("/admindb")
            } else
                navigate("/home")
        }
    }, [user])

    const handleSearchClick = () => {
        navigate("/register")
    }
    return (
        <Grow in>
            <Container sx={styles.bgImg} maxWidth="1400px">
                <Grid container justifyItems="center" alignItems="center">
                    <Alert />
                    <Grid item sm={6} xs={12}>
                        <Paper sx={{backgroundColor:theme.palette.primary.dark}}>
                            <Grid container sx={styles.heroLeft} justifyContent="center">
                                <Grid item>
                                    <Typography color="white" sx={{ fontWeight: "bold"}} variant='h2' component='h2' >START YOUR PARKING JOURNEY</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color="white"  sx={{ fontWeight: "bold"}} variant='body' component='h3' >Find new places to park your vehicle.</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <SearchBar placeholder='Enter a location' width="100%" onChange={handleSearchClick} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button color="secondary" sx={{ margin: "auto",paddingX: "2em",paddingY:"1em" }} component={RouterLink} to="/login" variant="contained" endIcon={<SearchIcon />}>Search</Button>
                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
                    <Grid item sm={4} sx={{margin:"auto"}}>
                        <Box component="img" width="100%" alt="parking image" src={heroImage} />
                    </Grid>
                </Grid>
                <hr style={{ borderTop: "10px solid #666", borderRadius: "5px", width: "50%" }} />
                
                <Carousel interval={1} showArrows={true} showThumbs={false} >
                    {
                        descData.map((item,index)=>(
                            <div key={index}>
                                <img src={item.img} />
                                <h1 className="legend" style={{fontSize:"20px",bottom:"120px",color:"GrayText",background:"#0b1013"}}>{item.heading}</h1>
                                <h2 className="legend" style={{fontSize:"16px",bottom:"70px",color:"green",background:"#223231"}}>{item.subHeading}</h2>
                                <h3 className="legend" style={{fontSize:"14px",bottom:"20px",color:"cyan",background:"#455a64"}}>{item.description}</h3>
                            </div>
                        ))
                    }
                    
                </Carousel>
                <Grid container sx={styles.featureCont}>
                    <Grid item sm={6} xs={12}>
                        <Grid container sx={styles.heroLeft}>
                            <Grid item xs={8}>
                                <Typography sx={{ fontWeight: "bold" }} variant='h2' component='h2' >What's different about Manage?</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h5' component='h5'>Manage provides all the functionality your team needs, without the complexity. Our software is tailor-made for modern digital product teams.</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <List sx={{ width: '100%', maxWidth: "90%", bgcolor:theme.palette.primary.dark }}>
                            <ListItem alignItems="flex-start" sx={{ marginBottom: "1em" }}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg">
                                        01
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                                            Track company-wide progress
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            variant="h6"
                                            color="text.secondary"
                                        >
                                            See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way down to the smallest of details. Never lose sight of the bigger picture again.
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem alignItems="flex-start" sx={{ marginBottom: "1em" }}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg">
                                        02
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                                            Advanced built-in reports
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            variant="h6"
                                            color="text.secondary"
                                        >
                                            Set internal delivery estimates and track progress toward company goals. Our customisable dashboard helps you build out the reports you need to keep key stakeholders informed.
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <Divider variant="fullWidth" component="li" />

                            <ListItem alignItems="flex-start" sx={{ marginBottom: "1em" }}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg">
                                        03
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                                            Everything you need in one place
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            variant="h6"
                                            color="text.secondary"
                                        >
                                            Stop jumping from one service to another to communicate, store files, track tasks and share documents. Manage offers an all-in-one team productivity solution.
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default LandingPage;