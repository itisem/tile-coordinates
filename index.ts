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

	// edge cases
	if(lat === 90) return 0;
	if(lat === -90) return scale - 1;

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

	const scale = 1 << zoom;

	// if zoom is 0, everything is 0
	if(zoom === 0) return 0;

	// edge cases
	if(lng === -180) return 0;
	if(lng === 180) return scale - 1;

	return Math.floor((0.5 + lng / 360) * scale);
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
///////////////////////// latlng from tile. calculated using solving the above formula for lat / lng


// helper functions for unrounded tiles. not exported

function getLatFromUnroundedTile(y: number, z: number): number{
	const scale = 1 << z;

	// tile errors
	if(y > scale || y < 0) throw new Error(`Invalid tile y ${y}`);
	if(z < 0) throw new Error(`Tile zoom ${z} must be at least 0`);
	if(!Number.isInteger(z)) throw new Error(`Tile zoom ${z} must be an integer`);

	// special cases. *should* not fail in normal calculations, but better safe than sorry
	if(y === scale) return -90;
	if(y === 0) return 90;

	const fraction = Math.exp(4 * Math.PI * (0.5 - y / scale));
	const ySin = (fraction - 1)/(fraction + 1);
	return Math.asin(ySin) * 180 / Math.PI;
}

function getLngFromUnroundedTile(x: number, z: number): number{
	const scale = 1 << z;

	// tile errors
	if(x > scale || x < 0) throw new Error(`Invalid tile x ${x}`);
	if(z < 0) throw new Error(`Tile zoom ${z} must be at least 0`);
	if(!Number.isInteger(z)) throw new Error(`Tile zoom ${z} must be an integer`);

	// special cases. *should* not fail in normal calculations, but better safe than sorry
	if(x === scale) return 180;
	if(x === 0) return -180;

	return (x / scale - 0.5) * 360;
}

// usable functions

export function getCenterLatFromTile(y: number, z: number): number{
	if(!Number.isInteger(y)) throw new Error(`Tile ${y} must be an integer`);
	return getLatFromUnroundedTile(y + 0.5, z);
}

export function getCenterLngFromTile(x: number, z: number): number{
	if(!Number.isInteger(x)) throw new Error(`Tile ${x} must be an integer`);
	return getLngFromUnroundedTile(x + 0.5, z);
}

export function getCenterLatLngFromTile(
	tile: {x: number, y: number, z: number}
): {lat: number, lng: number}{
	return {
		lat: getCenterLatFromTile(tile.y, tile.z),
		lng: getCenterLngFromTile(tile.x, tile.z)
	}
};

export const getLatFromTile = getCenterLatFromTile;
export const getLngFromTile = getCenterLngFromTile;
export const getLatLngFromTile = getCenterLatLngFromTile;

export function getBoundaryLatFromTile(y: number, z: number): {
	top: number;
	bottom: number;
}{
	if(!Number.isInteger(y)) throw new Error(`Tile ${y} must be an integer`);
	return {
		top: getLatFromUnroundedTile(y, z),
		bottom: getLatFromUnroundedTile(y + 1, z)
	};
}

export function getBoundaryLngFromTile(x: number, z: number): {
	left: number;
	right: number;
}{
	if(!Number.isInteger(x)) throw new Error(`Tile ${x} must be an integer`);
	return {
		left: getLngFromUnroundedTile(x, z),
		right: getLngFromUnroundedTile(x + 1, z)
	};
}

export function getBoundaryLatLngFromTile(tile: {x: number, y: number, z: number}): {
	left: number;
	right: number;
	top: number;
	bottom: number;
}{
	if(!Number.isInteger(tile.x)) throw new Error(`Tile x ${tile.x} must be an integer`);
	if(!Number.isInteger(tile.y)) throw new Error(`Tile y ${tile.y} must be an integer`);
	return {
		left: getLngFromUnroundedTile(tile.x, tile.z),
		right: getLngFromUnroundedTile(tile.x + 1, tile.z),
		top: getLatFromUnroundedTile(tile.y, tile.z),
		bottom: getLatFromUnroundedTile(tile.y + 1, tile.z)
	};
}