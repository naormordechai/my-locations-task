import React from 'react'
import { withRouter, Link, Route } from 'react-router-dom'
import CategoryPage from '../../pages/CategoryPage/CategoryPage'
import injectSheet from 'react-jss';

const styles = {
    container: {
        position: 'relative',
        top: 'calc(100vh - 150px)',
        width: '100%',
        background: '#000',
        color: '#fff',
        padding: '6px 2px'
    },
    bottomBar: {
        display: 'flex',
        justifyContent: 'space-evenly'
    }
}

const bottomBar = (props) => {
    const { classes } = props
    return (
        <div className={classes.container}>
            <div className={classes.bottomBar}>
                <Link to="/category">Category</Link>
                <Link to="/location">Location</Link>
            </div>
        </div>
    )
}

export default injectSheet(styles)(withRouter(bottomBar))