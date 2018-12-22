import React, { Component } from 'react';
import * as actionTypes from '../../store/actions/actionTypes'
import injectSheet from 'react-jss'
import { compose } from 'redux'
import { connect } from 'react-redux'

const styles = {
    container: {
        maxWidth: '700px',
        margin: '0 auto',
        '& div:first-child': {
            textAlign:'center'
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
        const requestedLocation = this.props.locations.find(location => {
            return location.id === this.props.match.params.id
        })
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
            this.props.onUpdateLocation(this.state.requestedLocation)
        }
    }

    render() {
        const { locations, classes } = this.props
        return (
            <div className={classes.container}>
                {this.state.requestedLocation && this.state.requestedLocation.name ?
                    <div>
                        <div>
                            <label htmlFor="name">name: </label>
                            <input id="name"
                                type="text" placeholder="name locaiotn"
                                onChange={this.handleNameLocation} value={this.state.requestedLocation.name} />
                        </div>
                        <div>
                            <label htmlFor="address">address: </label>
                            <input id="address"
                                type="text" placeholder="name locaiotn"
                                onChange={this.handleAddressLocation} value={this.state.requestedLocation.address} />
                        </div>
                        <div>
                            <label htmlFor="let">coords:(lat) </label>
                            <input id="let"
                                type="number" placeholder="lat"
                                onChange={this.handleLatLocation} value={this.state.requestedLocation.coords.lat} />
                        </div>
                        <div>
                            <label htmlFor="lng">coords:(lng) </label>
                            <input id="lng"
                                type="number" placeholder="lng"
                                onChange={this.handleLngLocation} value={this.state.requestedLocation.coords.lng} />
                        </div>
                        <div>
                            <label>category: </label>
                            <select value={this.state.requestedLocation.category} onChange={this.handleCategory}>
                                <option>choose</option>
                                {locations.map(location => (
                                    <option key={location.id}>{location.category}</option>
                                ))}
                            </select>
                            <button onClick={this.updateLocation}>update</button>
                        </div>
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
