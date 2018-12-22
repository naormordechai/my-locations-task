import React from 'react'
import * as actionTypes from '../../store/actions/actionTypes'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import injectSheet from 'react-jss'

const styles = {
    container: {
        maxWidth: '100%',
        background: '#000',
        color: '#fff',
        marginBottom:'30px',
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-around',
        height: '20px',
    }
}


class TopBar extends React.Component {

    goToDetails = () => {
        if (this.props.history.location.pathname.indexOf('category') !== -1 &&
            this.props.activeItem && this.props.activeItem.typeTopic === 'category') {
            this.props.history.push(`/category/${this.props.activeItem.id}`)
        } else {
            if (this.props.activeItem && this.props.activeItem.typeTopic === 'location'
                && this.props.history.location.pathname.indexOf('category') === -1) {
                this.props.history.push(`/location/${this.props.activeItem.id}`)
            }
        }
    }

    handlerAdd = () => {
        if (this.props.history.location.pathname.indexOf('category') !== -1) {
            this.props.history.push('/category add')
        } else {
            this.props.history.push('/location add')
        }
    }

    handlerRemove = () => {
        if (this.props.match.url.indexOf('category') !== -1) {
            if (this.props.activeItem) {
                this.props.onRemoveCategory(this.props.activeItem)
            }
        } else {
            if (this.props.activeItem) {
                this.props.onRemoveLocation(this.props.activeItem)
            }
        }
    }

    handlerEdit = () => {
        if (this.props.match.url.indexOf('category') !== -1) {
            if (this.props.activeItem && this.props.activeItem.typeTopic === 'category') {
                this.props.history.push(`${this.props.match.url}/edit/${this.props.activeItem.id}`)
            }
        } else {
            if (this.props.activeItem && this.props.activeItem.typeTopic === 'location') {
                this.props.history.push(`${this.props.match.url}/edit/${this.props.activeItem.id}`)
            }
        }
    }

    goToMapPage = () => {
        if (this.props.activeItem) {
            this.props.history.push(`${this.props.match.url}/map/${this.props.activeItem.id}`)
        }
    }

    render() {
        const { classes, openMap } = this.props
        return (
            <div className={classes.container}>
                <div className={classes.topBar}>
                    <div onClick={this.goToDetails}>view</div>
                    <div onClick={this.handlerAdd}>add</div>
                    <div onClick={this.handlerRemove}>remove</div>
                    <div onClick={this.handlerEdit}>edit</div>
                    {openMap ? <div onClick={this.goToMapPage}>{openMap}</div> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeItem: state.activeItem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRemoveCategory: (category) => dispatch({ type: actionTypes.REMOVE_CATEGORY, category }),
        onRemoveLocation: (location) => dispatch({ type: actionTypes.REMOVE_LOCATION, location })
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), injectSheet(styles))(withRouter(TopBar))
