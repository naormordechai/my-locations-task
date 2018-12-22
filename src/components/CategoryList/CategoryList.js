import React from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import CategoryPreview from '../CategoryPreview/CategoryPreview'

const styles = {
    preview: {
        maxWidth: '60%',
        margin: '0 auto',
        background: 'rgba(100,100,100,.8)',
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
        borderRadius: '5px',
        '& > *': {
            marginBottom: '20px',
            padding: '5px 0',
            cursor: 'pointer'

        }
    },
    sortStyleBox: {
        textAlign: 'center',
        margin: '20px 0',
        '& button:first-child': {
            marginRight: '20px'
        }
    }
}

// need to initialize state with array of locations/categories, dependent match url.


class CategoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: '',
            requestedItems: []
        }
    }

    componentDidMount() {
        if (this.props.match.url.indexOf('category') !== -1) {
            this.setState({
                ...this.state,
                requestedItems: this.props.categories
            })
        } else {
            this.setState({
                ...this.state,
                requestedItems: this.props.locations
            })
        }
    }

    updateActiveCategory = (item) => {
        this.setState({
            ...this.state,
            activeItem: item
        })
    }

    renderLocations = (classes, activeCategory) => {
        let newLocations
        if (activeCategory.isActive) {
            newLocations = this.state.requestedItems.map(location => {
                if (location.category === activeCategory.name) {
                    return (
                        <div className={classes.preview} key={location.id}
                            style={this.state.activeItem.id === location.id ? { opacity: '.5' } : null}>
                            <CategoryPreview location={location} click={() => this.updateActiveCategory(location)} />
                        </div>
                    )
                }
            })
        } else {
            newLocations = this.state.requestedItems.map(location => (
                <div className={classes.preview} key={location.id}
                    style={this.state.activeItem.id === location.id ? { opacity: '.5' } : null}>
                    <CategoryPreview location={location} click={() => this.updateActiveCategory(location)} />
                </div>
            ))
        }
        return newLocations
    }

    clearSort = () => {
        this.setState({
            ...this.state,
            requestedItems: this.props.locations
        })
    }

    doSort = () => {
        let locations = [...this.state.requestedItems]
        locations.sort((a, b) => {
            var name1 = a.name.toUpperCase()
            var name2 = b.name.toUpperCase()
            if (name1 < name2) {
                return -1
            }
            if (name1 > name2) {
                return 1
            }
            return 0
        })
        this.setState({
            ...this.state,
            requestedItems: locations
        })
    }


    render() {
        const { classes, locations, activeCategory } = this.props
        const { requestedItems } = this.state
        return (
            <div>
                {this.props.match.url.indexOf('category') !== -1 ?
                    <div>
                        {requestedItems.map(category => (
                            <div className={classes.preview} key={category.id}
                                style={activeCategory.id === category.id && activeCategory.isActive ? { opacity: '.5' } : null}>
                                <CategoryPreview category={category} click={() => this.updateActiveCategory(category)} />
                            </div>
                        ))}
                    </div> :
                    <div>
                        <div className={classes.sortStyleBox}>
                            <button onClick={this.doSort}>sort</button>
                            <button onClick={this.clearSort}>clear</button>
                        </div>
                        {this.renderLocations(classes, activeCategory)}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeCategory: state.activeCategory,
        categories: state.categories,
        locations: state.locations
    }
}

export default compose(connect(mapStateToProps), injectSheet(styles))(withRouter(CategoryList))
