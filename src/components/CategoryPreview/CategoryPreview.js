import React from 'react'
import * as actionTypes from '../../store/actions/actionTypes'
import { connect } from 'react-redux'

class CategoryPreview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeCategory: {
                isActive: false,
            }
        }
    }

    updateActiveCategory = (item) => {
        this.props.click(item)
        this.setState({
            ...this.state,
            activeCategory: {
                ...item,
                isActive: true
            }
        }, () => {
            this.props.onClikcCategory({ ...this.state.activeCategory, typeTopic: 'category' })
        })
    }

    updateActiveLocation = (item) => {
        this.props.click(item)
        this.props.onClikcCategory({ ...item, typeTopic: 'location' })
    }

    render() {
        const { category, location } = this.props
        return (
            <div>
                {category ?
                    <div onClick={() => this.updateActiveCategory(category)}>
                        <div>
                            category name: <span style={{ color: '#000', fontWeight: '700' }}>{category.name}</span>
                        </div>
                    </div> :
                    <div onClick={() => this.updateActiveLocation(location)}>
                        <div>
                            location name: <span style={{ color: '#000', fontWeight: '700' }}>{location.name}</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToDispatch = dispatch => {
    return {
        onClikcCategory: (category) => dispatch({ type: actionTypes.ACTIVE_CATEGORY, category })
    }
}

export default connect(null, mapStateToDispatch)(CategoryPreview)