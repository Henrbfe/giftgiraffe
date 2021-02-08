import React from "react";
import { ButtonBase, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import GiraffePicture from '../../pictures/giraffe-icon.png';
import GiftPicture from '../../pictures/gift-icon.png';
import SettingsPicture from '../../pictures/settings-icon.png';
import WishlistPicture from '../../pictures/wishlist-icon.png';


const images = [
    {
        icon: GiraffePicture,
        title: 'Home',
        width: '25%'
    },
    {
        icon: GiftPicture,
        title: 'Gifts',
        width: '25%'
    },
    {
        icon: WishlistPicture,
        title: 'Wishlist',
        width: '25%'
    },
    {
        icon: SettingsPicture,
        title: 'Settings',
        width: '25%'
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
      },
      image: {
        position: 'relative',
        height: 150 ,
        [theme.breakpoints.down('xs')]: {
          width: '100% !important', // Overrides inline-style
          height: 100,
        },
        '&:hover, &$focusVisible': {
          zIndex: 1,
          '& $imageBackdrop': {
            opacity: 0.15,
          },
          '& $imageMarked': {
            opacity: 0,
          },
          '& $imageTitle': {
            border: '4px solid currentColor',
          },
        },
      },
      focusVisible: {},
      imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2b1d0e',
      },
      imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      },
      imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.warning.dark,
        opacity: 0.8,
        transition: theme.transitions.create('opacity'),
      },
      imageTitle: {
        position: 'relative',
        fontSize: '30px',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
      },
      imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: '#2b1d0e',
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
      },
}));

export default function Navigationbar({user}) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            {images.map((image) => (
                <ButtonBase
                    component={Link}
                    to={"/" + image.title}
                    focusRipple
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                    }}>
                    <span
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${image.icon})`,
                            backgroundSize: `30%`,
                            backgroundRepeat: `no-repeat`,
                        }}/>
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}>
                            {image.title}
                            <span className={classes.imageMarked} />
                        </Typography>
                    </span>
                </ButtonBase>
            ))}
        </div>
    );
}
