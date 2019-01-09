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
        this.getLocationById()
    }


    getLocationById = () => {
        const { id } = this.props.match.params;
        const { locations } = this.props;
        const requestedLocation = locations.find(location => location.id === id)
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
                    bootstrapURLKeys={{ key: 'AIzaSyBT1uuJZ2OSPmHepbc1p9JpIiBsaQs6C-M' }}
                    // defaultCenter={{
                    //     lat: 59.95,
                    //     lng: 30.33
                    //   }}
                    center={this.state.center}
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