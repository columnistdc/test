import React from "react";
import ol from "openlayers";
import * as _ from "lodash";
import { connect } from "react-redux";
import PopUpUser from "../UserPopup";

import { selectUserById } from "../../Actions";

class Map extends React.Component {
  componentDidMount() {
    const { state: { users } } = this.props;
    const features = [];
    if (users) {
      _.each(users, user => {
        const point = new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.fromLonLat(user.geometry.coordinates)
          )
        });
        point.setId(user.id);
        point.setStyle(
          new ol.style.Style({
            image: new ol.style.Circle({
              radius: 5,
              fill: new ol.style.Fill({
                color: "#fff"
              }),
              stroke: new ol.style.Stroke({
                color: user.properties.color,
                width: 1.5
              })
            })
          })
        );
        features.push(point);
      });
    }

    this.overlay = new ol.Overlay({
      element: this.popUp,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    const vectorSource = new ol.source.Vector({
      features
    });

    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    this.map = new ol.Map({
      target: this.mapTargetElement,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        vectorLayer
      ],
      view: new ol.View({
        projection: "EPSG:3857",
        center: [700000, 5000000],
        zoom: 2
      }),
      overlays: [this.overlay],
      controls: [new ol.control.ZoomSlider()]
    });

    this.map.on("click", e => {
      this.map.forEachFeatureAtPixel(e.pixel, feature => {
        this.props.selectUserById(feature.getId());
      });
    });
  }

  getDerivedStateFromProps(nextProps) {
    const { state: { selected } } = nextProps;
    const { state: { users } } = this.props;
    this.overlay.setPosition(
      ol.proj.fromLonLat(users[selected].geometry.coordinates)
    );
    this.map
      .getView()
      .setCenter(ol.proj.fromLonLat(users[selected].geometry.coordinates));
    this.map.getView().setZoom(5);
  }

  render() {
    const { state: { selected, users } } = this.props;
    return (
      <div className="map">
        <div
          ref={handleRef => {
            this.mapTargetElement = handleRef;
          }}
          className="ol-map"
        />
        <div
          id="popup"
          ref={popUp => {
            this.popUp = popUp;
          }}
          className="ol-popup"
        >
          <div id="popup-content">
            {selected && (
              <PopUpUser {..._.get(users, [selected, "properties"], "")} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  selectUserById: id => {
    dispatch(selectUserById(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
