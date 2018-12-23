import React, { Component } from 'react';
import injectSheet from 'react-jss'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as actionTypes from './store/actions/actionTypes'
import BottomBar from './components/BottomBar/BottomBar'
import InitPage from './pages/InitPage/InitPage'
import Details from './pages/Details/Details'
import AddPage from './pages/AddPage/AddPage'
import Dialog from './components/Dialog/Dialog'
import CategoryEdit from './pages/CategoryEdit/CategoryEdit'
import LocationEdit from './pages/LocationEdit/LocationEdit'
import MapPage from './pages/MapPage/MapPage'
import './App.css';


const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial'
  },
  topApp: {
    textAlign: 'center'
  },
  block: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    background: 'rgba(100,100,100,.5)',
    zIndex: '10'
  },
  btnClear: {
    outline: 'none',
    border: '1px solid grey',
    padding: '3px 20px',
    borderRadius: '1000px',
    fontSize: '17px',
    color: '#fff',
    background: '#444',
    cursor: 'pointer',
    transition: '.3s',
    fontWeight: '300',
    '&:hover': {
      color: '#000',
      background: '#fff',
      padding: '3px 25px'
    },
    '&:active': {
      transform: 'scale(.9)'
    }
  }
}

class App extends Component {

  clearCategoryActive = () => {
    if (this.props.activeItem) {
      if (this.props.activeItem.typeTopic === 'category') {
        this.props.onRemoveActiveItem()
      }
    }
    this.props.onRemoveActiveCategory()
  }

  render() {
    const { classes, activeItem } = this.props
    return (
      <Router>
        <div className={classes.container}>
          <Dialog />
          <div className={classes.topApp}>
            <h1>My Locations</h1>
            {activeItem ? <h3>active: {activeItem.name} :)</h3> : <h3>nothing is active :(</h3>}
            <button className={classes.btnClear} onClick={this.clearCategoryActive}>Clear Category</button>
          </div>
          <BottomBar />
          <div>
            <Route path="/location" exact component={InitPage} />
            <Route path="/category" exact component={InitPage} />
            <Route path="/category add" exact component={AddPage} />
            <Route path="/location add" exact component={AddPage} />
            <Route path="/category/:id" exact component={Details} />
            <Route path="/location/:id" exact component={Details} />
            <Route path="/category/edit/:id" exact component={CategoryEdit} />
            <Route path="/location/edit/:id" exact component={LocationEdit} />
            <Route path="/location/map/:id" exact component={MapPage} />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToDispatch = state => {
  return {
    activeItem: state.activeItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRemoveActiveCategory: (f) => dispatch({ type: actionTypes.REMOVE_ACTIVE_CATEGORY }),
    onRemoveActiveItem: () => dispatch({ type: actionTypes.REMOVE_ACTIVE_ITEM })

  }
}

export default compose(connect(mapStateToDispatch, mapDispatchToProps), injectSheet(styles))(App)
