import React from 'react'
import { withRouter, Link, BrowserRouter as Router } from 'react-router-dom'
import injectSheet from 'react-jss'

const styles = {
    dialog: {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        background: 'rgba(100,100,100,.5)',
        zIndex: '10',
        color: '#fff',
        '& > div': {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
            fontSize: '25px',
            '& > div': {
                border: '1px solid grey',
                padding: '3px 25px',
                borderRadius: '1000px',
                cursor: 'pointer'
            },
            '& > div:not(:last-child)': {
                marginRight: '40px',
                background: 'rgba(150,150,150)'
            }
        }
    }
}


const dialog = (props) => {
    const { classes } = props
    return (
            <div>
                {props.location.pathname === '/' ?
                    <div className={classes.dialog}>
                        <div>
                            {/* <Link to="/category">category</Link> */}
                            {/* <Link to="/location">location</Link> */}
                            <div onClick={() => props.history.push('/category')}>category</div>
                            <div onClick={() => props.history.push('/location')}>locations</div>
                        </div>
                    </div> : null}
            </div>
    )
}

export default injectSheet(styles)(withRouter(dialog))