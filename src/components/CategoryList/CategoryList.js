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
    }
}

class CategoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: '',
        }
    }

    updateActiveCategory = (item) => {
        this.setState({
            ...this.state,
            activeItem: item
        })
    }

    renderLocations = (locations, classes, activeCategory) => {
        let newLocations
        if (activeCategory.isActive) {
            newLocations = locations.map(location => {
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
            newLocations = locations.map(location => (
                <div className={classes.preview} key={location.id}
                    style={this.state.activeItem.id === location.id ? { opacity: '.5' } : null}>
                    <CategoryPreview location={location} click={() => this.updateActiveCategory(location)} />
                </div>
            ))
        }
        return newLocations
    }


    render() {
        const { categories, classes, locations, activeCategory } = this.props
        return (
            <div>
                {this.props.match.url.indexOf('category') !== -1 ?
                    <div>
                        {categories.map(category => (
                            <div className={classes.preview} key={category.id}
                                style={activeCategory.id === category.id && activeCategory.isActive ? { opacity: '.5' } : null}>
                                <CategoryPreview category={category} click={() => this.updateActiveCategory(category)} />
                            </div>
                        ))}
                    </div> :
                    <div>
                        {this.renderLocations(locations, classes, activeCategory)}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeCategory: state.activeCategory
    }
}

export default compose(connect(mapStateToProps), injectSheet(styles))(withRouter(CategoryList))
