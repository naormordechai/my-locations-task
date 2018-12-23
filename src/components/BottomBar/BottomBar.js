import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import injectSheet from 'react-jss';

const styles = {
    container: {
        position: 'relative',
        top: 'calc(100vh - 195px)',
        width: '100%',
        background: '#aaa',
        borderRadius:'5px',
        color: '#fff',
        padding: '10px 2px'
    },
    bottomBar: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    active: {
        opacity: '.6'
    },
    link:{
        textDecoration:'none',
        border:'1px solid grey',
        padding:'3px 30px',
        borderRadius:'5px',
        transtion:'.3s',
        '&:hover':{
            borderColor:'#000'
        }
    }
}

const bottomBar = (props) => {
    const { classes } = props
    return (
        <div className={classes.container}>
            <div className={classes.bottomBar}>
                <NavLink className={classes.link} activeClassName={classes.active} to="/category">Category</NavLink>
                <NavLink className={classes.link} activeClassName={classes.active} to="/location">Location</NavLink>
            </div>
        </div>
    )
}

export default injectSheet(styles)(withRouter(bottomBar))