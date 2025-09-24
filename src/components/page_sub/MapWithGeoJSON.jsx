import { GeoJSON, useMap } from 'react-leaflet';

const MapWithGeoJSON = ({ geoData, highlightedIds, clickedId, setClickedId }) => {
  const map = useMap();

  const onEachFeature = (feature, layer) => {
    const id = feature.properties.id_kecamatan;

    layer.on({
      click: () => {
        setClickedId(id); // klik polygon → update state

        // 🔍 Zoom ke polygon
        const bounds = layer.getBounds();
        map.fitBounds(bounds, { padding: [20, 20], maxZoom: 14 });
      }
    });

    layer.bindTooltip(feature.properties.nama_kecamatan || `Kecamatan ${id}`);
  };

  return (
    <GeoJSON
      key={JSON.stringify(geoData)} // trigger re-render
      data={geoData}
      onEachFeature={onEachFeature}
      style={(feature) => {
        const id = feature.properties.id_kecamatan;
        const isHighlighted = highlightedIds.has(id);
        const isClicked = clickedId === id;

        let fillColor = '#ccc';
        if (isClicked && isHighlighted) fillColor = '#ffa500';
        else if (isClicked) fillColor = '#2c7be5';
        else if (isHighlighted) fillColor = '#f03';

        return {
          fillColor,
          weight: 2,
          opacity: 1,
          color: '#333',
          fillOpacity: 0.6
        };
      }}
    />
  );
};

export default MapWithGeoJSON;
