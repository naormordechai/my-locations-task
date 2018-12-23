import React, { Component } from 'react';
import * as actionTypes from '../../store/actions/actionTypes'
import injectSheet from 'react-jss'
import { compose } from 'redux'
import { connect } from 'react-redux'

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        border: '1px solid grey',
        borderRadius: '5px',
        padding: '15px 0',
        '& div:first-child': {
            textAlign: 'center'
        }
    },
    box: {
        display: 'flex',
        '& label': {
            flex: '0 0 30%'
        },
        '& input, & select': {
            flex: '1',
            padding: '3px 10px',
            borderRadius: '5px',
            border: '1px solid grey',
            margin: '0 30px 10px 0'
        }
    },
    btnUpdate: {
        width: '35%',
        borderRadius: '1000px',
        outline: 'none',
        border: '2px solid grey',
        padding: '3px 20px',
        fontSize: '15px',
        fontWeight: '700',
        transition: '.3s',
        cursor: 'pointer',
        '&:hover': {
            background: '#aaa',
            color: '#fff',
            padding: '3px 25px',
        },
        '&:active': {
            transform: 'scale(0.9)'
        }
    }
}

class LocationEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestedLocation: {}
        }
    }

    componentDidMount() {
        this.getRequestedLocation()
    }

    getRequestedLocation = () => {
        const requestedLocation = this.props.locations.find(location => location.id === this.props.match.params.id)
        this.setState({
            ...this.state,
            requestedLocation
        })
    }

    handleNameLocation = e => {
        this.setState({
            ...this.state,
            requestedLocation: {
                ...this.state.requestedLocation,
                name: e.target.value
            }
        })
    }

    handleAddressLocation = e => {
        this.setState({
            ...this.state,
            requestedLocation: {
                ...this.state.requestedLocation,
                address: e.target.value
            }
        })
    }

    handleLatLocation = e => {
        this.setState({
            ...this.state,
            requestedLocation: {
                ...this.state.requestedLocation,
                coords: {
                    ...this.state.requestedLocation.coords,
                    lat: e.target.value
                }
            }
        })
    }

    handleLngLocation = e => {
        this.setState({
            ...this.state,
            requestedLocation: {
                ...this.state.requestedLocation,
                coords: {
                    ...this.state.requestedLocation.coords,
                    lng: e.target.value
                }
            }
        })
    }

    handleCategory = e => {
        this.setState({
            ...this.state,
            requestedLocation: {
                ...this.state.requestedLocation,
                category: e.target.value
            }
        })
    }

    updateLocation = () => {
        if (this.state.requestedLocation.name &&
            this.state.requestedLocation.address &&
            this.state.requestedLocation.category &&
            this.state.requestedLocation.category !== 'choose' &&
            this.state.requestedLocation.coords.lat &&
            this.state.requestedLocation.coords.lng) {
            let { requestedLocation } = this.state
            requestedLocation.coords.lat = +requestedLocation.coords.lat
            requestedLocation.coords.lng = +requestedLocation.coords.lng
            this.props.onUpdateLocation(requestedLocation)
            this.props.history.push('/location')
        }
    }

    render() {
        const { locations, classes } = this.props
        const { requestedLocation } = this.state
        return (
            <div className={classes.container}>
                {requestedLocation && requestedLocation.name ?
                    <div>
                        <div className={classes.box}>
                            <label htmlFor="name">name: </label>
                            <input id="name"
                                type="text" placeholder="location"
                                onChange={this.handleNameLocation} value={requestedLocation.name} />
                        </div>
                        <div className={classes.box}>
                            <label htmlFor="address">address: </label>
                            <input id="address"
                                type="text" placeholder="name locaiotn"
                                onChange={this.handleAddressLocation} value={requestedLocation.address} />
                        </div>
                        <div className={classes.box}>
                            <label htmlFor="let">coords:(lat) </label>
                            <input id="let"
                                type="number" placeholder="lat"
                                onChange={this.handleLatLocation} value={requestedLocation.coords.lat} />
                        </div>
                        <div className={classes.box}>
                            <label htmlFor="lng">coords:(lng) </label>
                            <input id="lng"
                                type="number" placeholder="lng"
                                onChange={this.handleLngLocation} value={requestedLocation.coords.lng} />
                        </div>
                        <div className={classes.box}>
                            <label>category: </label>
                            <select value={requestedLocation.category} onChange={this.handleCategory}>
                                <option>choose</option>
                                {locations.map(location => (
                                    <option key={location.id}>{location.category}</option>
                                ))}
                            </select>
                        </div>
                        <div><button className={classes.btnUpdate} onClick={this.updateLocation}>update</button></div>
                    </div> : null
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateLocation: (location) => dispatch({ type: actionTypes.UPDATE_LOCATION, location })
    }
}

const mapStateToProps = state => {
    return {
        locations: state.locations
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), injectSheet(styles))(LocationEdit)
