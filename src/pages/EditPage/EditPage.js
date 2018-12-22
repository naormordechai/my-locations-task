import React, { Component } from 'react';
import * as actionTypes from '../../store/actions/actionTypes'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { compose } from 'redux'


const styles = {
    container: {
        maxWidth:'700px',
        margin:'0 auto',
        '& div:first-child':{
            textAlign:'center'
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
        const requestedCategory = this.props.categories.find(category => {
            return category.id === this.props.match.params.id
        })
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
        }
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.container}>
                <div>
                    <label htmlFor="name">name</label>
                    <input onChange={this.handlerName} type="text" id="name"
                        placeholder="name" value={this.state.requestedCategory.name} />
                    <button onClick={this.handlerUpdate}>update</button>
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
        onUpdateCategory: (category) => dispatch({ type: actionTypes.UPDATE_CATEGORY, category })
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), injectSheet(styles))(EditPage)
