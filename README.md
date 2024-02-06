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

```

Example usage:
```typescript
import {getTileFromLatLng} from "@gmaps-tools/tile-coordinates";

getTileFromLatLng({lat: 19.436379721550452, lng: -99.15153772681174}, 15) // {x: 7359, y: 14579, z: 15}
```

or individu

## License

`tile-coordinates` is published under the MIT licence, see the `LICENSE` file for more details.