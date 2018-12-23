import React, { Component } from 'react';
import TopBar from '../../components/TopBar/TopBar'
import { connect } from 'react-redux'
import List from '../../components/List/List'

class CategoryPage extends Component {

    render() {
        const { match, categories, locations } = this.props
        return (
            <div>
                {match.url.indexOf('category') !== -1 ? <TopBar /> : <TopBar openMap="open in map" />}
                <List categories={categories} locations={locations} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        locations: state.locations
    }
}

export default connect(mapStateToProps)(CategoryPage)