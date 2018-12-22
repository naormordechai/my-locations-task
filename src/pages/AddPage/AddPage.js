import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'
import injectSheet from 'react-jss'

const styles = {
    container: {
        maxWidth: '350px',
        border: '1px solid grey',
        margin: '0 auto',
        padding: '5px 10px',
        borderRadius: '5px',
        '& > h2': {
            textAlign: 'center'
        }
    },
    field: {
        display: 'flex',
        marginBottom: '10px',
        '& label': {
            flex: '0 0 40%'
        },
        '& input': {
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
            width: '50%',
            borderRadius: '1000px',
            outline: 'none',
            border: '1px solid grey',
            backgroundColor: '#222',
            color: '#fff',
            padding: '3px 20px',
            fontSize: '15px',
            transition: '.3s',
            '&:hover': {
                padding: '3px 25px',
                backgroundColor: '#ccc',
                color: '#222',
                cursor: 'pointer'
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
            this.props.onAddLocation({ ...this.state.newLocation, id: Math.random() + '' })
        }
    }
    render() {
        const { classes, categories } = this.props
        return (
            <div className={classes.container}>
                <h2>Add</h2>
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
                            <input id="address" type="text" placeholder="address" onChange={this.handleAddressName} />
                        </div>
                        <div className={classes.field}>
                            <label htmlFor="lat">coordinates:(lat) </label>
                            <input id="lat" type="number" placeholder="lat" onChange={this.handleLat} />
                        </div>
                        <div className={classes.field}>
                            <label htmlFor="lng">coordinates:(lng) </label>
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