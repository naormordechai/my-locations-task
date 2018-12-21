import React from 'react'
import { connect } from 'react-redux'

class CategoryDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            requestedItem: null,
            requetedItems: []
        }
    }

    componentDidMount() {
        if (this.props.match.url.indexOf('category') !== -1) {
            this.setState({
                ...this.state,
                requetedItems: this.props.categories
            }, () => {
                this.getRequestedItem()
            })
        } else {
            this.setState({
                ...this.state,
                requetedItems: this.props.locations
            }, () => {
                this.getRequestedItem()
            })
        }
    }

    getRequestedItem = () => {
        const requestedItem = this.state.requetedItems.find(item => {
            return item.id === this.props.match.params.id
        })
        this.setState({
            ...this.state,
            requestedItem
        })
    }

    render() {
        console.log(this.state);
        
        return (
            <div style={{ textAlign: 'center' }}>
                {this.state.requestedItem && this.state.requestedItem.name ?
                    <div>{this.state.requestedItem.name}</div> : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
        locations: state.locations
    }
}

export default connect(mapStateToProps)(CategoryDetails)