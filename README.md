# tile-coordinates

A simple typescript tool to convert between latlng coordinates and map tile numbers used by Google Maps, OpenStreetMap, Mapbox et al.

## Usage

Install the package with `npm i @gmaps-tools/tile-coordinates`

The following functions are exposed:

```typescript
// gets a tile y coordinate from latitude + zoom level
function getTileFromLat(lat: number, zoom: number): number;
// gets a tile x coordinate from longitude + zoom level
function getTileFromLng(lng: number, zoom: number): number;
// gets a tile x and y coordinate from coordinates + zoom level
function getTileFromLatLng(
	coordinates: {lat: number, lng: number},
	zoom: number
): {
    x: number;
    y: number;
    z: number; // always equal to the zoom level
}
// gets a tile's central latitude from its y and z coordinates
// alias: getLatFromTile
function getCenterLatFromTile(y: number, z: number): number;
// gets a tile's central longitude from its y and z coordinates
// alias: getLngFromTile
function getCenterLngFromTile(x: number, z: number): number;
// gets a tile's midpoiont from its information
// alias: getLatLngFromTile
function getCenterLatLngFromTile(
	tile: {x: number, y: number, z: number}
): {
	lat: number,
	lng: number
};
// gets a tile's latitude boundaries from its y and z coordinates
function getBoundaryLatFromTile(y: number, z: number): {
    top: number;
    bottom: number;
};
// gets a tile's longitude boundaries from its x and z coordinates
export declare function getBoundaryLngFromTile(x: number, z: number): {
    left: number;
    right: number;
};
// gets a tile's boundaries from its information
export declare function getBoundaryLatLngFromTile(tile: {
    x: number;
    y: number;
    z: number;
}): {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

```

Example usage:
```typescript
import {getTileFromLatLng, getCenterLatLngFromTile, getBoundaryLatLngFromTile} from "@gmaps-tools/tile-coordinates";

getTileFromLatLng({lat: 19.436379721550452, lng: -99.15153772681174}, 15); // {x: 7359, y: 14579, z: 15}
getCenterLatLngFromTile({x: 7359, y: 14579, z: 15}) // {lat: 19.440694401302856, lng: -99.1461181640625}
getBoundaryLatLngFromTile({x: 7359, y: 14579, z: 15}) // {left: -99.151611328125, right: -99.140625, top: 19.445874298215944, bottom: 19.435514339097814}                             
```

## License

`tile-coordinates` is published under the MIT licence, see the `LICENSE` file for more details.