import React from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'

const styles = {
    fWeight: {
        fontWeight: '700'
    },
    container:{
        textAlign:'center',
        border:'1px solid grey',
        width:'400px',
        margin:'0 auto',
        boxShadow:'1px 2px 1px #000'
    }
}

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

    renderDetails = (classes) => {
        if (this.state.requestedItem && this.state.requestedItem.name) {
            if (this.props.match.url.indexOf('category') !== -1) {
                return <div> <p>name: <span className={classes.fWeight}>{this.state.requestedItem.name}</span></p></div>
            } else {
                return (
                    <div>
                        <p>name: <span className={classes.fWeight}>{this.state.requestedItem.name}</span></p>
                        <p>address: <span className={classes.fWeight}>{this.state.requestedItem.address}</span></p>
                        <p>category: <span className={classes.fWeight}>{this.state.requestedItem.category}</span></p>
                        <p>coords(lat): <span className={classes.fWeight}>{this.state.requestedItem.coords.lat}</span></p>
                        <p>coords(lng): <span className={classes.fWeight}>{this.state.requestedItem.coords.lng}</span></p>
                    </div>
                )
            }
        }

    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.container}>
                {this.renderDetails(classes)}
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

export default connect(mapStateToProps)(injectSheet(styles)(CategoryDetails))