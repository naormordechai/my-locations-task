import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import StorageService from '../../services/StorageService'
import * as actionTypes from '../../store/actions/actionTypes'
import injectSheet from 'react-jss'

const styles = {
    container: {
        maxWidth: '400px',
        border: '1px solid grey',
        margin: '0 auto',
        padding: '20px 10px',
        borderRadius: '5px',
        '@media(max-width:550px)':{
            padding:'5px 10px'
        }
    },
    addTitle:{
        textAlign: 'center',
        margin:'0 0 10px 0'
    },
    field: {
        display: 'flex',
        marginBottom: '5px',
        '& label': {
            flex: '0 0 30%'
        },
        '& input, & select': {
            flex: '1',
            padding: '3px',
            borderRadius: '5px',
            outline: 'none',
            border: '1px solid grey'
        },
    },
    add: {
        textAlign: 'center',
        '& button': {
            width: '40%',
            borderRadius: '1000px',
            outline: 'none',
            border: '2px solid grey',
            padding: '3px 20px',
            fontSize: '15px',
            transition: '.3s',
            fontWeight: '700',
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

}



class AddPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newCategory: {
                name: '',
                id: ''
            },
            newLocation: {
                id: '',
                name: '',
                address: '',
                coords: {
                    lat: '',
                    lng: ''
                },
                category: ''
            }
        }
    }


    handleCategoryName = e => {
        this.setState({
            ...this.state,
            newCategory: {
                ...this.state.newCategory,
                name: e.target.value
            }
        })
    }

    handleLocationName = e => {
        this.setState({
            ...this.state,
            newLocation: {
                ...this.state.newLocation,
                name: e.target.value
            }
        })
    }

    handleAddressName = e => {
        this.setState({
            ...this.state,
            newLocation: {
                ...this.state.newLocation,
                address: e.target.value
            }
        })
    }

    handleLat = e => {
        this.setState({
            ...this.state,
            newLocation: {
                ...this.state.newLocation,
                coords: {
                    ...this.state.newLocation.coords,
                    lat: e.target.value
                }
            }
        })
    }

    handleLng = e => {
        this.setState({
            ...this.state,
            newLocation: {
                ...this.state.newLocation,
                coords: {
                    ...this.state.newLocation.coords,
                    lng: e.target.value
                }
            }
        })
    }

    handleCategory = e => {
        this.setState({
            ...this.state,
            newLocation: {
                ...this.state.newLocation,
                category: e.target.value
            }
        })
    }

    addCategory = () => {
        if (this.state.newCategory.name) {
            let category = {
                ...this.state.newCategory,
                id: Math.random() + ''
            }
            StorageService.store('requestedCategories', this.props.categories.concat(category))
            this.props.onAddCategory(category)
            this.props.history.push('/category')
        }
    }

    addLocation = () => {
        if (this.state.newLocation.name &&
            this.state.newLocation.address &&
            this.state.newLocation.category &&
            this.state.newCategory.category !== 'choose' &&
            this.state.newLocation.coords.lat &&
            this.state.newLocation.coords.lng) {
            let location = {
                ...this.state.newLocation,
                id: Math.random() + ''
            }
            location.coords.lat = +location.coords.lat
            location.coords.lng = +location.coords.lng
            StorageService.store('requestedLocations', this.props.locations.concat(location))
            this.props.onAddLocation(location)
            this.props.history.push('/location')

        }
    }

    search() {
        // var geocoder = new google.maps.Geocoder();
        // var input = this.$refs.input.value
        // geocoder.geocode({ 'address': input }, (results, status) => {
        //     if (status === google.maps.GeocoderStatus.OK) {
        //         console.log('xx');

        //         // this.loc.lat = results[0].geometry.location.lat();
        //         // this.loc.lng = results[0].geometry.location.lng();
        //         // this.$store.commit('setPosition', this.loc)
        //         // this.$store.dispatch({ type: 'loadParkings' });


        //     } else {
        //         alert("Geocode was not successful for the following reason: " + status);
        //     }
        // });

    }
    render() {
        const { classes, categories } = this.props
        return (
            <div>
                <h2 className={classes.addTitle}>Add</h2>
                <div className={classes.container}>
                    {this.props.match.url.indexOf('category') !== -1 ?
                        <div>
                            <div className={classes.field}>
                                <label htmlFor="name">name: </label>
                                <input id="name" type="text" onChange={this.handleCategoryName} />
                            </div>
                            <div className={classes.add}>
                                <button onClick={this.addCategory}>add</button>
                            </div>
                        </div> :
                        <div>
                            <div className={classes.field}>
                                <label htmlFor="name">name: </label>
                                <input id="name" type="text" placeholder="name" onChange={this.handleLocationName} />
                            </div>
                            <div className={classes.field}>
                                <label htmlFor="address">address: </label>
                                <input onKeyUp={this.search} ref={e => this.addressRef = e} id="address" type="text" placeholder="address" onChange={this.handleAddressName} />
                            </div>
                            <div className={classes.field}>
                                <label htmlFor="lat">coords:(lat) </label>
                                <input id="lat" type="number" placeholder="lat" onChange={this.handleLat} />
                            </div>
                            <div className={classes.field}>
                                <label htmlFor="lng">coords:(lng) </label>
                                <input id="lng" type="number" placeholder="lng" onChange={this.handleLng} />
                            </div>
                            <div className={classes.field}>
                                <label>category: </label>
                                <select onChange={this.handleCategory}>
                                    <option>choose</option>
                                    {categories.map(category => (
                                        <option key={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={classes.add}>
                                <button onClick={this.addLocation}>add</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
        locations: state.locations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddCategory: (category) => dispatch({ type: actionTypes.ADD_CATEGORY, category }),
        onAddLocation: (location) => dispatch({ type: actionTypes.ADD_LOCATION, location })
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), injectSheet(styles))(AddPage)