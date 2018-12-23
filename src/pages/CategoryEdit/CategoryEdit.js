import React, { Component } from 'react';
import * as actionTypes from '../../store/actions/actionTypes'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { compose } from 'redux'


const styles = {
    container: {
        maxWidth: '400px',
        padding: '15px 0',
        margin: '0 auto',
        border: '1px solid grey',
        borderRadius: '5px',
        '& div:first-child': {
            textAlign:'center',
            display: 'flex',
            padding: '0 10px',
            '& label': {
                flex: '0 0 30%'
            },
            '& input': {
                flex: '1',
                padding: '3px 10px',
                borderRadius: '5px',
                border: '1px solid grey',
            }
        },
        '& div:last-child':{
            textAlign:'center',
            marginTop:'7px'
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

class EditPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestedCategory: {
                name: '',
                id: ''
            }
        }
    }

    componentDidMount() {
        this.getRequestedCategory()
    }

    getRequestedCategory = () => {
        const requestedCategory = this.props.categories.find(category => category.id === this.props.match.params.id)
        this.setState({
            ...this.state,
            requestedCategory
        })
    }

    handlerName = e => {
        this.setState({
            ...this.state,
            requestedCategory: {
                ...this.state.requestedCategory,
                name: e.target.value
            }
        })
    }

    handlerUpdate = () => {
        if (this.state.requestedCategory.name) {
            this.props.onUpdateCategory(this.state.requestedCategory)
            this.props.onUpdateActiveItem(this.state.requestedCategory)
            this.props.history.push('/category')
        }
    }
    render() {
        const { classes } = this.props
        const { requestedCategory } = this.state
        return (
            <div className={classes.container}>
                <div className={classes.box}>
                    <label htmlFor="name">name</label>
                    <input onChange={this.handlerName} type="text" id="name"
                        placeholder="name" value={requestedCategory.name} />
                </div>
                <div>
                    <button className={classes.btnUpdate} onClick={this.handlerUpdate}>update</button>
                </div>
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
        onUpdateCategory: (category) => dispatch({ type: actionTypes.UPDATE_CATEGORY, category }),
        onUpdateActiveItem: (updatedItem) => dispatch({ type: actionTypes.UPDATE_ACTIVE_ITEM, updatedItem })
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), injectSheet(styles))(EditPage)
