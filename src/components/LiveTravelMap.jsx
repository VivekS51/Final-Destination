import React, { useState, useEffect, useRef } from 'react';
import { destinationsData } from '../data/destinations';
import { realImages } from '../data/realImages';
import { allDestinationsList } from '../data/allDestinations';

// Custom Map Themes
const THEME_STYLES = {
    standard: [],
    retro: [
        { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
        { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c9b2a6" }] },
        { featureType: "administrative.land_parcel", elementType: "geometry.stroke", stylers: [{ color: "#dcd2be" }] },
        { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#ae9e90" }] },
        { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
        { featureType: "poi", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
        { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#93817c" }] },
        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e14e37" }] },
        { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#447530" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f1e6" }] },
        { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#fdfcf8" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f8c967" }] },
        { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#e9bc62" }] },
        { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#e98d58" }] },
        { featureType: "road.highway.controlled_access", elementType: "geometry.stroke", stylers: [{ color: "#db8555" }] },
        { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#806b63" }] },
        { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
        { featureType: "transit.line", elementType: "labels.text.fill", stylers: [{ color: "#8f7d77" }] },
        { featureType: "transit.line", elementType: "labels.text.stroke", stylers: [{ color: "#ebe3cd" }] },
        { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#b9d3c2" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#92998d" }] }
    ],
    silver: [
        { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
        { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
        { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
        { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
        { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
        { featureType: "road.administrative", elementType: "geometry", stylers: [{ color: "#e0e0e0" }] },
        { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
        { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
        { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
        { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
        { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }
    ],
    night: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
        { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
        { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
        { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
        { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
        { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
        { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
        { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
        { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] }
    ]
};

// Waypoint Input Removed

const LiveTravelMap = ({ initialDestination = null }) => {
    const mapRef = useRef(null);
    const originInputRef = useRef(null);
    const destInputRef = useRef(null);

    // Core Map Instances
    const [mapInstance, setMapInstance] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [leafletRoutingControl, setLeafletRoutingControl] = useState(null);

    // State Variables
    const [userLocation, setUserLocation] = useState(null);
    const [origin, setOrigin] = useState('Your Location');
    const [destination, setDestination] = useState(initialDestination || '');
    const [travelMode, setTravelMode] = useState('DRIVING');
    const [routeInfo, setRouteInfo] = useState(null);
    const [directionsSteps, setDirectionsSteps] = useState([]);
    const [weather, setWeather] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [engine, setEngine] = useState('loading'); // 'google', 'leaflet', 'loading'
    const [isLoading, setIsLoading] = useState(false);
    const [routePath, setRoutePath] = useState(null);
    const [isNavigating, setIsNavigating] = useState(false);
    const navVehicleRef = useRef(null);
    const navAnimationRef = useRef(null);

    // Tabs & Panels Control
    const [activeTab, setActiveTab] = useState('route'); // 'route', 'nearby', 'settings'
    const [mapTheme, setMapTheme] = useState('night');
    const [mapType, setMapType] = useState('roadmap'); // 'roadmap', 'satellite', 'terrain', 'hybrid'
    
    // Layers
    const [showTraffic, setShowTraffic] = useState(false);
    const [showTransit, setShowTransit] = useState(false);
    const [showBicycling, setShowBicycling] = useState(false);

    // Nearby places
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [nearbyCategory, setNearbyCategory] = useState('tourist_attraction');
    const [showNearbyOnMap, setShowNearbyOnMap] = useState(true);

    // Refs for Google layers and markers
    const trafficLayerRef = useRef(null);
    const transitLayerRef = useRef(null);
    const bicyclingLayerRef = useRef(null);
    const poiMarkersRef = useRef([]);
    const userMarkerRef = useRef(null);
    const infoWindowRef = useRef(null);

    // Compute all unique places for the autocomplete datalist
    const uniquePlaces = React.useMemo(() => {
        const places = [
            ...destinationsData.map(d => `${d.title}, ${d.state}, India`),
            ...allDestinationsList.flatMap(region => 
                region.states.flatMap(state => 
                    state.places.map(p => `${p}, ${state.name ? state.name + ', ' : ''}India`)
                )
            )
        ];
        return [...new Set(places)].sort();
    }, []);

    // Dynamic Script Loader
    const loadScript = (url, id, callback) => {
        if (window.google && window.google.maps) {
            callback();
            return;
        }
        if (document.getElementById(id)) {
            const interval = setInterval(() => {
                if (window.google && window.google.maps) {
                    clearInterval(interval);
                    callback();
                }
            }, 100);
            return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.id = id;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = callback;
    };

    const loadCss = (url, id) => {
        if (document.getElementById(id)) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.id = id;
        document.head.appendChild(link);
    };

    // Geolocation retrieval on mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                },
                (error) => {
                    console.error("Error getting location", error);
                    setUserLocation({ lat: 28.6139, lng: 77.2090 }); // Default New Delhi
                }
            );
        } else {
            setUserLocation({ lat: 28.6139, lng: 77.2090 });
        }
    }, []);

    // Main Google / Leaflet map initialization
    useEffect(() => {
        if (!userLocation || !mapRef.current) return;

        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        
        if (apiKey) {
            loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`, 'google-maps-sdk', () => {
                setEngine('google');
                
                // 1. Create Map Instance
                const map = new window.google.maps.Map(mapRef.current, {
                    center: userLocation,
                    zoom: 12,
                    styles: THEME_STYLES[mapTheme],
                    mapTypeId: mapType,
                    disableDefaultUI: false,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false, // Custom controls used instead
                    fullscreenControl: true
                });
                
                // 2. Initialize Services & Renderers
                const dirService = new window.google.maps.DirectionsService();
                const dirRenderer = new window.google.maps.DirectionsRenderer({ 
                    map, 
                    suppressMarkers: false,
                    panel: null 
                });
                
                setMapInstance(map);
                setDirectionsService(dirService);
                setDirectionsRenderer(dirRenderer);

                infoWindowRef.current = new window.google.maps.InfoWindow();

                // 3. Initialize Utility Layers
                trafficLayerRef.current = new window.google.maps.TrafficLayer();
                transitLayerRef.current = new window.google.maps.TransitLayer();
                bicyclingLayerRef.current = new window.google.maps.BicyclingLayer();
                
                // 4. Draw User Location Marker
                userMarkerRef.current = new window.google.maps.Marker({
                    position: userLocation,
                    map: map,
                    icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: "#4285F4",
                        fillOpacity: 1,
                        strokeColor: "white",
                        strokeWeight: 2,
                    },
                    title: "Your Location"
                });

                // Autocomplete removed for origin and destination inputs.
            });
        } else {
            // Leaflet Fallback Mode
            loadCss('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'leaflet-css');
            loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', 'leaflet-js', () => {
                setEngine('leaflet');
                const L = window.L;
                
                mapRef.current.innerHTML = '';
                
                const map = L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 13);
                
                L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
                }).addTo(map);

                L.circleMarker([userLocation.lat, userLocation.lng], {
                    radius: 8,
                    fillColor: "#4285F4",
                    color: "#fff",
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 1
                }).addTo(map).bindPopup("Your Location").openPopup();
                
                setMapInstance(map);
            });
        }
    }, [userLocation]);

    // Handle map layers updates
    useEffect(() => {
        if (!mapInstance || engine !== 'google') return;
        
        if (showTraffic) {
            trafficLayerRef.current.setMap(mapInstance);
        } else {
            trafficLayerRef.current.setMap(null);
        }
    }, [showTraffic, mapInstance, engine]);

    useEffect(() => {
        if (!mapInstance || engine !== 'google') return;
        
        if (showTransit) {
            transitLayerRef.current.setMap(mapInstance);
        } else {
            transitLayerRef.current.setMap(null);
        }
    }, [showTransit, mapInstance, engine]);

    useEffect(() => {
        if (!mapInstance || engine !== 'google') return;
        
        if (showBicycling) {
            bicyclingLayerRef.current.setMap(mapInstance);
        } else {
            bicyclingLayerRef.current.setMap(null);
        }
    }, [showBicycling, mapInstance, engine]);

    // Handle map theme styles changes
    useEffect(() => {
        if (!mapInstance || engine !== 'google') return;
        mapInstance.setOptions({ styles: THEME_STYLES[mapTheme] });
    }, [mapTheme, mapInstance, engine]);

    // Handle map type changes
    useEffect(() => {
        if (!mapInstance || engine !== 'google') return;
        mapInstance.setMapTypeId(mapType);
    }, [mapType, mapInstance, engine]);

    // Handle POI Category change - run search
    useEffect(() => {
        if (activeTab === 'nearby' && mapInstance && engine === 'google') {
            searchNearbyPOI();
        }
    }, [nearbyCategory, activeTab, mapInstance, engine]);

    // Fetch Weather & Photos logic
    const handleDestinationInfo = async (lat, lng, searchStr, placeDetails = null) => {
        // 1. Fetch Weather
        try {
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
            const weatherData = await weatherRes.json();
            setWeather(weatherData.current_weather);
        } catch (e) {
            console.error("Weather fetch failed", e);
        }

        // 2. Load Photos
        let newPhotos = [];
        
        // Add Google Place photos if available
        if (placeDetails && placeDetails.photos && placeDetails.photos.length > 0) {
            newPhotos = placeDetails.photos.map(p => p.getUrl({ maxWidth: 400, maxHeight: 300 }));
        }

        // Add Local DB photos matching query
        const destId = searchStr.toLowerCase().replace(/[^a-z0-9]/g, '');
        const internalMatch = destinationsData.find(d => d.id === destId || d.title.toLowerCase() === destId);
        if (internalMatch) {
            newPhotos = [...newPhotos, ...(internalMatch.gallery || [internalMatch.image])];
        } else if (realImages[destId]) {
            newPhotos = [...newPhotos, realImages[destId]];
        }

        // Unsplash fallback if still empty
        if (newPhotos.length === 0) {
            newPhotos = [
                `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80`,
                `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80`
            ];
        }
        
        setPhotos(newPhotos.slice(0, 5));
    };

    const fallbackToOSRM = async (routeDest) => {
        try {
            // Geocode origin if it's a string
            let startLat = userLocation.lat;
            let startLng = userLocation.lng;
            if (origin && origin !== 'Your Location') {
                const origRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(origin)}`);
                const origData = await origRes.json();
                if (origData && origData.length > 0) {
                    startLat = parseFloat(origData[0].lat);
                    startLng = parseFloat(origData[0].lon);
                }
            }

            // Geocode destination
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(routeDest)}`);
            const geoData = await geoRes.json();
            
            if (geoData && geoData.length > 0) {
                const destLat = parseFloat(geoData[0].lat);
                const destLng = parseFloat(geoData[0].lon);
                
                // Build waypoint coordinates string for OSRM
                let coordsString = `${startLng},${startLat};${destLng},${destLat}`;
                
                // Calculate routing via OSRM API
                const osrmRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson&steps=true`);
                const osrmData = await osrmRes.json();
                
                if (osrmData.routes && osrmData.routes.length > 0) {
                    const route = osrmData.routes[0];
                    
                    const distKm = (route.distance / 1000).toFixed(1);
                    const durMin = Math.round(route.duration / 60);
                    const durStr = durMin > 60 ? `${Math.floor(durMin/60)}h ${durMin%60}m` : `${durMin} mins`;
                    
                    setRouteInfo({ distance: `${distKm} km (Fallback)`, duration: durStr });
                    
                    // Extract Turn-by-Turn Steps
                    const osmSteps = [];
                    route.legs.forEach(leg => {
                        leg.steps.forEach(step => {
                            osmSteps.push({
                                instructions: step.maneuver.type + " " + (step.name || ""),
                                distance: { text: `${Math.round(step.distance)} m` },
                                duration: { text: `${Math.round(step.duration)}s` },
                                start_location: engine === 'google' 
                                    ? { lat: step.maneuver.location[1], lng: step.maneuver.location[0] }
                                    : [step.maneuver.location[1], step.maneuver.location[0]]
                            });
                        });
                    });
                    setDirectionsSteps(osmSteps);

                    const pathCoords = route.geometry.coordinates.map(c => ({ lat: c[1], lng: c[0] }));
                    setRoutePath(pathCoords);

                    if (engine === 'google' && mapInstance) {
                        if (leafletRoutingControl) {
                            leafletRoutingControl.setMap(null);
                        }
                        const path = pathCoords;
                        const polyline = new window.google.maps.Polyline({
                            path, geodesic: true, strokeColor: '#4285F4', strokeOpacity: 0.8, strokeWeight: 5
                        });
                        polyline.setMap(mapInstance);
                        setLeafletRoutingControl(polyline);
                        
                        const bounds = new window.google.maps.LatLngBounds();
                        path.forEach(p => bounds.extend(p));
                        mapInstance.fitBounds(bounds);
                        
                        const marker = new window.google.maps.Marker({
                            position: { lat: destLat, lng: destLng }, map: mapInstance, title: routeDest
                        });
                        poiMarkersRef.current.push(marker);
                    } else if (engine === 'leaflet') {
                        const L = window.L;
                        if (leafletRoutingControl) {
                            mapInstance.removeLayer(leafletRoutingControl);
                        }
                        
                        const geojsonLayer = L.geoJSON(route.geometry, {
                            style: { color: '#4285F4', weight: 5, opacity: 0.8 }
                        }).addTo(mapInstance);
                        
                        setLeafletRoutingControl(geojsonLayer);
                        mapInstance.fitBounds(geojsonLayer.getBounds());
                        
                        L.marker([destLat, destLng]).addTo(mapInstance).bindPopup(routeDest);
                    }
                    
                    handleDestinationInfo(destLat, destLng, routeDest);
                }
            } else {
                alert("Destination not found in fallback geocoding.");
            }
        } catch (e) {
            console.error("Leaflet/OSRM routing failed", e);
            alert("Fallback routing also failed.");
        }
        setIsLoading(false);
    };

    // Main route calculation function
    const calculateRoute = async () => {
        if (!destination || !userLocation) return;
        setIsLoading(true);
        clearPOIMarkers();

        // Establish Origin Address or Coords
        const routeOrigin = origin && origin !== 'Your Location' ? origin : userLocation;

        if (engine === 'google' && directionsService && directionsRenderer) {
            directionsService.route({
                origin: routeOrigin,
                destination: destination,
                travelMode: window.google.maps.TravelMode[travelMode]
            }, (response, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(response);
                    
                    const route = response.routes[0];
                    let totalDistance = 0;
                    let totalDuration = 0;
                    let stepList = [];

                    // Sum travel stats across all legs (origin -> stops -> destination)
                    route.legs.forEach(leg => {
                        totalDistance += leg.distance.value;
                        totalDuration += leg.duration.value;
                        stepList = [...stepList, ...leg.steps];
                    });

                    // Format to text
                    const distanceStr = (totalDistance / 1000).toFixed(1) + " km";
                    const durationHr = Math.floor(totalDuration / 3600);
                    const durationMin = Math.round((totalDuration % 3600) / 60);
                    const durationStr = durationHr > 0 ? `${durationHr}h ${durationMin}m` : `${durationMin} mins`;

                    setRouteInfo({
                        distance: distanceStr,
                        duration: durationStr
                    });

                    setDirectionsSteps(stepList);
                    setRoutePath(route.overview_path.map(p => ({ lat: p.lat(), lng: p.lng() })));

                    const finalLeg = route.legs[route.legs.length - 1];
                    const endLat = finalLeg.end_location.lat();
                    const endLng = finalLeg.end_location.lng();
                    
                    // Fetch location details using Places Service to extract high quality photos
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ placeId: finalLeg.end_place_id }, (results, geoStatus) => {
                        if (geoStatus === 'OK' && results[0]) {
                            const service = new window.google.maps.places.PlacesService(mapInstance);
                            service.getDetails({ placeId: results[0].place_id, fields: ['photos'] }, (placeDetails, placeStatus) => {
                                handleDestinationInfo(
                                    endLat, 
                                    endLng, 
                                    destination, 
                                    placeStatus === 'OK' ? placeDetails : null
                                );
                            });
                        } else {
                            handleDestinationInfo(endLat, endLng, destination);
                        }
                    });

                    setIsLoading(false);
                } else {
                    console.warn('Google Directions failed with ' + status + '. Using fallback.');
                    fallbackToOSRM(destination);
                }
            });
        } else if (engine === 'leaflet') {
            fallbackToOSRM(destination);
        }
    };

    // Live Navigation Simulation
    const stopNavigation = () => {
        if (navAnimationRef.current) cancelAnimationFrame(navAnimationRef.current);
        if (navVehicleRef.current) {
            if (engine === 'google') navVehicleRef.current.setMap(null);
            else if (engine === 'leaflet') mapInstance.removeLayer(navVehicleRef.current);
            navVehicleRef.current = null;
        }
        setIsNavigating(false);
    };

    const startNavigation = () => {
        if (!routePath || routePath.length < 2 || !mapInstance) {
            alert("Please calculate a route first.");
            return;
        }
        
        setIsNavigating(true);
        
        let marker;
        // Simple car emoji icon for Google Maps or Leaflet
        const iconUrl = 'https://cdn-icons-png.flaticon.com/512/744/744465.png';

        if (engine === 'google') {
            marker = new window.google.maps.Marker({
                position: routePath[0],
                map: mapInstance,
                icon: {
                    url: iconUrl,
                    scaledSize: new window.google.maps.Size(32, 32),
                    anchor: new window.google.maps.Point(16, 16)
                },
                zIndex: 999
            });
        } else {
            const L = window.L;
            const carIcon = L.icon({
                iconUrl: iconUrl,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });
            marker = L.marker([routePath[0].lat, routePath[0].lng], { icon: carIcon }).addTo(mapInstance);
        }
        navVehicleRef.current = marker;

        let currentIndex = 0;
        let progress = 0;
        const speed = 0.03; // interpolation speed between points

        const animate = () => {
            if (currentIndex >= routePath.length - 1) {
                stopNavigation();
                return;
            }

            const p1 = routePath[currentIndex];
            const p2 = routePath[currentIndex + 1];

            const currentLat = p1.lat + (p2.lat - p1.lat) * progress;
            const currentLng = p1.lng + (p2.lng - p1.lng) * progress;

            if (engine === 'google') {
                marker.setPosition({ lat: currentLat, lng: currentLng });
                mapInstance.panTo({ lat: currentLat, lng: currentLng });
            } else {
                marker.setLatLng([currentLat, currentLng]);
                mapInstance.panTo([currentLat, currentLng]);
            }

            progress += speed;
            if (progress >= 1) {
                progress = 0;
                currentIndex++;
            }

            navAnimationRef.current = requestAnimationFrame(animate);
        };

        animate();
    };

    // Calculate initial destination on map load
    useEffect(() => {
        if (initialDestination && mapInstance) {
            calculateRoute();
        }
    }, [initialDestination, mapInstance]);

    // Explore Nearby Places (POI) Google Search
    const searchNearbyPOI = () => {
        if (!mapInstance || engine !== 'google') return;
        
        setIsLoading(true);
        clearPOIMarkers();

        const service = new window.google.maps.places.PlacesService(mapInstance);
        
        // Find reference point for searching nearby (destination if calculated, else user location)
        let searchCenter = mapInstance.getCenter();
        if (directionsRenderer && directionsRenderer.getDirections()) {
            const route = directionsRenderer.getDirections().routes[0];
            const lastLeg = route.legs[route.legs.length - 1];
            searchCenter = lastLeg.end_location;
        }

        service.nearbySearch({
            location: searchCenter,
            radius: 4000,
            type: nearbyCategory
        }, (results, status) => {
            setIsLoading(false);
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setNearbyPlaces(results);
                if (showNearbyOnMap) {
                    plotPOIMarkers(results);
                }
            } else {
                console.warn("Nearby search failed or returned no results: " + status);
                setNearbyPlaces([]);
            }
        });
    };

    // Draw markers on map for nearby places
    const plotPOIMarkers = (places) => {
        if (!mapInstance || engine !== 'google') return;
        clearPOIMarkers();

        const bounds = new window.google.maps.LatLngBounds();
        
        // Include destination/route in bounds
        if (directionsRenderer && directionsRenderer.getDirections()) {
            const route = directionsRenderer.getDirections().routes[0];
            route.legs.forEach(leg => {
                bounds.extend(leg.start_location);
                bounds.extend(leg.end_location);
            });
        } else if (userLocation) {
            bounds.extend(userLocation);
        }

        const markers = places.map((place, index) => {
            const location = place.geometry.location;
            bounds.extend(location);

            // Establish color theme based on POI category
            let color = "#FF9933"; // default orange
            if (nearbyCategory === 'restaurant') color = "#EA4335";
            if (nearbyCategory === 'lodging') color = "#4285F4";
            if (nearbyCategory === 'cafe') color = "#AB47BC";
            if (nearbyCategory === 'transit_station') color = "#34A853";

            // Draw custom marker with FontAwesome-like icon symbol
            const marker = new window.google.maps.Marker({
                position: location,
                map: mapInstance,
                title: place.name,
                icon: {
                    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                    fillColor: color,
                    fillOpacity: 0.9,
                    strokeColor: "#ffffff",
                    strokeWeight: 1.5,
                    scale: 1.5,
                    anchor: new window.google.maps.Point(12, 21),
                    labelOrigin: new window.google.maps.Point(12, 9)
                },
                label: {
                    text: (index + 1).toString(),
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "bold"
                }
            });

            // Set up rich InfoWindow content on click
            marker.addListener('click', () => {
                const infoWindow = infoWindowRef.current;
                const container = document.createElement('div');
                container.style.color = '#333';
                container.style.padding = '5px';
                container.style.maxWidth = '250px';
                container.style.fontFamily = 'Poppins, sans-serif';

                const photoUrl = place.photos && place.photos.length > 0 
                    ? place.photos[0].getUrl({ maxWidth: 200, maxHeight: 110 })
                    : 'https://picsum.photos/seed/places/200/110';

                container.innerHTML = `
                    <h4 style="margin:0 0 5px 0; font-size:1rem; color:#111; font-weight:600;">${place.name}</h4>
                    ${place.rating ? `<div style="color:#FF9933; margin-bottom:5px; font-size:0.85rem;"><i class="fas fa-star"></i> ${place.rating} (${place.user_ratings_total || 0})</div>` : ''}
                    <p style="margin:0 0 10px 0; font-size:0.8rem; color:#666; line-height:1.3;">${place.vicinity || ''}</p>
                    <div style="height:100px; border-radius:8px; overflow:hidden; margin-bottom:10px; border:1px solid #eee;">
                        <img src="${photoUrl}" style="width:100%; height:100%; object-fit:cover;" />
                    </div>
                    <div style="display:flex; gap:8px;">
                        <button id="poi-btn-route" style="background:#4285F4; color:#white; border:none; padding:6px 10px; border-radius:6px; font-size:0.75rem; cursor:pointer; flex:1; font-weight:bold; display:flex; align-items:center; justify-content:center; gap:3px;"><i class="fas fa-route"></i> Route</button>
                        <button id="poi-btn-stop" style="background:#0F9D58; color:#white; border:none; padding:6px 10px; border-radius:6px; font-size:0.75rem; cursor:pointer; flex:1; font-weight:bold; display:flex; align-items:center; justify-content:center; gap:3px;"><i class="fas fa-plus"></i> Stop</button>
                    </div>
                `;

                infoWindow.setContent(container);
                infoWindow.open(mapInstance, marker);

                // Attach actions after InfoWindow DOM renders
                window.google.maps.event.addListener(infoWindow, 'domready', () => {
                    const routeBtn = document.getElementById('poi-btn-route');
                    const stopBtn = document.getElementById('poi-btn-stop');

                    if (routeBtn) {
                        routeBtn.addEventListener('click', () => {
                            setDestination(place.name || place.vicinity);
                            infoWindow.close();
                            // Directly compute route to this place
                            setTimeout(() => {
                                calculateRoute();
                            }, 200);
                        });
                    }
                    if (stopBtn) {
                        stopBtn.addEventListener('click', () => {
                            handleAddWaypointDirectly(place.name || place.vicinity);
                            infoWindow.close();
                        });
                    }
                });
            });

            return marker;
        });

        poiMarkersRef.current = markers;
        
        // Auto fit map view limits to frame markers
        if (places.length > 0) {
            mapInstance.fitBounds(bounds);
        }
    };

    // Direct Waypoint Add from InfoWindow buttons
    const handleAddWaypointDirectly = (address) => {
        setWaypoints(prev => [...prev, address]);
        setActiveTab('route');
    };

    // Remove all POI Markers
    const clearPOIMarkers = () => {
        poiMarkersRef.current.forEach(m => m.setMap(null));
        poiMarkersRef.current = [];
        if (infoWindowRef.current) {
            infoWindowRef.current.close();
        }
    };

    // Clear all routing data
    const handleClearRoute = () => {
        setDestination('');
        setRouteInfo(null);
        setDirectionsSteps([]);
        setWeather(null);
        setPhotos([]);
        clearPOIMarkers();

        if (directionsRenderer) {
            directionsRenderer.setDirections({ routes: [] });
        }
        if (leafletRoutingControl && mapInstance) {
            mapInstance.removeLayer(leafletRoutingControl);
            setLeafletRoutingControl(null);
        }

        if (mapInstance && userLocation) {
            if (engine === 'google') {
                mapInstance.setCenter(userLocation);
                mapInstance.setZoom(12);
            } else {
                mapInstance.setView([userLocation.lat, userLocation.lng], 13);
            }
        }
    };

    // Re-center map to user GPS coordinates
    const handleRecenter = () => {
        if (!mapInstance || !userLocation) return;
        if (engine === 'google') {
            mapInstance.panTo(userLocation);
            mapInstance.setZoom(14);
        } else {
            mapInstance.setView([userLocation.lat, userLocation.lng], 14);
        }
    };

    // Pan map to clicked direction step
    const handleStepClick = (step) => {
        if (!mapInstance || !step) return;
        if (engine === 'google') {
            mapInstance.panTo(step.start_location);
            mapInstance.setZoom(17);
            
            // Set infowindow over step spot
            const infoWindow = infoWindowRef.current;
            infoWindow.setContent(`<div style="color:#333; font-family:Poppins,sans-serif; font-size:0.85rem; max-width:200px;">${step.instructions}</div>`);
            infoWindow.setPosition(step.start_location);
            infoWindow.open(mapInstance);
        } else {
            // Leaflet step click
            mapInstance.setView(step.start_location, 16);
        }
    };

    const getWeatherIcon = (code) => {
        if (code <= 3) return 'fa-sun'; // clear/partly cloudy
        if (code <= 48) return 'fa-smog'; // fog
        if (code <= 67) return 'fa-cloud-rain'; // rain
        if (code <= 77) return 'fa-snowflake'; // snow
        if (code <= 99) return 'fa-bolt'; // thunderstorm
        return 'fa-cloud';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '680px', width: '100%', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 20px 45px rgba(0,0,0,0.3)', background: 'var(--white-color)', border: '1px solid rgba(255,255,255,0.08)' }}>
            
            {/* Split Map and Street View Panes */}
            <div style={{ display: 'flex', flex: 1, minHeight: 0, position: 'relative', flexDirection: 'column' }}>
                
                {/* Map Display area */}
                <div ref={mapRef} style={{ flex: 1, height: '100%', width: '100%', position: 'relative' }}></div>

                {/* Loading Spinner */}
                {isLoading && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
                        <div style={{ background: 'rgba(25, 25, 35, 0.9)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '15px 30px', borderRadius: '35px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <i className="fas fa-circle-notch fa-spin" style={{ color: '#4285F4', fontSize: '1.2rem' }}></i> Loading Map Intelligence...
                        </div>
                    </div>
                )}

                {/* Engine Fallback Warning Badge */}
                {engine === 'leaflet' && (
                    <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'rgba(235,94,85,0.9)', color: '#fff', padding: '6px 15px', borderRadius: '20px', fontSize: '0.8rem', zIndex: 500, backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                        <i className="fas fa-exclamation-triangle"></i> Leaflet Fallback Active (No Google API Key)
                    </div>
                )}

                {/* Map Utilities Controls Floating Strip */}
                {engine === 'google' && (
                    <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '8px', zIndex: 400 }}>
                        <button 
                            onClick={handleRecenter}
                            style={{ background: 'rgba(25, 25, 35, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', width: '40px', height: '40px', borderRadius: '50%', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', transition: 'all 0.3s' }}
                            title="Recenter Map"
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <i className="fas fa-crosshairs"></i>
                        </button>
                    </div>
                )}

                {/* Dashboard Glassmorphic Control Panel Overlay */}
                <div className="map-overlay-panel" style={{ background: 'rgba(17, 17, 27, 0.88)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', borderRadius: '22px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', zIndex: 500, display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }}>
                    
                    {/* Panel Header & Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', gap: '5px' }}>
                        <button 
                            onClick={() => setActiveTab('route')} 
                            style={{ background: activeTab === 'route' ? '#4285F4' : 'transparent', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.3s' }}
                        >
                            <i className="fas fa-route"></i> Route
                        </button>
                        {engine === 'google' && (
                            <>
                                <button 
                                    onClick={() => setActiveTab('nearby')} 
                                    style={{ background: activeTab === 'nearby' ? '#0F9D58' : 'transparent', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.3s' }}
                                >
                                    <i className="fas fa-map-marker-alt"></i> Nearby
                                </button>
                                <button 
                                    onClick={() => setActiveTab('settings')} 
                                    style={{ background: activeTab === 'settings' ? '#F4B400' : 'transparent', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.3s' }}
                                >
                                    <i className="fas fa-sliders-h"></i> Custom
                                </button>
                            </>
                        )}
                    </div>

                    {/* Tab contents 1: Route Planner */}
                    {activeTab === 'route' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            
                            {/* Suggestions Datalist */}
                            <datalist id="destinations-list">
                                {uniquePlaces.map((place, i) => (
                                    <option key={i} value={place} />
                                ))}
                            </datalist>

                            {/* Origin Input */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '0.75rem', color: '#aaa', fontWeight: 'bold', textTransform: 'uppercase' }}>Start Location</label>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <input 
                                        ref={originInputRef}
                                        type="text" 
                                        value={origin}
                                        onChange={(e) => setOrigin(e.target.value)}
                                        placeholder="Enter starting location..."
                                        list="destinations-list"
                                        style={{ flex: 1, padding: '10px 15px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontSize: '0.9rem' }}
                                    />
                                </div>
                            </div>

                            {/* Destination Input */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '0.75rem', color: '#aaa', fontWeight: 'bold', textTransform: 'uppercase' }}>Destination</label>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <input 
                                        ref={destInputRef}
                                        type="text" 
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        placeholder="Where to?"
                                        list="destinations-list"
                                        style={{ flex: 1, padding: '10px 15px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontSize: '0.9rem' }}
                                        onKeyPress={e => e.key === 'Enter' && calculateRoute()}
                                    />
                                </div>
                            </div>

                            {/* Route Control Actions */}
                            <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                                
                                <button 
                                    onClick={calculateRoute}
                                    style={{ background: '#4285F4', border: 'none', color: '#fff', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', flex: 1.2, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.3s' }}
                                >
                                    <i className="fas fa-search-location"></i> Find Route
                                </button>

                                {routePath && (
                                    <button 
                                        onClick={isNavigating ? stopNavigation : startNavigation}
                                        style={{ background: isNavigating ? '#eb5e55' : '#0F9D58', border: 'none', color: '#fff', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', flex: 1.2, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.3s' }}
                                    >
                                        <i className={`fas ${isNavigating ? 'fa-stop-circle' : 'fa-play-circle'}`}></i> {isNavigating ? 'Stop' : 'Start'}
                                    </button>
                                )}

                                {destination && (
                                    <button 
                                        onClick={handleClearRoute}
                                        style={{ background: 'rgba(235, 94, 85, 0.2)', border: '1px solid rgba(235, 94, 85, 0.3)', color: '#eb5e55', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                                        title="Clear Route"
                                    >
                                        <i className="fas fa-times-circle"></i>
                                    </button>
                                )}
                            </div>

                            {/* Mode Selection */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '5px', marginTop: '5px' }}>
                                {[
                                    { mode: 'DRIVING', icon: 'fa-car', label: 'Drive' },
                                    { mode: 'TRANSIT', icon: 'fa-bus', label: 'Transit' },
                                    { mode: 'WALKING', icon: 'fa-walking', label: 'Walk' },
                                    { mode: 'BICYCLING', icon: 'fa-bicycle', label: 'Cycle' }
                                ].map(item => (
                                    <button 
                                        key={item.mode}
                                        onClick={() => { setTravelMode(item.mode); if (destination) { setTimeout(calculateRoute, 100); } }}
                                        style={{ 
                                            background: travelMode === item.mode ? '#4285F4' : 'transparent',
                                            border: 'none', color: '#fff', padding: '8px', borderRadius: '8px', cursor: 'pointer',
                                            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '0.75rem', transition: 'all 0.3s'
                                        }}
                                        title={item.label}
                                    >
                                        <i className={`fas ${item.icon}`} style={{ fontSize: '1rem' }}></i>
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Travel Info Summary Banner */}
                            {routeInfo && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.15), rgba(15, 157, 88, 0.15))', padding: '15px', borderRadius: '15px', borderLeft: '4px solid #0F9D58', marginTop: '5px' }}>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', color: '#bbb', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>Total Distance</span>
                                        <strong style={{ fontSize: '1.25rem', color: '#fff' }}>{routeInfo.distance}</strong>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#bbb', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>Travel Time</span>
                                        <strong style={{ fontSize: '1.25rem', color: '#fff' }}>{routeInfo.duration}</strong>
                                    </div>
                                </div>
                            )}

                            {/* Collapsible Steps list */}
                            {directionsSteps.length > 0 && (
                                <div style={{ marginTop: '10px' }}>
                                    <details open style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                                        <summary style={{ padding: '12px 15px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', outline: 'none' }}>
                                            <span><i className="fas fa-list-ol" style={{ color: '#4285F4', marginRight: '8px' }}></i> Turn-by-Turn Directions</span>
                                        </summary>
                                        <div style={{ maxHeight: '180px', overflowY: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
                                            {directionsSteps.map((step, idx) => (
                                                <div 
                                                    key={idx}
                                                    onClick={() => handleStepClick(step)}
                                                    style={{ padding: '10px 15px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', gap: '8px', hover: { background: 'rgba(255,255,255,0.08)' } }}
                                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    <span style={{ color: '#4285F4', fontWeight: 'bold' }}>{idx + 1}.</span>
                                                    <div style={{ flex: 1 }}>
                                                        <div dangerouslySetInnerHTML={{ __html: step.instructions }} style={{ color: '#fff' }} />
                                                        <div style={{ color: '#aaa', fontSize: '0.75rem', marginTop: '2px' }}>
                                                            {step.distance.text} &bull; {step.duration.text}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                </div>
                            )}

                        </div>
                    )}

                    {/* Tab contents 2: Explore Nearby */}
                    {activeTab === 'nearby' && engine === 'google' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ fontSize: '0.8rem', color: '#ccc', fontWeight: 'bold' }}>Explore Attractions & Stops</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                                    <input 
                                        type="checkbox" 
                                        checked={showNearbyOnMap} 
                                        onChange={(e) => {
                                            setShowNearbyOnMap(e.target.checked);
                                            if (e.target.checked) {
                                                plotPOIMarkers(nearbyPlaces);
                                            } else {
                                                clearPOIMarkers();
                                            }
                                        }} 
                                    />
                                    Show on Map
                                </label>
                            </div>

                            {/* Category selector grid */}
                            <div className="poi-category-grid" style={{ gap: '8px' }}>
                                {[
                                    { cat: 'tourist_attraction', icon: 'fa-landmark', color: '#FF9933', label: 'Attract' },
                                    { cat: 'restaurant', icon: 'fa-utensils', color: '#EA4335', label: 'Dine' },
                                    { cat: 'lodging', icon: 'fa-hotel', color: '#4285F4', label: 'Stay' },
                                    { cat: 'cafe', icon: 'fa-coffee', color: '#AB47BC', label: 'Cafe' },
                                    { cat: 'transit_station', icon: 'fa-subway', color: '#34A853', label: 'Transit' }
                                ].map(item => (
                                    <button
                                        key={item.cat}
                                        onClick={() => setNearbyCategory(item.cat)}
                                        style={{ 
                                            background: nearbyCategory === item.cat ? item.color : 'rgba(255,255,255,0.06)',
                                            border: 'none', color: '#fff', padding: '10px 5px', borderRadius: '10px', cursor: 'pointer',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '0.75rem', transition: 'all 0.3s'
                                        }}
                                    >
                                        <i className={`fas ${item.icon}`} style={{ fontSize: '1rem' }}></i>
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* List of found nearby items */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto', marginTop: '5px' }}>
                                {nearbyPlaces.length === 0 ? (
                                    <div style={{ textAlign: 'center', color: '#888', padding: '20px 0', fontSize: '0.85rem' }}>
                                        No nearby places found. Move map or compute a route to query places.
                                    </div>
                                ) : (
                                    nearbyPlaces.slice(0, 10).map((place, index) => (
                                        <div key={place.place_id || index} style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.8rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <span style={{ fontWeight: 'bold', color: '#fff', flex: 1 }}>{index + 1}. {place.name}</span>
                                                {place.rating && (
                                                    <span style={{ color: '#FF9933', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', marginLeft: '5px' }}>
                                                        <i className="fas fa-star"></i> {place.rating}
                                                    </span>
                                                )}
                                            </div>
                                            <span style={{ color: '#bbb', fontSize: '0.75rem' }}>{place.vicinity || ''}</span>
                                            
                                            {/* Action triggers */}
                                            <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                                                <button 
                                                    onClick={() => {
                                                        setDestination(place.name);
                                                        setTimeout(calculateRoute, 100);
                                                    }}
                                                    style={{ background: '#4285F4', border: 'none', color: '#fff', borderRadius: '5px', padding: '4px 8px', fontSize: '0.7rem', cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}
                                                >
                                                    <i className="fas fa-route"></i> Route Here
                                                </button>
                                                <button 
                                                    onClick={() => handleAddWaypointDirectly(place.name || place.vicinity)}
                                                    style={{ background: '#0F9D58', border: 'none', color: '#fff', borderRadius: '5px', padding: '4px 8px', fontSize: '0.7rem', cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}
                                                >
                                                    <i className="fas fa-plus"></i> Add Stop
                                                </button>
                                                {place.geometry && (
                                                    <button 
                                                        onClick={() => {
                                                            setShowStreetView(true);
                                                            setTimeout(() => {
                                                                if (panoramaInstance) {
                                                                    panoramaInstance.setPosition(place.geometry.location);
                                                                }
                                                            }, 300);
                                                        }}
                                                        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '5px', padding: '4px 8px', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                        title="View street panorama"
                                                    >
                                                        <i className="fas fa-street-view"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tab contents 3: Map custom configurations */}
                    {activeTab === 'settings' && engine === 'google' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            
                            {/* Map Themes */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '0.75rem', color: '#aaa', fontWeight: 'bold', textTransform: 'uppercase' }}>Map Custom Themes</label>
                                <div className="settings-grid" style={{ gap: '8px' }}>
                                    {[
                                        { name: 'night', label: 'Night Voyage', icon: 'fa-moon' },
                                        { name: 'silver', label: 'Silver Mist', icon: 'fa-adjust' },
                                        { name: 'retro', label: 'Retro Warmth', icon: 'fa-sun' },
                                        { name: 'standard', label: 'Google Default', icon: 'fa-map' }
                                    ].map(theme => (
                                        <button
                                            key={theme.name}
                                            onClick={() => setMapTheme(theme.name)}
                                            style={{ 
                                                background: mapTheme === theme.name ? '#4285F4' : 'rgba(255,255,255,0.06)',
                                                border: 'none', color: '#fff', padding: '10px 8px', borderRadius: '10px', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', transition: 'all 0.3s'
                                            }}
                                        >
                                            <i className={`fas ${theme.icon}`} style={{ color: mapTheme === theme.name ? '#fff' : '#4285F4' }}></i>
                                            <span>{theme.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Map type selector */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px' }}>
                                <label style={{ fontSize: '0.75rem', color: '#aaa', fontWeight: 'bold', textTransform: 'uppercase' }}>Map View Modes</label>
                                <div className="settings-grid" style={{ gap: '8px' }}>
                                    {[
                                        { type: 'roadmap', label: 'Standard Map' },
                                        { type: 'satellite', label: 'Satellite' },
                                        { type: 'terrain', label: 'Terrain contours' },
                                        { type: 'hybrid', label: 'Hybrid Satellite' }
                                    ].map(item => (
                                        <button
                                            key={item.type}
                                            onClick={() => setMapType(item.type)}
                                            style={{ 
                                                background: mapType === item.type ? '#0F9D58' : 'rgba(255,255,255,0.06)',
                                                border: 'none', color: '#fff', padding: '10px 8px', borderRadius: '10px', cursor: 'pointer',
                                                fontSize: '0.8rem', transition: 'all 0.3s', textAlign: 'left'
                                            }}
                                        >
                                            <i className="fas fa-layer-group" style={{ marginRight: '6px', color: mapType === item.type ? '#fff' : '#0F9D58' }}></i>
                                            <span>{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Overlay Layers triggers */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '5px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <label style={{ fontSize: '0.75rem', color: '#aaa', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Google Overlay Layers</label>
                                
                                <label style={{ display: 'flex', alignItems: 'center', justify: 'space-between', fontSize: '0.85rem', cursor: 'pointer', padding: '4px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fas fa-car" style={{ color: '#EA4335', width: '15px' }}></i> Real-Time Traffic
                                    </span>
                                    <input type="checkbox" checked={showTraffic} onChange={(e) => setShowTraffic(e.target.checked)} />
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', justify: 'space-between', fontSize: '0.85rem', cursor: 'pointer', padding: '4px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fas fa-bus-alt" style={{ color: '#0F9D58', width: '15px' }}></i> Public Transit Lines
                                    </span>
                                    <input type="checkbox" checked={showTransit} onChange={(e) => setShowTransit(e.target.checked)} />
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', justify: 'space-between', fontSize: '0.85rem', cursor: 'pointer', padding: '4px 0' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fas fa-bicycle" style={{ color: '#4285F4', width: '15px' }}></i> Bicycling Paths
                                    </span>
                                    <input type="checkbox" checked={showBicycling} onChange={(e) => setShowBicycling(e.target.checked)} />
                                </label>
                            </div>

                        </div>
                    )}

                    {/* Weather forecast display panel (if loaded) */}
                    {weather && (
                        <div style={{ background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.15), rgba(15, 157, 88, 0.15))', padding: '15px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <div>
                                <span style={{ fontSize: '0.75rem', color: '#ddd', display: 'block', marginBottom: '3px', textTransform: 'uppercase', fontWeight: 'bold' }}>Current Weather</span>
                                <h4 style={{ margin: 0, fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                                    {weather.temperature}°C
                                </h4>
                                <span style={{ fontSize: '0.8rem', color: '#ccc' }}>Wind Speed: {weather.windspeed} km/h</span>
                            </div>
                            <i className={`fas ${getWeatherIcon(weather.weathercode)}`} style={{ fontSize: '2.5rem', color: '#fff', opacity: 0.85 }}></i>
                        </div>
                    )}

                    {/* Place Photos Carousel strip */}
                    {photos.length > 0 && (
                        <div>
                            <span style={{ fontSize: '0.75rem', color: '#aaa', display: 'block', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 'bold' }}>Destination Scenery</span>
                            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
                                {photos.map((src, idx) => (
                                    <div key={idx} style={{ flexShrink: 0, width: '110px', height: '75px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <img src={src} alt="Destination Scenery View" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.src = 'https://picsum.photos/seed/travel/110/75'} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default LiveTravelMap;

