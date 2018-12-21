import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'
import injectSheet from 'react-jss'

const styles = {
    container: {
        textAlign: 'center'
    }
}

class AddPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newCategory: {
                name: '',
            },
            newLocation: {
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
            this.props.onAddCategory({ ...this.state.newCategory, id: Math.random() + '' })
        }
    }

    addLocation = () => {
        if (this.state.newLocation.name &&
            this.state.newLocation.address &&
            this.state.newLocation.category &&
            this.state.newCategory.category !== 'choose' &&
            this.state.newLocation.coords.lat &&
            this.state.newLocation.coords.lng) {
            this.props.onAddLocation({ ...this.state.newLocation, id: Math.random()+'' })
        }
    }
    render() {
        const { classes, categories } = this.props
        return (
            <div className={classes.container}>
                <h2>Add</h2>
                {this.props.match.url.indexOf('category') !== -1 ?
                    <div>
                        <label htmlFor="name">name: </label>
                        <input id="name" type="text" onChange={this.handleCategoryName} />
                        <button onClick={this.addCategory}>Add</button>
                    </div> :
                    <div>
                        <div>
                            <label htmlFor="name">name: </label>
                            <input id="name" type="text" placeholder="name" onChange={this.handleLocationName} />
                        </div>
                        <div>
                            <label htmlFor="address">address: </label>
                            <input id="address" type="text" placeholder="address" onChange={this.handleAddressName} />
                        </div>
                        <div>
                            <label htmlFor="address">coordinates: </label>
                            <input id="address" type="number" placeholder="lat" onChange={this.handleLat} />
                            <input id="address" type="number" placeholder="lng" onChange={this.handleLng} />
                        </div>
                        <div>
                            <label htmlFor="address">category: </label>
                            <select onChange={this.handleCategory}>
                                <option>choose</option>
                                {categories.map(category => (
                                    <option key={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={this.addLocation}>add</button>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddCategory: (category) => dispatch({ type: actionTypes.ADD_CATEGORY, category }),
        onAddLocation: (location) => dispatch({ type: actionTypes.ADD_LOCATION, location })
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), injectSheet(styles))(AddPage)