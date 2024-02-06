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
```

Example usage:

```typescript
```

## License

`tile-coordinates` is published under the MIT licence, see the `LICENSE` file for more details.