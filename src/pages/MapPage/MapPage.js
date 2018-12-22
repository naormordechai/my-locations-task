import React, { Component } from 'react';
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            center: {},
            zoom: 15
        }
    }

    componentDidMount() {
        this.geyLocationById()
    }


    geyLocationById = () => {
        const { id } = this.props.match.params;
        const { locations } = this.props;
        const requestedLocation = locations.find(location => {
            return location.id === id
        })
        this.setState({
            ...this.state,
            center: requestedLocation.coords
        })
    }


    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDXvdByHYIUrNGQ9KyHjLAmc9lDePopXuU' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >
                    <AnyReactComponent
                        lat={this.state.center.lat}
                        lng={this.state.center.lng}
                        text={'current position'}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        locations: state.locations
    }
}

export default connect(mapStateToProps)(MapPage);