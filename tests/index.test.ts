import {
	getTileFromLat, getTileFromLng, getTileFromLatLng,
	getCenterLatFromTile, getCenterLngFromTile, getCenterLatLngFromTile
} from "../index";

// a whole bunch of valid tile to coordinate pairings, manually checked using osm & google maps pre-rendered tiles
const pairings = [
	{
		name: "Oventic, MX",
		lat: 16.92595077286934, lng: -92.76079422071341,
		x: 127051, y: 237127, z: 19
	},
	{
		name: "Trier, DE",
		lat: 49.75389787642599, lng: 6.635666447058901,
		x: 8493, y: 5573, z: 14
	},
	{
		name: "Ciudad de México, MX",
		lat: 19.436379721550452, lng: -99.15153772681174,
		x: 114, y: 227, z: 9
	},
	{
		name: "Null island",
		lat: 0, lng: 0,
		x: 8, y: 8, z: 4
	},
	{
		name: "South America",
		lat: -33, lng: -66,
		x: 0, y: 1, z: 1
	},
	{
		name: "anywhere",
		lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180,
		x: 0, y: 0, z: 0
	},
	{
		name: "Antarctica",
		lat: -84.33082874368671, lng: 45.027138776404634,
		x: 80, y: 125, z: 7
	}
]

describe("getTileFromLat", () => {
	test("Invalid lat", () => {
		expect(() => getTileFromLat(90.00001, 10)).toThrow();
		expect(() => getTileFromLat(-91.314, 1)).toThrow();
	});
	test("Invalid zoom", () => {
		expect(() => getTileFromLat(60, -1)).toThrow();
		expect(() => getTileFromLat(60, 3.333333)).toThrow();
	});

	for(let pairing of pairings){
		test(`${pairing.name}: lat ${pairing.lat}, zoom ${pairing.z}, y ${pairing.y}`, () => {
			expect(getTileFromLat(pairing.lat, pairing.z)).toEqual(pairing.y);
		});
	}
});

describe("getTileFromLng", () => {
	test("Invalid lng", () => {
		expect(() => getTileFromLng(180.00001, 10)).toThrow();
		expect(() => getTileFromLng(-181.314, 1)).toThrow();
	});
	test("Invalid zoom", () => {
		expect(() => getTileFromLng(60, -1)).toThrow();
		expect(() => getTileFromLng(60, 3.333333)).toThrow();
	});

	for(let pairing of pairings){
		test(`${pairing.name}: lng ${pairing.lng}, zoom ${pairing.z}, x ${pairing.x}`, () => {
			expect(getTileFromLng(pairing.lng, pairing.z)).toEqual(pairing.x);
		});
	}
});

describe("getTileFromLatLng", () => {
	test("Invalid lat", () => {
		expect(() => getTileFromLatLng({lat: 90.00001, lng: 10}, 10)).toThrow();
		expect(() => getTileFromLatLng({lat: -91.314, lng: 99}, 1)).toThrow();
	});
	test("Invalid lng", () => {
		expect(() => getTileFromLatLng({lat: 10, lng: 180.00001}, 10)).toThrow();
		expect(() => getTileFromLatLng({lat: 69, lng: -181.314}, 1)).toThrow();
	});
	test("Invalid zoom", () => {
		expect(() => getTileFromLatLng({lat: 0.666, lng: 66.6}, -1)).toThrow();
		expect(() => getTileFromLatLng({lat: 0.666, lng: 66.6}, 3.333333)).toThrow();
	});

	for(let pairing of pairings){
		test(`${pairing.name}: coords ${pairing.lat},${pairing.lng}, zoom ${pairing.z}, tile ${pairing.x},${pairing.y}`, () => {
			expect(getTileFromLatLng(
				{lat: pairing.lat, lng: pairing.lng},
				pairing.z
			)).toEqual({
				x: pairing.x,
				y: pairing.y,
				z: pairing.z
			});
		});
	}
});

describe("getCenterLatFromTile", () => {
	test("Invalid tile y", () => {
		expect(() => getCenterLatFromTile(-1, 10)).toThrow();
		expect(() => getCenterLatFromTile(1024, 10)).toThrow();
		expect(() => getCenterLatFromTile(2.99, 10)).toThrow();
	});
});

describe("getCenterLngFromTile", () => {
	test("Invalid tile x", () => {
		expect(() => getCenterLngFromTile(-1, 10)).toThrow();
		expect(() => getCenterLngFromTile(1024, 10)).toThrow();
		expect(() => getCenterLngFromTile(2.99, 10)).toThrow();
	});
});

describe("getCenterLatLngFromTile", () => {
	test("Invalid tile x", () => {
		expect(() => getCenterLatLngFromTile({x: -1, y: 10}, 10)).toThrow();
		expect(() => getCenterLatLngFromTile({x: 1024, y: 10}, 10)).toThrow();
		expect(() => getCenterLatLngFromTile({x: 2.99, y: 10}, 10)).toThrow();
	});
	test("Invalid tile y", () => {
		expect(() => getCenterLatLngFromTile({x: 10, y: -1}, 10)).toThrow();
		expect(() => getCenterLatLngFromTile({x: 10, y: 1024}, 10)).toThrow();
		expect(() => getCenterLatLngFromTile({x: 10, y: 2.99}, 10)).toThrow();
	});
});