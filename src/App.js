import React, { Component } from 'react';
import injectSheet from 'react-jss'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as actionTypes from './store/actions/actionTypes'
import TopBar from './components/TopBar/TopBar'
import BottomBar from './components/BottomBar/BottomBar'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import CategoryDetails from './pages/CategoryDetails/CategoryDetails'
import AddPage from './pages/AddPage/AddPage'
import Dialog from './components/Dialog/Dialog'
import EditPage from './pages/EditPage/EditPage'
import LocationEdit from './pages/LocationEdit/LocationEdit'
import MapPage from './pages/MapPage/MapPage'

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
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
    }
  }
}

class App extends Component {

  clearCategoryActive = () => {
    this.props.onRemoveActiveCategory(false)
  }

  render() {
    const { classes } = this.props
    return (
      <Router>
        <div className={classes.container}>
          <Dialog />
          <div className={classes.topApp}>
            <h1>My Locations</h1>
            <button className={classes.btnClear} onClick={this.clearCategoryActive}>Clear Category</button>
          </div>
          <BottomBar />
          <div>
            <Route path="/location" exact component={CategoryPage} />
            <Route path="/category" exact component={CategoryPage} />
            <Route path="/category add" exact component={AddPage} />
            <Route path="/location add" exact component={AddPage} />
            <Route path="/category/:id" exact component={CategoryDetails} />
            <Route path="/location/:id" exact component={CategoryDetails} />
            <Route path="/category/edit/:id" exact component={EditPage} />
            <Route path="/location/edit/:id" exact component={LocationEdit} />
            <Route path="/location/map/:id" exact component={MapPage} />
          </div>
        </div>
      </Router>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onRemoveActiveCategory: (f) => dispatch({ type: actionTypes.REMOVE_ACTIVE_CATEGORY, f })
  }
}

export default compose(connect(null, mapDispatchToProps), injectSheet(styles))(App)
