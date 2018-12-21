import React, { Component } from 'react';
import TopBar from '../../components/TopBar/TopBar'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { compose } from 'redux'
import CategoryList from '../../components/CategoryList/CategoryList'

const styles = {

}

class CategoryPage extends Component {
    render() {
        console.log('ppppp', this.props);

        return (
            <div>
                <TopBar />
                <CategoryList categories={this.props.categories} locations={this.props.locations} /> :
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

export default compose(
    connect(mapStateToProps),
    injectSheet(styles)
)(CategoryPage)