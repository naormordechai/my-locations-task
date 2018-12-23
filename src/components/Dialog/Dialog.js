import React from 'react'
import { withRouter } from 'react-router-dom'
import injectSheet from 'react-jss'

const styles = {
    dialog: {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        transform: 'translate(0)',
        background: 'rgba(100,100,100,.5)',
        zIndex: '10',
        color: '#fff',
        transition: '.3s',
        '& > div': {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '150px',
            fontSize: '18px',
            fontWeight: '500',
            border: '1px solid grey',
            width: '50%',
            transform: 'translate(50%, 100%)',
            padding: '15px',
            background: '#444',
            borderRadius: '5px',
            boxShadow: '1px 2px 1px #000',
            '@media(max-width:570px)': {
                fontSize: '4vw',
                width: '90%',
                transform: 'translate(5%, 100%)',

            },
            '& > div': {
                border: '1px solid grey',
                padding: '5px 25px',
                borderRadius: '1000px',
                cursor: 'pointer',
                transition: '.3s',
                '@media(max-width:570px)': {
                    padding: '1.5vw 5vw',
                },
                '&:hover': {
                    background: '#fff',
                    color: '#000',
                }
            },
            '& > div:not(:last-child)': {
                marginRight: '40px',
                background: 'rgba(10,10,10)',
                '@media(max-width:570px)': {
                    marginRight: '4vw'
                },
            }
        }
    }
}


const goToReuestedPage = (requestedPage, props, dialogRef) => {
    dialogRef.current.style.transform = 'translate(-100%, 0)'
    setTimeout(() => {
        props.history.push(requestedPage)
    }, 300);
}

const dialog = (props) => {

    let dialogRef = React.createRef();
    const { classes } = props
    return (
        <div>
            {props.location.pathname === '/' ?
                <div ref={dialogRef} className={classes.dialog}>
                    <div>
                        <div onClick={() => goToReuestedPage('/category', props, dialogRef)}>category</div>
                        <div onClick={() => goToReuestedPage('/location', props, dialogRef)}>locations</div>
                    </div>
                </div> : null}
        </div>
    )
}

export default injectSheet(styles)(withRouter(dialog))