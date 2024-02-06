// functions are implemented from the following source for tile -> latlng:
// https://developers.google.com/maps/documentation/javascript/examples/map-coordinates#maps_map_coordinates-typescript
// for latlng -> tile, it is just some solving the equations the other way round


///////////////////////// tile from latlng

export function getTileFromLat(lat: number, zoom: number): number{
	// if lat is outside boundaries, just break
	if(Math.abs(lat) > 90) throw new Error(`Invalid latitude ${lat}`);
	// if zoom is < 0 or not an integer, also break
	if(zoom < 0 || !Number.isInteger(zoom)) throw new Error(`Invalid zoom level ${zoom}`);
	// if zoom === 0, everything is 0
	if(zoom === 0) return 0;

	const scale = 1 << zoom;
	// ySin is limited in order to not fully break mathematics. in effect, this forces lat to be in the [-0.9999, 0.9999] range
	const ySin = Math.min(
		Math.max(
			Math.sin(lat * Math.PI/180),
			-0.9999
		),
		0.9999
	);
	return Math.floor((0.5 - Math.log((1 + ySin) / (1 - ySin)) / (4 * Math.PI)) * scale);
}

export function getTileFromLng(lng: number, zoom: number): number{
	// if lng is outside boundaries, break
	if(Math.abs(lng) > 180) throw new Error(`Invalid longitude ${lng}`);
	// if zoom is < 0 or not an integer, break
	if(zoom < 0 || !Number.isInteger(zoom)) throw new Error(`Invalid zoom level ${zoom}`);
	// if zoom is 0, everything is 0
	if(zoom === 0) return 0;

	return Math.floor((0.5 + lng / 360) * (1 << zoom));
}

export function getTileFromLatLng(
	coordinates: {lat: number, lng: number},
	zoom: number
): {x: number, y: number, z: number}{
	// we could *technically* make things ever so slightly faster by rewriting all code since 1 << zoom wouldn't need recalculating
	// but it is such a miniscule timesave (as it is a binary operation) that it's not worth
	return {
		x: getTileFromLng(coordinates.lng, zoom),
		y: getTileFromLat(coordinates.lat, zoom),
		z: zoom
	};
}
///////////////////////// latlng from tile