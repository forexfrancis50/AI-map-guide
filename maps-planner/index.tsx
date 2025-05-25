


// Fix: Replaced generic 'google: any' with a more specific global declaration for google.maps.OverlayView and google.maps.DirectionsResult.
// This provides TypeScript with the necessary class and interface structures for OverlayView and DirectionsResult,
// resolving "Cannot find namespace 'google'" errors and issues with extending OverlayView or using its methods.
declare global {
  namespace google {
    namespace maps {
      // Forward declare types that are imported and used elsewhere to avoid conflicts if this file is processed before imports.
      // Actual implementations come from google.maps.importLibrary.
      type LatLng = any; // Actual type from importLibrary('core')
      type Map = any; // Actual type from importLibrary('maps')
      type LatLngBounds = any; // Actual type from importLibrary('core')
      type LatLngLiteral = { lat: number; lng: number; };
      type Point = { x: number; y: number; };

      class OverlayView {
        constructor();
        setMap(map: google.maps.Map | null): void;
        getPanes(): MapPanes | null;
        getProjection(): MapCanvasProjection | null;
        draw(): void;
        onAdd(): void;
        onRemove(): void;
        static preventMapHitsAndGesturesFrom(element: HTMLElement): void;
      }

      interface MapPanes {
        floatPane: HTMLElement;
        // Add other panes if used, e.g., overlayLayer, mapPane, markerLayer
      }

      interface MapCanvasProjection {
        fromLatLngToDivPixel(latLng: google.maps.LatLng | LatLngLiteral): Point | null;
        fromDivPixelToLatLng(pixel: Point, noWrap?: boolean): google.maps.LatLng | null;
        // Add other methods if used
      }

      // Fix: Defined DirectionsStatus enum for proper type checking.
      enum DirectionsStatus {
        OK = "OK",
        NOT_FOUND = "NOT_FOUND",
        ZERO_RESULTS = "ZERO_RESULTS",
        MAX_WAYPOINTS_EXCEEDED = "MAX_WAYPOINTS_EXCEEDED",
        MAX_ROUTE_LENGTH_EXCEEDED = "MAX_ROUTE_LENGTH_EXCEEDED",
        INVALID_REQUEST = "INVALID_REQUEST",
        OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
        REQUEST_DENIED = "REQUEST_DENIED",
        UNKNOWN_ERROR = "UNKNOWN_ERROR"
      }

      interface DirectionsResult {
        routes: DirectionsRoute[];
        geocoded_waypoints?: GeocodedWaypoint[];
        request?: DirectionsRequest;
        // Fix: Used fully qualified google.maps.DirectionsStatus type.
        status?: google.maps.DirectionsStatus;
      }

      interface DirectionsRoute {
        // Fix: Used fully qualified google.maps.LatLng and google.maps.LatLngBounds types.
        overview_path: google.maps.LatLng[];
        bounds?: google.maps.LatLngBounds;
        legs?: DirectionsLeg[];
        summary?: string;
        warnings?: string[];
        waypoint_order?: number[];
        // Add other properties if accessed
      }

      interface DirectionsLeg {
        // Define properties of DirectionsLeg if accessed
        // Fix: Used fully qualified google.maps.LatLng type.
        start_location?: google.maps.LatLng;
        end_location?: google.maps.LatLng;
        steps?: DirectionsStep[];
        distance?: Distance;
        duration?: Duration;
        // ... and so on
      }
      interface DirectionsStep{
        // Define properties of DirectionsStep if accessed
        // Fix: Used fully qualified google.maps.LatLng type.
        path?: google.maps.LatLng[];
        instructions?: string;
        distance?: Distance;
        duration?: Duration;
         // ... and so on
      }
      interface Distance { text: string; value: number;}
      interface Duration { text: string; value: number;}
      interface GeocodedWaypoint { /* ... */ }
      // Fix: Updated DirectionsRequest to include properties used in the application.
      interface DirectionsRequest {
        origin?: google.maps.LatLng | string | google.maps.Place;
        destination?: google.maps.LatLng | string | google.maps.Place;
        travelMode?: google.maps.TravelMode;
        // Add other properties if used by the application
      }
      // DirectionsStatus is imported, so it doesn't strictly need to be here,
      // but for completeness or if used directly as google.maps.DirectionsStatus:
      // enum DirectionsStatus { OK = "OK", /* ... other statuses */ }

      // Fix: Added AdvancedMarkerElement declaration within a marker namespace.
      namespace marker {
        class AdvancedMarkerElement {
          constructor(options?: google.maps.marker.AdvancedMarkerElementOptions | null);
          get position(): google.maps.LatLng | null;
          set position(position: google.maps.LatLng | google.maps.LatLngLiteral | null);
          get map(): google.maps.Map | null;
          set map(map: google.maps.Map | null);
          get title(): string | null;
          set title(title: string | null);
          addListener(eventName: string, handler: Function): google.maps.MapsEventListener;
          content?: Node | null; // Added content property
        }
        type AdvancedMarkerElementOptions = any; // Placeholder for options type
      }
      type MapsEventListener = any; // Placeholder for MapsEventListener

      // Fix: Added Polyline and related types to resolve errors.
      type MVCArray<T> = T[]; // Simplified MVCArray for paths.
      enum SymbolPath { // Basic enum for symbol paths, can also be SVG string.
        CIRCLE = 0,
        FORWARD_CLOSED_ARROW = 1,
        FORWARD_OPEN_ARROW = 2,
        BACKWARD_CLOSED_ARROW = 3,
        BACKWARD_OPEN_ARROW = 4,
      }
      interface Symbol {
        path: string | google.maps.SymbolPath;
        anchor?: google.maps.Point;
        fillColor?: string;
        fillOpacity?: number;
        labelOrigin?: google.maps.Point;
        rotation?: number;
        scale?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
      }
      interface IconSequence {
        fixedRotation?: boolean;
        icon?: google.maps.Symbol | null;
        offset?: string;
        repeat?: string;
      }
      interface PolylineOptions {
        path?: google.maps.LatLng[] | google.maps.MVCArray<google.maps.LatLng>;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
        map?: google.maps.Map;
        geodesic?: boolean;
        icons?: google.maps.IconSequence[];
      }
      class Polyline {
        constructor(opts?: google.maps.PolylineOptions | null);
        setMap(map: google.maps.Map | null): void;
        // Define other methods if needed by the application e.g. getPath, setOptions
      }

      // Fix: Added StreetViewService, StreetViewPanorama and related types/enums to resolve errors.
      enum StreetViewPreference {
        NEAREST = "NEAREST",
        BEST = "BEST",
      }
      enum StreetViewSource {
        DEFAULT = "DEFAULT",
        OUTDOOR = "OUTDOOR",
      }
      enum StreetViewStatus {
        OK = "OK",
        ZERO_RESULTS = "ZERO_RESULTS",
        UNKNOWN_ERROR = "UNKNOWN_ERROR",
      }
      interface StreetViewLocationRequest {
        location?: google.maps.LatLng | google.maps.LatLngLiteral;
        preference?: google.maps.StreetViewPreference;
        radius?: number;
        source?: google.maps.StreetViewSource;
      }
      interface StreetViewPanoRequest {
        pano?: string;
      }
      interface StreetViewLink {
        description?: string | null;
        heading?: number | null;
        pano?: string | null;
      }
      interface StreetViewLocation {
        description?: string | null;
        latLng?: google.maps.LatLng | null;
        pano?: string | null;
        shortDescription?: string | null;
      }
      interface StreetViewTileData { /* Minimal definition */ }
      interface StreetViewPanoramaData {
        copyright?: string;
        imageDate?: string;
        links?: google.maps.StreetViewLink[];
        location?: google.maps.StreetViewLocation;
        pano?: string;
        tiles?: google.maps.StreetViewTileData;
      }
      interface StreetViewResponse { // Wrapper for promise result from getPanorama
          data: google.maps.StreetViewPanoramaData;
      }
      class StreetViewService {
        constructor();
        getPanorama(
          request: google.maps.StreetViewLocationRequest | google.maps.StreetViewPanoRequest
        ): Promise<google.maps.StreetViewResponse>;
      }
      interface StreetViewPov {
        heading?: number;
        pitch?: number;
      }
      interface StreetViewAddressControlOptions { /* Minimal definition */ }
      interface FullscreenControlOptions { /* Minimal definition */ }
      interface MotionTrackingControlOptions { /* Minimal definition */ }
      interface PanControlOptions { /* Minimal definition */ }
      interface ZoomControlOptions { /* Minimal definition */ }
      interface StreetViewPanoramaOptions {
        addressControl?: boolean;
        addressControlOptions?: google.maps.StreetViewAddressControlOptions;
        clickToGo?: boolean;
        disableDefaultUI?: boolean;
        disableDoubleClickZoom?: boolean;
        enableCloseButton?: boolean;
        fullscreenControl?: boolean;
        fullscreenControlOptions?: google.maps.FullscreenControlOptions;
        imageDateControl?: boolean;
        linksControl?: boolean;
        motionTracking?: boolean;
        motionTrackingControl?: boolean;
        motionTrackingControlOptions?: google.maps.MotionTrackingControlOptions;
        panControl?: boolean;
        panControlOptions?: google.maps.PanControlOptions;
        pano?: string;
        position?: google.maps.LatLng | google.maps.LatLngLiteral;
        pov?: google.maps.StreetViewPov;
        scrollwheel?: boolean;
        visible?: boolean;
        zoom?: number;
        zoomControl?: boolean;
        zoomControlOptions?: google.maps.ZoomControlOptions;
      }
      class StreetViewPanorama {
        constructor(container: HTMLElement, opts?: google.maps.StreetViewPanoramaOptions | null);
        setPosition(latLng: google.maps.LatLng | google.maps.LatLngLiteral | null): void;
        setVisible(visible: boolean): void;
        setPov(pov: google.maps.StreetViewPov): void;
        // Define other methods if needed by the application e.g. getPosition, getPov, getVisible
        getPosition(): google.maps.LatLng | null;
        getPov(): google.maps.StreetViewPov;
        getVisible(): boolean;
      }

      // Fix: Added DirectionsService and related types/enums to resolve errors.
      enum TravelMode {
        DRIVING = "DRIVING",
        WALKING = "WALKING",
        BICYCLING = "BICYCLING",
        TRANSIT = "TRANSIT",
      }
      interface Place { // Minimal Place interface for DirectionsRequest
          location?: google.maps.LatLng | google.maps.LatLngLiteral;
          placeId?: string;
          query?: string;
      }
      class DirectionsService {
        constructor();
        route(
          request: google.maps.DirectionsRequest,
          callback: (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => void
        ): void; // Callback style implies void or Promise depending on exact API version/wrapper
      }
    }
  }
  // Ensure window.google is also recognized
  // Fix: Merged Window interface declarations and corrected Popup constructor signature.
  interface Window {
    google: typeof google;
    Popup: new (position: google.maps.LatLng, content: HTMLElement) => CustomPopup;
  }
}

// Early check for Google Maps API script
if (typeof window.google === 'undefined' || typeof window.google.maps === 'undefined') {
  const mapsErrorDiv = document.getElementById('error-message') || document.createElement('div');
  if (!document.getElementById('error-message')) {
      mapsErrorDiv.id = 'error-message';
      mapsErrorDiv.className = 'error'; // Ensure basic styling
      const searchContainer = document.querySelector('.search-container') || document.body;
      searchContainer.appendChild(mapsErrorDiv);
  }
  const errorMsg = "CRITICAL ERROR: Google Maps API not loaded. `window.google.maps` is undefined. Potential issues: \n1. Incorrect or missing Google Maps API script tag in app.html. \n2. Invalid or restricted API key. (Check Google Cloud Console for 'Maps JavaScript API' errors). \n3. Billing not enabled for the project in Google Cloud Console. \n4. Network connection issues preventing script download from maps.googleapis.com. \n5. Browser extensions blocking Google scripts. \nPlease check these and reload the page.";
  mapsErrorDiv.textContent = errorMsg;
  console.error(errorMsg);
  // Stop further script execution if Maps API is not loaded
  throw new Error("Google Maps API failed to load.");
}


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {FunctionDeclaration, GoogleGenAI, Type, GenerateContentResponse, Chat} from '@google/genai';

// Fix: Removed problematic 'as { ... }' casts from importLibrary calls to resolve "Property does not exist" errors.
// TypeScript will infer types or they will default to 'any' based on global declarations.
const {Map, Polyline} = await (window as any).google.maps.importLibrary('maps');
const {LatLngBounds, LatLng} = await (window as any).google.maps.importLibrary('core');
const {AdvancedMarkerElement} = await (window as any).google.maps.importLibrary('marker');
const {DirectionsService, TravelMode, DirectionsStatus} = await (window as any).google.maps.importLibrary('routes');
const {spherical} = await (window as any).google.maps.importLibrary('geometry');
const {StreetViewService, StreetViewPanorama, StreetViewSource} = await (window as any).google.maps.importLibrary('streetView');


interface CustomPopup extends google.maps.OverlayView {
  // Fix: Used fully qualified google.maps.LatLng type.
  position: google.maps.LatLng;
  containerDiv: HTMLDivElement;
}

// Fix: Removed redundant/conflicting global Window declaration. Merged into the primary one above.

// Fix: Used fully qualified Google Maps types for variables.
let map: google.maps.Map;
let points: {lat: number, lng: number}[] = [];
// Fix: Used fully qualified google.maps.marker.AdvancedMarkerElement type.
let markers: google.maps.marker.AdvancedMarkerElement[] = [];
// Fix: Used fully qualified google.maps.Polyline type.
let lines: { poly: google.maps.Polyline, geodesicPoly: google.maps.Polyline, name: string, transport?: string, travelTime?: string }[] = [];

type PopUpData = {
  name: string,
  description: string,
  // Fix: Used fully qualified google.maps.LatLng type.
  position: google.maps.LatLng,
  popup: CustomPopup,
  content: HTMLElement,
  time?: string,
  duration?: string,
  sequence?: number,
  weatherOutlook?: string,
  localEvents?: string[]
};
let popUps: PopUpData[] = [];
// Fix: Used fully qualified google.maps.LatLngBounds type.
let bounds: google.maps.LatLngBounds;
let activeCardIndex = 0;
let isPlannerMode = false;
let dayPlanItinerary: any[] = [];

let is3DMode = false;
// Fix: Used fully qualified google.maps.StreetViewService type.
let streetViewService: google.maps.StreetViewService;
// Fix: Used fully qualified google.maps.StreetViewPanorama type.
let streetViewPanorama: google.maps.StreetViewPanorama;
let isStreetViewActive = false;
let streetViewContainer: HTMLDivElement;

// Fix: Used fully qualified google.maps.DirectionsService type.
let directionsService: google.maps.DirectionsService;
let currentStreetViewAnimationId: number | null = null;
let isAnimatingStreetViewRoute = false;
let currentAnimationPathIndex = 0;
// Fix: Used fully qualified google.maps.LatLng type.
let currentAnimationPath: google.maps.LatLng[] = [];

let chatSession: Chat | null = null;
type ChatMessage = { sender: 'user' | 'ai' | 'system', text: string, timestamp: Date, isHtml?: boolean };
let chatMessages: ChatMessage[] = [];
let isAiRoutePreviewActive = false;
let isAiRoutePreviewPaused = false;

const MAX_HISTORY_ITEMS = 15;
type SearchHistoryItem = { prompt: string, locations: string[], timestamp: number };
let currentQuickAccessMode: 'adventure' | 'restaurants' | 'shopping' | 'find_location' | null = null;


const promptInput = document.querySelector('#prompt-input') as HTMLInputElement;
const generateButton = document.querySelector('#generate') as HTMLButtonElement;
const resetButton = document.querySelector('#reset') as HTMLButtonElement;
const cardContainer = document.querySelector('#card-container') as HTMLDivElement;
const carouselIndicators = document.querySelector('#carousel-indicators') as HTMLDivElement;
const prevCardButton = document.querySelector('#prev-card') as HTMLButtonElement;
const nextCardButton = document.querySelector('#next-card') as HTMLButtonElement;
const cardCarousel = document.querySelector('.card-carousel') as HTMLDivElement;
const plannerModeToggle = document.querySelector('#planner-mode-toggle') as HTMLInputElement;
const timelineContainer = document.querySelector('#timeline-container') as HTMLDivElement;
const timeline = document.querySelector('#timeline') as HTMLDivElement;
const closeTimelineButton = document.querySelector('#close-timeline') as HTMLButtonElement;
const exportPlanButton = document.querySelector('#export-plan') as HTMLButtonElement;
const mapContainer = document.querySelector('#map-container') as HTMLDivElement;
const timelineToggle = document.querySelector('#timeline-toggle') as HTMLButtonElement;
const mapOverlay = document.querySelector('#map-overlay') as HTMLDivElement;
const spinner = document.querySelector('#spinner') as HTMLDivElement;
const errorMessage = document.querySelector('#error-message') as HTMLDivElement;
const threeDToggle = document.querySelector('#three-d-toggle') as HTMLInputElement;
const closeStreetViewButton = document.querySelector('#close-street-view') as HTMLButtonElement;
const searchContainer = document.querySelector('.search-container') as HTMLElement;

const chatToggleFab = document.querySelector('#chat-toggle-fab') as HTMLButtonElement;
const chatPanel = document.querySelector('#chat-panel') as HTMLDivElement;
const closeChatPanelButton = document.querySelector('#close-chat-panel') as HTMLButtonElement;
const chatMessagesContainer = document.querySelector('#chat-messages') as HTMLDivElement;
const chatInput = document.querySelector('#chat-input') as HTMLTextAreaElement;
const sendChatMessageButton = document.querySelector('#send-chat-message') as HTMLButtonElement;
const aiRouteControlsContainer = document.querySelector('#ai-route-controls') as HTMLDivElement;
const pauseAiRouteButton = document.querySelector('#pause-ai-route') as HTMLButtonElement;
const resumeAiRouteButton = document.querySelector('#resume-ai-route') as HTMLButtonElement;
const stopAiRouteButton = document.querySelector('#stop-ai-route') as HTMLButtonElement;
const showHistoryButton = document.querySelector('#show-history-button') as HTMLButtonElement;
const getRecommendationsButton = document.querySelector('#get-recommendations-button') as HTMLButtonElement;
const chatQuickAccessButtonsContainer = document.getElementById('chat-quick-access-buttons') as HTMLElement;
const useChatInfoOnMapButton = document.getElementById('use-chat-info-on-map-button') as HTMLButtonElement;


const triggerRoutePreviewFunctionDeclaration: FunctionDeclaration = {
  name: 'trigger_route_preview',
  description: 'Initiates a Street View animation along a route between two specified locations. Use this when the user asks to see the path or journey, AFTER they have already received map results from a general query.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      startLocationName: { type: Type.STRING, description: 'The name of the starting location for the route preview. Can be "CURRENT" to use the currently active/selected location.' },
      endLocationName: { type: Type.STRING, description: 'The name of the ending location for the route preview.' },
    },
    required: ['startLocationName', 'endLocationName'],
  },
};

const chatSystemInstructions = `You are an AI Route Assistant, Trip Recommender, and Quick Search Helper for an interactive map application.

Your primary goal is to help users visualize routes, discover new trip ideas, and initiate specific searches.
Users will interact with you for:
1.  **Route Previews (Post-Search)**: After a general map search, users might ask "Show me the way from [Place A] to [Place B]". Use the \`trigger_route_preview\` function.
2.  **Trip Recommendations**: If asked for new ideas, use their history (provided in context) to suggest 2-3 diverse trip ideas in JSON format.
3.  **Quick Access Modes**: The user might initiate a focused conversation by indicating they want to:
    *   **Plan an Adventure**: If the user's first message is "Let's plan an adventure!" or similar, ask about their desired type of adventure (e.g., hiking, city tour), general area/theme, and intensity.
    *   **Find Restaurants**: If the user's first message is "Help me find restaurants!" or similar, ask about preferred cuisine, ambiance, and city/area.
    *   **Go Shopping**: If the user's first message is "I want to go shopping!" or similar, ask about items, type of shopping, and city/area.
    *   **Find a Specific Location**: If the user's first message is "Help me find a specific location!" or similar, ask for the place name, landmark, or address.

**For Quick Access Modes:**
*   Keep the conversation brief (2-3 exchanges).
*   Ask clarifying questions one at a time.
*   Your goal is to gather enough detail to form a good search query for the main map application.
*   Once you have 2-3 key details, summarize them, confirm with the user, and then explicitly say something like "Okay, I have enough to search for that on the map!" or "Great! Ready to see those on the map?". This signals the app to enable a button for the user.
*   Do not try to use \`trigger_route_preview\` or provide JSON recommendations during these initial Quick Access conversations. The output will be used for a general map search.

**General Conversation:**
*   When the user sends a message, it might be prefixed with context (available/active locations from a previous map search, or history for recommendations). Base your responses on this.
*   Keep your text responses very brief. Confirm actions if calling functions.
*   If unclear, ask for clarification politely.
*   If no locations are loaded (for routes) or no history (for recommendations), inform the user.
*   Do not use markdown in your text responses unless it's part of the JSON structure for recommendations.
`;


const locationFunctionDeclaration: FunctionDeclaration = {
  name: 'setPin',
  description: 'Sets a pin on the map for a significant location or point of interest relevant to the user query. Use for individual landmarks, attractions, cities, natural wonders etc. Can be called multiple times for multiple distinct locations.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {type: Type.STRING, description: 'Clear, concise, and recognizable name of the location (e.g., "Eiffel Tower", "Golden Gate Bridge", "Mount Everest Base Camp").'},
      lat: {type: Type.NUMBER, description: 'Latitude of the location in decimal degrees.'},
      lng: {type: Type.NUMBER, description: 'Longitude of the location in decimal degrees.'},
      description: {type: Type.STRING, description: 'A brief (1-2 sentence) description of the location and its significance or what makes it interesting.'},
      activities: {type: Type.ARRAY, items: {type: Type.STRING}, description: 'Optional. 2-3 brief bullet points of activities one can do at this location (e.g., "Observation deck views", "Historical exhibits", "Hiking trails").'},
      historicalContext: {type: Type.STRING, description: 'Optional. A short note (1 sentence) about its historical relevance if applicable.'},
      photoSuggestions: {type: Type.ARRAY, items: {type: Type.STRING}, description: 'Optional. 1-2 suggestions for iconic photos one might take here (e.g., "Selfie with the skyline", "Panoramic shot from the peak").'},
      bestTimeToVisit: {type: Type.STRING, description: 'Optional. A very brief note on the best time/season to visit (e.g., "Spring for cherry blossoms", "Early morning for fewer crowds").'},
      weatherOutlook: {
        type: Type.STRING,
        description: "A brief, general weather outlook for the location, e.g., 'Often sunny and warm during summer'. Avoid specific dates or live temperatures. Focus on typical climate characteristics."
      },
      localEvents: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 2-3 general types of notable local events, annual festivals, or cultural happenings the location is known for. Do not include specific dates unless it's an extremely famous fixed-date event (e.g., 'New Year's Eve fireworks'). Focus on recurring or general event types like 'Annual Jazz Festival', 'Local Farmer's Market on Saturdays', 'Oktoberfest celebrations'."
      },
      duration: {type: Type.NUMBER, description: "Optional. Estimated duration in minutes a visitor might spend at this specific pin/location (e.g., 60 for 1 hour, 120 for 2 hours). Relevant for Day Planner mode."},
      time: {type: Type.STRING, description: "Optional. Suggested start time for visiting this pin/location in HH:MM format (e.g., '09:00', '14:30'). Relevant for Day Planner mode."},
      sequence: {type: Type.NUMBER, description: "Optional. The order/sequence number for this pin if it's part of a multi-stop itinerary or day plan (e.g., 1 for first stop, 2 for second)."},
    },
    required: ['name', 'lat', 'lng', 'description']
  }
};
const lineFunctionDeclaration: FunctionDeclaration = {
  name: 'setLeg',
  description: 'Draws a line or route segment on the map connecting two previously set pins or geographic points. Use this to illustrate paths, journeys, or connections between locations.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: 'A brief name for this leg or route segment (e.g., "Drive from Eiffel Tower to Louvre", "Walk across Golden Gate Bridge").' },
      startLat: { type: Type.NUMBER, description: 'Latitude of the starting point of the line.' },
      startLng: { type: Type.NUMBER, description: 'Longitude of the starting point of the line.' },
      endLat: { type: Type.NUMBER, description: 'Latitude of the ending point of the line.' },
      endLng: { type: Type.NUMBER, description: 'Longitude of the ending point of the line.' },
      transportMode: { type: Type.STRING, description: 'Optional. The mode of transport for this leg (e.g., "Driving", "Walking", "Cycling", "Public Transport", "Flight"). Helps in visualizing the route type.' },
      estimatedTravelTime: { type: Type.STRING, description: 'Optional. A human-readable estimated travel time for this leg (e.g., "Approx. 15 mins driving", "1 hour walk").' },
      routeDescription: { type: Type.STRING, description: 'Optional. A very brief description of the route or path itself if noteworthy (e.g., "Scenic coastal drive", "Path through the old city").' }
    },
    required: ['name', 'startLat', 'startLng', 'endLat', 'endLng']
  }
};
const systemInstructions = `## System Instructions for an Interactive Map Explorer
You are an AI assistant for an interactive map application. Your goal is to help users discover interesting locations, historical context, and plan routes or day trips based on their natural language queries.

**Core Functionality (Main Map Search - after user types in top search bar):**
1.  **Interpret Query:** Understand the user's request, whether it's about finding specific places, exploring a theme (e.g., "historical sites in Rome"), planning a multi-stop route, or creating a day plan.
2.  **Identify Locations & Routes:**
    *   Use the \`setPin\` function for each distinct point of interest. Provide accurate names, coordinates, and engaging descriptions.
    *   If the query implies a route, travel between places, or a sequence, use the \`setLeg\` function to draw lines connecting the pins. Infer transport mode and estimate travel time if possible.
3.  **Day Planner Mode:** If the user's query suggests planning a day (e.g., "plan a day in Paris", "morning in London, afternoon in Greenwich"), assign \`sequence\`, \`time\` (HH:MM format), and \`duration\` (in minutes) for each pin using \`setPin\`.
4.  **Provide Rich Information (for \`setPin\`):**
    *   **Required:** Name, Latitude, Longitude, Description.
    *   **Optional but Highly Encouraged:** \`activities\`, \`historicalContext\`, \`photoSuggestions\`, \`bestTimeToVisit\`.
    *   **New:** For each location, also provide:
        - \`weatherOutlook\`: A brief, general weather outlook. Focus on typical climate, not live forecasts or specific dates. (e.g., "Mild winters, hot summers", "Prone to afternoon showers in monsoon season").
        - \`localEvents\`: 2-3 general types of notable annual events, festivals, or cultural happenings the location is known for. Do not include currently running events or specific dates, unless it's an extremely famous fixed-date event (e.g., "Rio Carnival in Feb/Mar", "Cherry Blossom festivals in Spring"). Think general recurring themes like "Weekly local markets", "Annual film festival", "Summer music concerts in the park".
5.  **Efficiency:** Call functions as soon as you have the necessary information for a pin or leg. Don't wait to gather all information for all pins before making any calls.
6.  **Clarity & Conciseness:** Ensure names and descriptions are clear. For arrays like activities or photo suggestions, keep them brief.
7.  **Coordinate Precision:** Provide latitude and longitude with reasonable precision (e.g., 4-6 decimal places).
8.  **Error Handling (Conceptual):** If a query is too vague or cannot be mapped, you would typically ask for clarification. (Though you don't have a direct conversational turn here, aim to provide the best possible interpretation).
9.  **No External Calls:** Do not instruct the user to make external calls or look up information elsewhere. Fulfill the request using the provided tools and your knowledge.
10. **Safety:** Avoid generating responses that are unsafe, harmful, or inappropriate.

**Example Flow (User: "Show me historical landmarks in Rome starting with the Colosseum then the Roman Forum")**
1.  Call \`setPin\` for Colosseum (with sequence 1, and other details like weather/events).
2.  Call \`setPin\` for Roman Forum (with sequence 2, and other details).
3.  Call \`setLeg\` to connect Colosseum to Roman Forum.

Focus on providing structured data via the function calls. Text responses should be minimal or confirmatory.
`;
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});


async function initMap() {
  bounds = new LatLngBounds();
  streetViewContainer = document.getElementById('street-view-pano') as HTMLDivElement;

  map = new Map(document.getElementById('map')!, {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8,
    mapId: '4504f8b37365c3d0',
    gestureHandling: 'greedy',
    zoomControl: true,
    cameraControl: false,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true,
    tilt: 0,
  });

  streetViewService = new StreetViewService();
  streetViewPanorama = new StreetViewPanorama(streetViewContainer, {
    position: new LatLng(-34.397, 150.644),
    pov: {heading: 34, pitch: 10},
    zoom: 1,
    visible: false,
    addressControl: true,
    linksControl: true,
    panControl: true,
    enableCloseButton: false,
  });
  map.setStreetView(streetViewPanorama);
  directionsService = new DirectionsService();

  class Popup extends google.maps.OverlayView implements CustomPopup {
    // Fix: Used fully qualified google.maps.LatLng type.
    position: google.maps.LatLng;
    containerDiv: HTMLDivElement;

    // Fix: Used fully qualified google.maps.LatLng type for position parameter.
    constructor(position: google.maps.LatLng, content: HTMLElement) {
      super();
      // Fix: Used fully qualified google.maps.LatLng type.
      this.position = position;
      content.classList.add('popup-bubble');
      this.containerDiv = document.createElement('div');
      this.containerDiv.classList.add('popup-container');
      this.containerDiv.appendChild(content);
      google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }

    onAdd() {
      const panes = this.getPanes();
      if (panes) {
        panes.floatPane.appendChild(this.containerDiv);
      }
    }

    onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }

    draw() {
      const projection = this.getProjection();
      if (!projection) {
        this.containerDiv.style.display = 'none';
        return;
      }
      const divPosition = projection.fromLatLngToDivPixel(this.position);

      if (!divPosition) {
        this.containerDiv.style.display = 'none';
        return;
      }

      const display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 && !isStreetViewActive
          ? 'block'
          : 'none';

      if (display === 'block') {
        this.containerDiv.style.left = divPosition.x + 'px';
        this.containerDiv.style.top = divPosition.y + 'px';
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }
  }
  window.Popup = Popup;
  initChatSession();
  resetChatToInitialState(); // Show quick access buttons on init
  // Removed URL parameter handling logic as landing page is removed
}

if (typeof window.google !== 'undefined' && typeof window.google.maps !== 'undefined') {
    initMap();
}


async function initChatSession() {
  const chatAi = new GoogleGenAI({apiKey: process.env.API_KEY});
  try {
    chatSession = chatAi.chats.create({
      model: 'gemini-2.5-flash-preview-04-17',
      config: {
        systemInstruction: chatSystemInstructions, // Updated system instructions
        tools: [{ functionDeclarations: [triggerRoutePreviewFunctionDeclaration] }],
      },
    });
    addChatMessageToUI({sender: 'system', text: 'AI Assistant initialized. How can I help you explore today?', timestamp: new Date() });
  } catch (e) {
    console.error("Failed to initialize chat session:", e);
    addChatMessageToUI({sender: 'system', text: 'Error: Could not initialize AI Assistant. ' + (e as Error).message, timestamp: new Date() });
  }
}

function showQuickAccessButtons() {
    if (!chatQuickAccessButtonsContainer) return;
    chatQuickAccessButtonsContainer.innerHTML = `
        <button class="chat-quick-access-button" data-mode="adventure"><i class="fas fa-hiking"></i> Adventure</button>
        <button class="chat-quick-access-button" data-mode="restaurants"><i class="fas fa-utensils"></i> Restaurants</button>
        <button class="chat-quick-access-button" data-mode="shopping"><i class="fas fa-shopping-bag"></i> Shopping</button>
        <button class="chat-quick-access-button" data-mode="find_location"><i class="fas fa-map-pin"></i> Find Location</button>
    `;
    chatQuickAccessButtonsContainer.style.display = 'flex';
    useChatInfoOnMapButton.style.display = 'none';

    document.querySelectorAll('.chat-quick-access-button').forEach(button => {
        button.addEventListener('click', () => {
            const mode = (button as HTMLElement).dataset.mode as typeof currentQuickAccessMode;
            if (mode) {
                currentQuickAccessMode = mode;
                chatPanel.classList.add('chat-panel-centered');
                chatQuickAccessButtonsContainer.style.display = 'none';
                useChatInfoOnMapButton.style.display = 'block';
                useChatInfoOnMapButton.disabled = true;

                let starterPrompt = "";
                switch(mode) {
                    case 'adventure': starterPrompt = "Let's plan an adventure!"; break;
                    case 'restaurants': starterPrompt = "Help me find restaurants!"; break;
                    case 'shopping': starterPrompt = "I want to go shopping!"; break;
                    case 'find_location': starterPrompt = "Help me find a specific location!"; break;
                }
                addChatMessageToUI({sender: 'user', text: starterPrompt, timestamp: new Date()});
                handleSendChatMessage(starterPrompt, true); // Send starter prompt to AI
            }
        });
    });
}

function resetChatToInitialState() {
    chatMessagesContainer.innerHTML = ''; // Clear messages
    addChatMessageToUI({sender: 'system', text: 'How can I help you explore today? Choose an option or type your query.', timestamp: new Date() });
    showQuickAccessButtons();
    currentQuickAccessMode = null;
    chatPanel.classList.remove('chat-panel-centered');
    useChatInfoOnMapButton.style.display = 'none';
    chatInput.value = '';
}


function showTimeline() {
  if (!timelineContainer || !mapOverlay) return;
  timelineContainer.classList.add('visible');
  if (window.innerWidth <= 768) {
    mapOverlay.classList.add('visible');
  } else {
    mapContainer.classList.add('map-container-shifted');
  }
}
function hideTimeline() {
  if (!timelineContainer || !mapOverlay) return;
  timelineContainer.classList.remove('visible');
  mapOverlay.classList.remove('visible');
  mapContainer.classList.remove('map-container-shifted');
}

function adjustMapInterface() {
  const isTimelineVisible = timelineContainer.classList.contains('visible');

  if (window.innerWidth <= 768) {
    mapContainer.classList.remove('map-container-shifted');
    if (isTimelineVisible) {
      mapOverlay.classList.add('visible');
    } else {
      mapOverlay.classList.remove('visible'); // Only remove if not needed by chat either
    }
  } else {
    mapOverlay.classList.remove('visible');
    if (isTimelineVisible) {
        mapContainer.classList.add('map-container-shifted');
    } else {
        mapContainer.classList.remove('map-container-shifted');
    }
  }

  if (window.innerWidth > 768) {
    let shiftOffset = 0;
    if (isTimelineVisible) shiftOffset += timelineContainer.offsetWidth / 2;
    searchContainer.style.left = `calc(50% + ${shiftOffset}px)`;
    cardCarousel.style.left = `calc(50% + ${shiftOffset}px)`;
  } else {
    searchContainer.style.left = '50%';
    cardCarousel.style.left = '50%';
  }
}


if (promptInput) promptInput.addEventListener('keydown', (e: KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(promptInput.value); } });
generateButton.addEventListener('click', () => sendText(promptInput.value));
resetButton.addEventListener('click', () => { restart(); });
if (prevCardButton) prevCardButton.addEventListener('click', () => navigateCards(-1));
if (nextCardButton) nextCardButton.addEventListener('click', () => navigateCards(1));
if (plannerModeToggle) plannerModeToggle.addEventListener('change', (e) => { isPlannerMode = (e.target as HTMLInputElement).checked; timelineToggle.style.display = isPlannerMode ? 'flex' : 'none'; if (!isPlannerMode && timelineContainer.classList.contains('visible')) { hideTimeline(); adjustMapInterface(); } createLocationCards(); });
if (closeTimelineButton) closeTimelineButton.addEventListener('click', () => { hideTimeline(); adjustMapInterface(); });
if (timelineToggle) timelineToggle.addEventListener('click', () => { if (timelineContainer.classList.contains('visible')) { hideTimeline(); } else { showTimeline(); } adjustMapInterface(); });
if (mapOverlay) mapOverlay.addEventListener('click', () => {
    if (timelineContainer.classList.contains('visible')) {
        hideTimeline();
        adjustMapInterface();
    }
    // Chat panel overlay logic removed as it's a floating/centered window now
});
if (exportPlanButton) exportPlanButton.addEventListener('click', () => exportDayPlan());
if (threeDToggle) threeDToggle.addEventListener('change', () => { is3DMode = threeDToggle.checked; toggle3DView(); });
if (closeStreetViewButton) closeStreetViewButton.addEventListener('click', () => hideStreetView());

if (chatToggleFab) chatToggleFab.addEventListener('click', toggleChatPanel);
if (closeChatPanelButton) closeChatPanelButton.addEventListener('click', hideChatPanel);
if (sendChatMessageButton) sendChatMessageButton.addEventListener('click', () => handleSendChatMessage(chatInput.value.trim()));
if (chatInput) {
  chatInput.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendChatMessage(chatInput.value.trim());
    }
  });
}
if (pauseAiRouteButton) pauseAiRouteButton.addEventListener('click', pauseAiRoutePreview);
if (resumeAiRouteButton) resumeAiRouteButton.addEventListener('click', resumeAiRoutePreview);
if (stopAiRouteButton) stopAiRouteButton.addEventListener('click', () => stopAiRoutePreview());
if (showHistoryButton) showHistoryButton.addEventListener('click', displaySearchHistory);
if (getRecommendationsButton) getRecommendationsButton.addEventListener('click', handleGetRecommendations);
if (useChatInfoOnMapButton) useChatInfoOnMapButton.addEventListener('click', handleUseChatInfoOnMap);


function restart() {
  if (isStreetViewActive || isAnimatingStreetViewRoute || isAiRoutePreviewActive) {
    hideStreetView();
  }
  is3DMode = false;
  if (threeDToggle) threeDToggle.checked = false;
  toggle3DView();

  points = [];
  bounds = new LatLngBounds();
  dayPlanItinerary = [];

  markers.forEach((marker) => marker.map = null);
  markers = [];

  lines.forEach((line) => {
    line.poly.setMap(null);
    line.geodesicPoly.setMap(null);
  });
  lines = [];

  popUps.forEach((popupItem) => {
    popupItem.popup.setMap(null);
    if (popupItem.content && popupItem.content.remove) popupItem.content.remove();
  });
  popUps = [];

  if (cardContainer) cardContainer.innerHTML = '';
  if (carouselIndicators) carouselIndicators.innerHTML = '';
  if (cardCarousel) cardCarousel.style.display = 'none';
  if (timeline) timeline.innerHTML = '';
  if (timelineContainer && timelineContainer.classList.contains('visible')) { hideTimeline(); adjustMapInterface(); }
  // Chat panel reset is handled by resetChatToInitialState or hideChatPanel
  if (chatPanel && chatPanel.classList.contains('visible') && !currentQuickAccessMode) {
     resetChatToInitialState(); // Reset to show quick access if not in a mode
  } else if (currentQuickAccessMode) {
    // If a quick access mode was active, simply hide, don't reset yet.
    // Or decide if reset is appropriate here too. For now, let UseInfo button handle full reset.
  }

  if (promptInput) promptInput.value = '';
  if (errorMessage) {
    errorMessage.innerHTML = '';
    errorMessage.style.backgroundColor = '';
    errorMessage.style.color = 'red';
  }
  updateAiRouteControls();
}

async function sendText(prompt: string) {
  if (!prompt) return;
  restart(); // This will also reset chat to initial state if it was open.
  spinner.classList.remove('hidden');
  generateButton.classList.add('loading');
  if (errorMessage && !errorMessage.textContent?.includes('Starting with your')) {
    errorMessage.innerHTML = '';
  }


  try {
    const result: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: [{role: 'user', parts: [{text: prompt}]}],
      config:{
        systemInstruction: systemInstructions, // Main system instructions for map search
        tools: [{functionDeclarations: [locationFunctionDeclaration, lineFunctionDeclaration]}]
      }
    });

    if (result.functionCalls && result.functionCalls.length > 0) {
      for (const fn of result.functionCalls) {
        if (fn.name === 'setPin') {
          await setPin(fn.args);
        } else if (fn.name === 'setLeg') {
          await setLeg(fn.args);
        }
      }
      if (popUps.length > 0) {
        createLocationCards();
        if(bounds && !bounds.isEmpty()) map.fitBounds(bounds);
        highlightCard(0);
        saveSearchToHistory(prompt, popUps.map(p => p.name));
        if (errorMessage && errorMessage.textContent?.includes('Starting with your')) {
            errorMessage.innerHTML = '';
            errorMessage.style.backgroundColor = '';
            errorMessage.style.color = 'red';
        }
      } else {
        if (errorMessage) errorMessage.innerHTML = 'No locations found for your query. Try being more specific or broader.';
      }
      if (isPlannerMode && popUps.length > 0) {
        createTimeline();
      }
    } else {
       if (errorMessage) errorMessage.innerHTML = 'Could not understand the request or no locations found. Please try rephrasing your query.';
       console.warn("No function calls from AI:", result.text);
    }

  } catch (e: any) {
    console.error('Error generating content:', e);
    if (errorMessage) errorMessage.innerHTML = 'Error generating locations. Please check your query or API key. ' + e.message;
  } finally {
    spinner.classList.add('hidden');
    generateButton.classList.remove('loading');
    // After a main search, reset chat to initial state with quick access buttons
    if (chatPanel.classList.contains('visible')) {
        resetChatToInitialState();
    }
  }
}

async function setPin(args: any): Promise<boolean> {
  if (!args.name || isNaN(parseFloat(args.lat)) || isNaN(parseFloat(args.lng))) {
    console.warn('Skipping pin due to missing name or invalid coordinates:', args);
    if (errorMessage && !errorMessage.textContent?.includes('skipped')) {
        errorMessage.innerHTML += '<br>Some locations were skipped due to invalid data from AI.';
    }
    return false;
  }
  const position = new LatLng(parseFloat(args.lat), parseFloat(args.lng));
  points.push({lat: position.lat(), lng: position.lng()});
  bounds.extend(position);

  const content = document.createElement('div');
  content.innerHTML = `<b>${args.name}</b><br>${args.description || ''}`;

  const popup = new window.Popup(position, content);
  popup.setMap(map);

  const pinGlyph = document.createElement('div');
  pinGlyph.className = 'pin-glyph';
  pinGlyph.textContent = popUps.length + 1 <= 9 ? (popUps.length + 1).toString() : '📍';

  const marker = new AdvancedMarkerElement({
    map,
    position,
    title: args.name,
    content: pinGlyph,
  });
  markers.push(marker);

  popUps.push({
    name: args.name,
    description: args.description,
    position,
    popup,
    content,
    time: args.time,
    duration: args.duration ? args.duration.toString() : undefined,
    sequence: args.sequence,
    weatherOutlook: args.weatherOutlook,
    localEvents: args.localEvents
  });

  marker.addListener('gmp-click', () => {
    const index = popUps.findIndex(p => p.name === args.name && p.position.equals(position));
    if (index !== -1) {
      highlightCard(index);
      map.panTo(position);
    }
  });
  return true;
}

async function setLeg(args: any): Promise<boolean> {
  if (isNaN(parseFloat(args.startLat)) || isNaN(parseFloat(args.startLng)) ||
      isNaN(parseFloat(args.endLat)) || isNaN(parseFloat(args.endLng))) {
    console.warn('Skipping leg due to invalid coordinates:', args);
    if (errorMessage && !errorMessage.textContent?.includes('skipped leg')) {
        errorMessage.innerHTML += '<br>Some route lines were skipped due to invalid data from AI.';
    }
    return false;
  }

  const startPoint = new LatLng(parseFloat(args.startLat), parseFloat(args.startLng));
  const endPoint = new LatLng(parseFloat(args.endLat), parseFloat(args.endLng));

  const poly = new Polyline({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: isPlannerMode ? 1 : 2,
    map: map,
    path: [startPoint, endPoint],
    ...(isPlannerMode && {icons: [{icon: {path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 3}, offset: '0', repeat: '20px'}]})
  });

  const geodesicPoly = new Polyline({
    strokeColor: '#CC0099',
    strokeOpacity: 0,
    geodesic: true,
    map: map,
    path: [startPoint, endPoint]
  });

  lines.push({ poly, geodesicPoly, name: args.name, transport: args.transportMode, travelTime: args.estimatedTravelTime });
  bounds.extend(startPoint);
  bounds.extend(endPoint);
  return true;
}

function createTimeline() {
  if (!timeline) return;
  timeline.innerHTML = '';

  const sortedPopUps = isPlannerMode && popUps.some(p => p.sequence !== undefined)
    ? [...popUps].sort((a, b) => (a.sequence || Infinity) - (b.sequence || Infinity))
    : popUps;

  dayPlanItinerary = [];

  sortedPopUps.forEach((item, index) => {
    if (!isPlannerMode || item.sequence === undefined) return;

    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    if (activeCardIndex === index) timelineItem.classList.add('active');

    let itemHTML = `
      <div class="timeline-time">${item.time || 'Any time'}</div>
      <div class="timeline-connector">
        <div class="timeline-dot"></div>
        ${index < sortedPopUps.filter(p => p.sequence !== undefined).length - 1 ? '<div class="timeline-line"></div>' : ''}
      </div>
      <div class="timeline-content" data-card-index="${index}">
        <div class="timeline-title">${item.name}</div>
        <div class="timeline-description">${item.description || 'No details.'}</div>
    `;
    if (item.duration) {
      itemHTML += `<div class="timeline-duration"><i class="fas fa-clock"></i> ${item.duration} min</div>`;
    }
    itemHTML += `</div>`;
    timelineItem.innerHTML = itemHTML;

    const contentElement = timelineItem.querySelector('.timeline-content') as HTMLElement;
    if (contentElement) {
      contentElement.addEventListener('click', () => {
        highlightCard(index);
        map.panTo(item.position);
      });
    }
    timeline.appendChild(timelineItem);
    dayPlanItinerary.push(item);
  });
}

function getTransportIcon(transportType: string): string {
  if (!transportType) return 'fa-route';
  const mode = transportType.toLowerCase();
  if (mode.includes('driv')) return 'fa-car';
  if (mode.includes('walk')) return 'fa-walking';
  if (mode.includes('cycl') || mode.includes('bike')) return 'fa-bicycle';
  if (mode.includes('public') || mode.includes('bus') || mode.includes('train') || mode.includes('subway')) return 'fa-bus-alt';
  if (mode.includes('flight') || mode.includes('plane')) return 'fa-plane';
  return 'fa-route';
}
function getPlaceholderImage(locationName: string): string {
  const hash = locationName.split("").reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const color = `hsl(${hash % 360}, 70%, 80%)`;
  const initials = locationName.split(' ').map(word => word[0]).join('').substring(0,2).toUpperCase();
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120'%3E%3Crect width='100%' height='100%' fill='${color}'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='40' fill='%23fff' text-anchor='middle' dy='.3em'%3E${initials}%3C/text%3E%3C/svg%3E`;
}

function getWeatherIcon(weatherOutlook?: string): string {
  if (!weatherOutlook) return '<i class="fas fa-question-circle"></i>';
  const outlook = weatherOutlook.toLowerCase();
  if (outlook.includes('sun') || outlook.includes('clear')) return '<i class="fas fa-sun" style="color: #FFD700;"></i>';
  if (outlook.includes('cloud')) return '<i class="fas fa-cloud" style="color: #A9A9A9;"></i>';
  if (outlook.includes('rain') || outlook.includes('shower')) return '<i class="fas fa-cloud-showers-heavy" style="color: #4682B4;"></i>';
  if (outlook.includes('snow')) return '<i class="fas fa-snowflake" style="color: #ADD8E6;"></i>';
  if (outlook.includes('storm') || outlook.includes('thunder')) return '<i class="fas fa-bolt" style="color: #FFA500;"></i>';
  if (outlook.includes('wind')) return '<i class="fas fa-wind" style="color: #87CEEB;"></i>';
  if (outlook.includes('fog') || outlook.includes('mist')) return '<i class="fas fa-smog" style="color: #D3D3D3;"></i>';
  return '<i class="fas fa-thermometer-half" style="color: #777;"></i>';
}

function createLocationCards() {
  if (!cardContainer || !carouselIndicators) return;
  cardContainer.innerHTML = '';
  carouselIndicators.innerHTML = '';

  const sortedPopUps = isPlannerMode && popUps.some(p => p.sequence !== undefined)
    ? [...popUps].sort((a, b) => (a.sequence || Infinity) - (b.sequence || Infinity))
    : popUps;


  sortedPopUps.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'location-card';
    if (isPlannerMode) card.classList.add('day-planner-card');

    let cardHTML = `
      <div class="card-image" style="background-image: url('${getPlaceholderImage(item.name)}');"></div>
      <div class="card-content">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-description">${item.description || 'No description available.'}</p>
        <p class="card-coordinates">Lat: ${item.position.lat().toFixed(4)}, Lng: ${item.position.lng().toFixed(4)}</p>`;

    if (item.weatherOutlook) {
      cardHTML += `<div class="card-weather">${getWeatherIcon(item.weatherOutlook)} ${item.weatherOutlook}</div>`;
    }
    if (item.localEvents && item.localEvents.length > 0) {
      cardHTML += `<div class="card-events"><strong>Events:</strong><ul>${item.localEvents.map(event => `<li>${event}</li>`).join('')}</ul></div>`;
    }

    if (isPlannerMode) {
      if (item.time) cardHTML += `<div class="card-time-badge">${item.time}</div>`;
      if (item.sequence) cardHTML += `<div class="card-sequence-badge">${item.sequence}</div>`;
      if (item.duration) cardHTML += `<p class="card-duration"><i class="fas fa-clock"></i> ${item.duration} min</p>`;
    }

    cardHTML += `<div class="card-buttons">
                    <button class="street-view-button" data-index="${index}"><i class="fas fa-street-view"></i> Street View</button>
                    ${index < sortedPopUps.length -1 ? `<button class="route-preview-button" data-start="${index}" data-end="${index+1}"><i class="fas fa-route"></i> Route to Next</button>` : ''}
                 </div>
      </div>
    `;
    card.innerHTML = cardHTML;

    card.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('button')) return;
      highlightCard(index);
      map.panTo(item.position);
      if(item.popup) {
        popUps.forEach(p => p.popup.containerDiv.classList.remove('popup-active'));
        item.popup.containerDiv.classList.add('popup-active');
        item.popup.setMap(map);
      }
    });

    cardContainer.appendChild(card);

    const dot = document.createElement('div');
    dot.className = 'carousel-dot';
    dot.addEventListener('click', () => highlightCard(index));
    carouselIndicators.appendChild(dot);
  });

  document.querySelectorAll('.street-view-button').forEach(button => {
      button.addEventListener('click', (e) => {
          e.stopPropagation();
          const sortedIndex = parseInt((e.currentTarget as HTMLElement).dataset.index!);
          const targetPopUp = sortedPopUps[sortedIndex];
          if (targetPopUp) showStreetView(targetPopUp.position);
      });
  });

  document.querySelectorAll('.route-preview-button').forEach(button => {
      button.addEventListener('click', (e) => {
          e.stopPropagation();
          const startIndexSorted = parseInt((e.currentTarget as HTMLElement).dataset.start!);
          const endIndexSorted = parseInt((e.currentTarget as HTMLElement).dataset.end!);

          const startPopUp = sortedPopUps[startIndexSorted];
          const endPopUp = sortedPopUps[endIndexSorted];

          if (startPopUp && endPopUp) {
             const originalStartIndex = popUps.findIndex(p => p.position.equals(startPopUp.position) && p.name === startPopUp.name);
             const originalEndIndex = popUps.findIndex(p => p.position.equals(endPopUp.position) && p.name === endPopUp.name);
             if(originalStartIndex !== -1 && originalEndIndex !== -1) {
                initiateStreetViewRouteAnimation(originalStartIndex, originalEndIndex);
             } else {
                console.error("Could not map sorted card indices to original popUps for route preview.");
                addChatMessageToUI({sender:'system', text: 'Error: Could not find original locations for route preview.', timestamp: new Date()});
             }
          }
      });
  });

  if (sortedPopUps.length > 0) {
    if (cardCarousel) cardCarousel.style.display = 'block';
    highlightCard(activeCardIndex < sortedPopUps.length ? activeCardIndex : 0);
  } else {
    if (cardCarousel) cardCarousel.style.display = 'none';
  }
}

function highlightCard(index: number) {
  const cards = cardContainer.querySelectorAll('.location-card');
  const dots = carouselIndicators.querySelectorAll('.carousel-dot');
  const sortedPopUps = isPlannerMode && popUps.some(p => p.sequence !== undefined)
    ? [...popUps].sort((a, b) => (a.sequence || Infinity) - (b.sequence || Infinity))
    : popUps;

  if (index >= sortedPopUps.length || index < 0) {
    console.warn("Highlight index out of bounds:", index);
    return;
  }
  activeCardIndex = index;

  cards.forEach((card, i) => {
    card.classList.toggle('card-active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  if (cards[index]) {
    const scrollBehavior = Math.abs(index - (cards.length / 2)) > 2 ? 'auto' : 'smooth';
    if (cardCarousel.classList.contains('street-view-active')) {
        (cards[index] as HTMLElement).scrollIntoView({ behavior: scrollBehavior, block: 'nearest' });
    } else {
        (cards[index] as HTMLElement).scrollIntoView({ behavior: scrollBehavior, block: 'nearest', inline: 'center' });
    }
  }

  const currentPopUp = sortedPopUps[index];
  if (currentPopUp && map) {
    map.panTo(currentPopUp.position);
    popUps.forEach(p => {
      p.popup.containerDiv.classList.remove('popup-active');
      p.popup.setMap(null);
    });
    currentPopUp.popup.containerDiv.classList.add('popup-active');
    currentPopUp.popup.setMap(map);
  }

  if (isPlannerMode) {
    highlightTimelineItem(index);
  }
}
function highlightTimelineItem(cardIndex: number) {
  if (!timeline) return;
  const timelineItems = timeline.querySelectorAll('.timeline-content');
  timelineItems.forEach((item, i) => {
    item.classList.toggle('active', i === cardIndex);
  });
}
function navigateCards(direction: number) {
  const numCards = cardContainer.children.length;
  if (numCards === 0) return;
  let newIndex = activeCardIndex + direction;
  if (newIndex < 0) newIndex = numCards - 1;
  if (newIndex >= numCards) newIndex = 0;
  highlightCard(newIndex);
}
function exportDayPlan() {
  if (dayPlanItinerary.length === 0) {
    alert('No day plan to export. Add items in Day Planner mode first.');
    return;
  }
  let planText = "Your Day Plan:\n\n";
  dayPlanItinerary.forEach(item => {
    planText += `Sequence: ${item.sequence}\n`;
    planText += `Time: ${item.time || 'N/A'}\n`;
    planText += `Location: ${item.name}\n`;
    planText += `Duration: ${item.duration || 'N/A'} minutes\n`;
    planText += `Description: ${item.description || 'N/A'}\n\n`;
  });

  const blob = new Blob([planText], { type: 'text/plain' });
  const anchor = document.createElement('a');
  anchor.download = 'day_plan.txt';
  anchor.href = window.URL.createObjectURL(blob);
  anchor.click();
  window.URL.revokeObjectURL(anchor.href);
}
function toggle3DView() {
  if (!map) return;
  if (is3DMode) {
    map.setTilt(45);
    map.setHeading(0);
  } else {
    map.setTilt(0);
  }
}
// Fix: Used fully qualified google.maps.LatLng type for position parameter.
async function showStreetView(position: google.maps.LatLng, isAiPreviewSetup = false) {
  if (!streetViewService || !streetViewPanorama || !map || !streetViewContainer || !closeStreetViewButton || !cardCarousel || !resetButton) return;

  spinner.classList.remove('hidden');
  isStreetViewActive = true;

  try {
    const { data } = await streetViewService.getPanorama({ location: position, radius: 50, source: google.maps.StreetViewSource.OUTDOOR });
    spinner.classList.add('hidden');

    if (data && data.location && data.location.latLng) {
      streetViewPanorama.setPosition(data.location.latLng);
      streetViewPanorama.setVisible(true);
      streetViewContainer.style.display = 'block';
      closeStreetViewButton.style.display = 'flex';

      cardCarousel.classList.add('street-view-active');
      resetButton.classList.add('street-view-active');
      searchContainer.classList.add('street-view-active');

      popUps.forEach(p => p.popup.setMap(null));

      if (!isAiPreviewSetup && chatPanel.classList.contains('visible') && window.innerWidth <= 768) {
          hideChatPanel();
      }


    } else {
      addChatMessageToUI({sender: 'system', text: 'Street View imagery not available for this location.', timestamp: new Date()});
      hideStreetView(true);
    }
  } catch (error) {
    spinner.classList.add('hidden');
    console.error("Error showing Street View:", error);
    addChatMessageToUI({sender: 'system', text: 'Error loading Street View. ' + (error as Error).message, timestamp: new Date()});
    hideStreetView(true);
  }
}

function hideStreetView(isErrorCase = false) {
  if (!streetViewPanorama || !streetViewContainer || !closeStreetViewButton || !cardCarousel || !resetButton) return;

  if (isAnimatingStreetViewRoute || isAiRoutePreviewActive) {
      stopStreetViewAnimation();
      if (isAiRoutePreviewActive) stopAiRoutePreview(true);
  }

  streetViewPanorama.setVisible(false);
  streetViewContainer.style.display = 'none';
  closeStreetViewButton.style.display = 'none';

  cardCarousel.classList.remove('street-view-active');
  resetButton.classList.remove('street-view-active');
  searchContainer.classList.remove('street-view-active');

  isStreetViewActive = false;

  if (!isErrorCase && popUps[activeCardIndex]) {
     highlightCard(activeCardIndex);
  } else if (popUps.length > 0 && popUps[0]) {
    highlightCard(0);
  }
  popUps.forEach(p => p.popup.draw());
}
async function initiateStreetViewRouteAnimation(startIndex: number, endIndex: number, isAiInitiated = false) {
  if (startIndex < 0 || startIndex >= popUps.length || endIndex < 0 || endIndex >= popUps.length) {
    addChatMessageToUI({sender:'system', text: `Error: Invalid location indices for route preview. ${startIndex}, ${endIndex}`, timestamp: new Date()});
    return;
  }

  const startLoc = popUps[startIndex].position;
  const endLoc = popUps[endIndex].position;

  isAiRoutePreviewActive = isAiInitiated;
  updateAiRouteControls();

  await showStreetView(startLoc, isAiInitiated);

  if (!isStreetViewActive) {
      addChatMessageToUI({sender:'system', text: `Cannot start route preview: Street View not available for start location.`, timestamp: new Date()});
      if (isAiInitiated) stopAiRoutePreview(true);
      return;
  }

  spinner.classList.remove('hidden');

  directionsService.route({
    origin: startLoc,
    destination: endLoc,
    travelMode: google.maps.TravelMode.DRIVING // Fix: Used fully qualified google.maps.TravelMode
    // Fix: Used fully qualified google.maps.DirectionsStatus for the status parameter type.
  }, (response: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
    spinner.classList.add('hidden');
    if (status === google.maps.DirectionsStatus.OK && response && response.routes && response.routes[0]) { // Fix: Used fully qualified google.maps.DirectionsStatus
      currentAnimationPath = response.routes[0].overview_path;
      currentAnimationPathIndex = 0;
      if (isAiInitiated && isAiRoutePreviewPaused) {
          addChatMessageToUI({sender:'system', text: `Route to ${popUps[endIndex].name} loaded. Resume to start preview.`, timestamp: new Date()});
      } else {
          isAiRoutePreviewPaused = false;
          startStreetViewPathAnimation(currentAnimationPath);
      }
    } else {
      console.error('Directions request failed due to ' + status);
      addChatMessageToUI({sender:'system', text: `Error: Could not get directions for route preview. Status: ${status}`, timestamp: new Date()});
      if (isAiInitiated) stopAiRoutePreview(true);
    }
  });
}
// Fix: Used fully qualified google.maps.LatLng for path parameter type.
function startStreetViewPathAnimation(path: google.maps.LatLng[]) {
  if (currentStreetViewAnimationId) {
    cancelAnimationFrame(currentStreetViewAnimationId);
  }
  isAnimatingStreetViewRoute = true;
  if (isAiRoutePreviewActive) isAiRoutePreviewPaused = false;
  updateAiRouteControls();
  processNextStreetViewPoint();
}

async function processNextStreetViewPoint() {
  if (!isAnimatingStreetViewRoute || currentAnimationPathIndex >= currentAnimationPath.length || (isAiRoutePreviewActive && isAiRoutePreviewPaused)) {
    if (currentAnimationPathIndex >= currentAnimationPath.length) {
      stopStreetViewAnimation(true);
    }
    return;
  }

  spinner.classList.remove('hidden');
  const currentPoint = currentAnimationPath[currentAnimationPathIndex];
  let nextPoint = currentPoint;
  if (currentAnimationPathIndex + 1 < currentAnimationPath.length) {
    nextPoint = currentAnimationPath[currentAnimationPathIndex + 1];
  }

  try {
    const { data } = await streetViewService.getPanorama({
      location: currentPoint,
      radius: 100,
      source: google.maps.StreetViewSource.OUTDOOR // Fix: Used fully qualified google.maps.StreetViewSource
    });
    spinner.classList.add('hidden');

    if (data && data.location && data.location.latLng) {
      streetViewPanorama.setPosition(data.location.latLng);
      const heading = spherical.computeHeading(data.location.latLng, nextPoint);
      streetViewPanorama.setPov({ heading: heading, pitch: 0 });
      streetViewPanorama.setVisible(true);

      currentAnimationPathIndex++;

      const cardToHighlight = popUps.findIndex(p => {
        if(!p.position) return false;
        const dist = spherical.computeDistanceBetween(currentPoint, p.position);
        return dist < 100;
      });
      if(cardToHighlight !== -1 && cardToHighlight !== activeCardIndex) {
        highlightCard(cardToHighlight);
      }

      currentStreetViewAnimationId = window.setTimeout(() => {
         currentStreetViewAnimationId = requestAnimationFrame(processNextStreetViewPoint);
      }, 500);

    } else {
      currentAnimationPathIndex++;
      currentStreetViewAnimationId = requestAnimationFrame(processNextStreetViewPoint);
    }
  } catch (error) {
    spinner.classList.add('hidden');
    console.warn("SV Pano error during animation, skipping point:", error);
    currentAnimationPathIndex++;
    currentStreetViewAnimationId = requestAnimationFrame(processNextStreetViewPoint);
  }
}
function stopStreetViewAnimation(isNaturalFinish = false) {
  isAnimatingStreetViewRoute = false;
  if (currentStreetViewAnimationId) {
    cancelAnimationFrame(currentStreetViewAnimationId);
    window.clearTimeout(currentStreetViewAnimationId as number); // Cast to number for clearTimeout
    currentStreetViewAnimationId = null;
  }
  currentAnimationPath = [];
  currentAnimationPathIndex = 0;

  if (isNaturalFinish && isAiRoutePreviewActive) {
      addChatMessageToUI({sender:'system', text: 'Route preview finished.', timestamp: new Date()});
  }
}
function toggleChatPanel() {
  if (!chatPanel || !mapOverlay || !chatToggleFab) return;
  const currentlyVisible = chatPanel.classList.contains('visible');
  if (currentlyVisible) {
    hideChatPanel();
  } else {
    chatPanel.classList.add('visible');
    chatToggleFab.classList.add('chat-open');
    if (chatMessages.length <= 1 || currentQuickAccessMode === null) { // Show quick access if chat is empty or mode not set
        resetChatToInitialState(); // This will also remove centered if it was there
    }
    // No map shifting, no call to adjustMapInterface for chat
  }
}
function hideChatPanel() {
  if (!chatPanel || !mapOverlay || !chatToggleFab) return;
  chatPanel.classList.remove('visible');
  chatToggleFab.classList.remove('chat-open');
  chatPanel.classList.remove('chat-panel-centered'); // Always remove centered on hide
  currentQuickAccessMode = null; // Reset mode
  useChatInfoOnMapButton.style.display = 'none';
  // No map shifting, no call to adjustMapInterface for chat
}

function addChatMessageToUI(message: ChatMessage) {
  // Prepend quick access buttons if this is the very first system message after init or reset
  if (message.sender === 'system' && chatMessagesContainer.children.length === 0 && chatQuickAccessButtonsContainer) {
      chatMessagesContainer.appendChild(chatQuickAccessButtonsContainer);
      showQuickAccessButtons();
  }

  const messageEl = document.createElement('div');
  messageEl.classList.add('chat-message', message.sender);
  if (message.isHtml) {
    messageEl.innerHTML = message.text;
  } else {
    messageEl.textContent = message.text;
  }
  // Insert message before quick access buttons if they are present
  if (chatQuickAccessButtonsContainer && chatQuickAccessButtonsContainer.parentElement === chatMessagesContainer) {
      chatMessagesContainer.insertBefore(messageEl, chatQuickAccessButtonsContainer);
  } else {
      chatMessagesContainer.appendChild(messageEl);
  }

  chatMessages.push(message); // Store message after UI update to avoid duplicate system message check
  chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

   messageEl.querySelectorAll('.clickable-history-item').forEach(item => {
    item.addEventListener('click', () => {
      const promptText = (item as HTMLElement).dataset.prompt;
      if (promptInput && promptText) {
        promptInput.value = promptText;
        hideChatPanel();
        sendText(promptText);
      }
    });
  });
  messageEl.querySelectorAll('.clickable-recommendation-item').forEach(item => {
    item.addEventListener('click', () => {
      const promptText = (item as HTMLElement).dataset.prompt;
      if (promptInput && promptText) {
        promptInput.value = promptText;
        hideChatPanel();
        sendText(promptText);
      }
    });
  });
}


async function handleSendChatMessage(text: string, isQuickAccessStarter = false) {
  if (!text || !chatSession) return;

  if(!isQuickAccessStarter) { // If not a quick access starter, add user message to UI
    addChatMessageToUI({ sender: 'user', text, timestamp: new Date() });
  }
  chatInput.value = '';
  spinner.classList.remove('hidden');
  if(chatQuickAccessButtonsContainer && !isQuickAccessStarter && !currentQuickAccessMode) { // Hide quick access if user types normally
      chatQuickAccessButtonsContainer.style.display = 'none';
  }


  try {
    const locationNames = popUps.map(p => p.name).join(', ');
    const activeLocationName = popUps[activeCardIndex]?.name;
    let contextPrefix = '';
    if (!currentQuickAccessMode) { // Only add map context if not in quick access mode
        contextPrefix = `Context: Available locations from map: [${locationNames || 'None'}]. Active map location: [${activeLocationName || 'None'}].\nUser: `;
    }


    const responseStream = await chatSession.sendMessageStream({message: contextPrefix + text});
    let aiResponseText = '';
    let functionCalls: any[] = [];
    let potentialJson = '';

    for await (const chunk of responseStream) {
        if (chunk.text) {
            aiResponseText += chunk.text;
            potentialJson += chunk.text;
        }
        if (chunk.functionCalls && chunk.functionCalls.length > 0) {
            functionCalls.push(...chunk.functionCalls);
        }
    }

    let parsedRecommendations = null;
    if (potentialJson.includes('"recommendations":')) {
        try {
            let jsonStr = potentialJson.trim();
            const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
            const match = jsonStr.match(fenceRegex);
            if (match && match[2]) {
                jsonStr = match[2].trim();
            }
            parsedRecommendations = JSON.parse(jsonStr);
        } catch (e) {
            console.warn("AI response was not the expected recommendations JSON:", e);
        }
    }

    if (parsedRecommendations && parsedRecommendations.recommendations) {
        displayRecommendations(parsedRecommendations.recommendations);
    } else if (aiResponseText) {
      addChatMessageToUI({ sender: 'ai', text: aiResponseText, timestamp: new Date() });
      if (currentQuickAccessMode && useChatInfoOnMapButton) {
        // Enable "Use Info & Search Map" button if AI indicates readiness
        const lowerResponse = aiResponseText.toLowerCase();
        if (lowerResponse.includes("on the map") || lowerResponse.includes("ready to search") || lowerResponse.includes("shall we check")) {
            useChatInfoOnMapButton.disabled = false;
        }
      }
    }


    for (const fn of functionCalls) { // This is for route previews after general search
      if (fn.name === 'trigger_route_preview' && !currentQuickAccessMode) {
        const args = fn.args;
        addChatMessageToUI({ sender: 'system', text: `AI trying to show route from ${args.startLocationName} to ${args.endLocationName}.`, timestamp: new Date() });

        let startIndex = -1;
        let endIndex = -1

        if (args.startLocationName?.toUpperCase() === 'CURRENT') {
            const sortedPopUps = isPlannerMode && popUps.some(p => p.sequence !== undefined)
                                ? [...popUps].sort((a, b) => (a.sequence || Infinity) - (b.sequence || Infinity))
                                : popUps;
            const activeSortedItem = sortedPopUps[activeCardIndex];
            if (activeSortedItem) {
                startIndex = popUps.findIndex(p => p.position.equals(activeSortedItem.position) && p.name === activeSortedItem.name);
            } else {
                startIndex = (popUps.length > 0) ? 0 : -1;
            }
        } else {
            startIndex = popUps.findIndex(p => p.name.toLowerCase() === args.startLocationName?.toLowerCase());
        }
        endIndex = popUps.findIndex(p => p.name.toLowerCase() === args.endLocationName?.toLowerCase());

        if (startIndex !== -1 && endIndex !== -1 && startIndex !== endIndex) {
            if (chatPanel.classList.contains('visible') && window.innerWidth <= 768) { // Close chat on mobile for street view
                hideChatPanel();
            }
            initiateStreetViewRouteAnimation(startIndex, endIndex, true);
        } else {
            addChatMessageToUI({ sender: 'system', text: `Could not find specified locations for route preview. Start: "${args.startLocationName}", End: "${args.endLocationName}". Please check names. (Indices found: ${startIndex}, ${endIndex})`, timestamp: new Date() });
        }
      }
    }

  } catch (e: any) {
    console.error("Chat send error:", e);
    addChatMessageToUI({ sender: 'system', text: 'Error communicating with AI. ' + e.message, timestamp: new Date() });
  } finally {
    spinner.classList.add('hidden');
  }
}

function handleUseChatInfoOnMap() {
    if (!currentQuickAccessMode || chatMessages.length === 0) return;

    // Attempt to build a query from the last few relevant messages.
    // This is a heuristic. A more robust way would be to ask AI to summarize a query.
    let queryParts: string[] = [];
    // Get the last 3-4 user and AI messages related to the current quick access mode.
    const relevantMessages = chatMessages.slice(-4).filter(msg => msg.sender === 'user' || msg.sender === 'ai');
    queryParts = relevantMessages.map(msg => msg.text);

    // A simple way: combine the original mode trigger and the last couple of exchanges
    let initialPrompt = "";
     switch(currentQuickAccessMode) {
        case 'adventure': initialPrompt = "Plan an adventure: "; break;
        case 'restaurants': initialPrompt = "Find restaurants: "; break;
        case 'shopping': initialPrompt = "Find shopping: "; break;
        case 'find_location': initialPrompt = "Find location: "; break;
    }
    const constructedQuery = initialPrompt + queryParts.join(' ');


    if (promptInput && constructedQuery.trim()) {
        promptInput.value = constructedQuery.trim();
        sendText(promptInput.value); // This will trigger restart() which resets chat
    } else {
        addChatMessageToUI({sender: 'system', text: "Could not determine a query from the conversation.", timestamp: new Date()});
    }

    chatPanel.classList.remove('chat-panel-centered');
    useChatInfoOnMapButton.style.display = 'none';
    currentQuickAccessMode = null;
    // `sendText` will call `restart` which will call `resetChatToInitialState`
    // So, no need to explicitly call resetChatToInitialState here if sendText is successful.
    // If sendText wasn't called, then we might need it:
    if (!constructedQuery.trim()) {
        resetChatToInitialState();
    }
    hideChatPanel(); // Close chat after initiating search
}


function updateAiRouteControls() {
  if (!aiRouteControlsContainer || !pauseAiRouteButton || !resumeAiRouteButton || !stopAiRouteButton) return;

  if (isAiRoutePreviewActive) {
    aiRouteControlsContainer.classList.add('visible');
    if (isAiRoutePreviewPaused) {
      pauseAiRouteButton.style.display = 'none';
      resumeAiRouteButton.style.display = 'flex';
    } else {
      pauseAiRouteButton.style.display = 'flex';
      resumeAiRouteButton.style.display = 'none';
    }
    stopAiRouteButton.style.display = 'flex';
  } else {
    aiRouteControlsContainer.classList.remove('visible');
  }
}
function pauseAiRoutePreview() {
  if (!isAiRoutePreviewActive || isAiRoutePreviewPaused) return;
  isAiRoutePreviewPaused = true;
  if (currentStreetViewAnimationId && typeof currentStreetViewAnimationId === 'number' && window. clearTimeout) {
      window.clearTimeout(currentStreetViewAnimationId);
  }

  addChatMessageToUI({ sender: 'system', text: 'AI route preview paused.', timestamp: new Date() });
  updateAiRouteControls();
}
function resumeAiRoutePreview() {
  if (!isAiRoutePreviewActive || !isAiRoutePreviewPaused) return;
  isAiRoutePreviewPaused = false;
  addChatMessageToUI({ sender: 'system', text: 'AI route preview resumed.', timestamp: new Date() });
  updateAiRouteControls();

  if (isAnimatingStreetViewRoute && currentAnimationPath.length > 0) {
      processNextStreetViewPoint();
  } else if (currentAnimationPath.length > 0) {
      startStreetViewPathAnimation(currentAnimationPath);
  }
}
function stopAiRoutePreview(calledFromHideStreetView = false) {
  if (!isAiRoutePreviewActive) return;

  isAiRoutePreviewActive = false;
  isAiRoutePreviewPaused = false;
  stopStreetViewAnimation();

  if (!calledFromHideStreetView) {
    addChatMessageToUI({ sender: 'system', text: 'AI route preview stopped.', timestamp: new Date() });
    hideStreetView();
  }
  updateAiRouteControls();
}

function saveSearchToHistory(prompt: string, locationNames: string[]) {
  let history: SearchHistoryItem[] = JSON.parse(localStorage.getItem('mapSearchHistory') || '[]');
  history.unshift({ prompt, locations: locationNames.slice(0, 5), timestamp: Date.now() });
  if (history.length > MAX_HISTORY_ITEMS) {
    history = history.slice(0, MAX_HISTORY_ITEMS);
  }
  localStorage.setItem('mapSearchHistory', JSON.stringify(history));
}

function loadSearchHistory(): SearchHistoryItem[] {
  return JSON.parse(localStorage.getItem('mapSearchHistory') || '[]');
}

function displaySearchHistory() {
  const history = loadSearchHistory();
  if (history.length === 0) {
    addChatMessageToUI({ sender: 'system', text: 'No search history found.', timestamp: new Date() });
    return;
  }
  // Ensure quick access buttons are hidden when showing history
  if (chatQuickAccessButtonsContainer) chatQuickAccessButtonsContainer.style.display = 'none';
  if (useChatInfoOnMapButton) useChatInfoOnMapButton.style.display = 'none';
  chatPanel.classList.remove('chat-panel-centered'); // History is general, not centered mode


  let historyHtml = '<strong>Your Past Searches:</strong><ul>';
  history.forEach(item => {
    const locationsPreview = item.locations.slice(0, 2).join(', ') + (item.locations.length > 2 ? '...' : '');
    historyHtml += `<li><a href="#" class="clickable-history-item" data-prompt="${item.prompt.replace(/"/g, '&quot;')}">
                        "${item.prompt}" (Found: ${locationsPreview || 'N/A'})
                      </a> - <small>${new Date(item.timestamp).toLocaleDateString()}</small>
                   </li>`;
  });
  historyHtml += '</ul>';
  addChatMessageToUI({ sender: 'system', text: historyHtml, timestamp: new Date(), isHtml: true });
}

async function handleGetRecommendations() {
  const history = loadSearchHistory();
  if (history.length === 0) {
    addChatMessageToUI({ sender: 'system', text: 'No search history to base recommendations on. Explore some places first!', timestamp: new Date() });
    return;
  }

  if (!chatSession) {
    addChatMessageToUI({ sender: 'system', text: 'Chat not initialized. Cannot get recommendations.', timestamp: new Date() });
    return;
  }
  // Ensure quick access buttons are hidden
  if (chatQuickAccessButtonsContainer) chatQuickAccessButtonsContainer.style.display = 'none';
  if (useChatInfoOnMapButton) useChatInfoOnMapButton.style.display = 'none';
  chatPanel.classList.remove('chat-panel-centered');


  const recentHistory = history.slice(0, 3).map(item => `"${item.prompt}" (Generated: ${item.locations.join(', ')})`).join('; ');
  const recommendationPrompt = `Context: Based on my recent search history: [${recentHistory}].\nUser: Please suggest 2-3 new trip ideas. Return your answer ONLY as a JSON object with a root key "recommendations", where each recommendation has "title", "description", and "keyLocation".`;

  addChatMessageToUI({ sender: 'user', text: "Suggest some trip ideas based on my history.", timestamp: new Date()});
  spinner.classList.remove('hidden');

  try {
    const response = await chatSession.sendMessage({message: recommendationPrompt});
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr);
      if (parsedData.recommendations) {
        displayRecommendations(parsedData.recommendations);
      } else {
        addChatMessageToUI({ sender: 'ai', text: "I couldn't generate recommendations in the expected format. Here's what I found: " + response.text, timestamp: new Date() });
      }
    } catch (e) {
      console.error("Failed to parse recommendations JSON:", e, "\nRaw AI response:", response.text);
      addChatMessageToUI({ sender: 'ai', text: "Sorry, I had trouble formatting those recommendations. Here's what I got: " + response.text.substring(0, 300), timestamp: new Date() });
    }

  } catch (e: any) {
    console.error("Error getting recommendations:", e);
    addChatMessageToUI({ sender: 'system', text: 'Error fetching recommendations: ' + e.message, timestamp: new Date() });
  } finally {
    spinner.classList.add('hidden');
  }
}

type Recommendation = { title: string, description: string, keyLocation: string };

function displayRecommendations(recommendations: Recommendation[]) {
  if (!recommendations || recommendations.length === 0) {
    addChatMessageToUI({ sender: 'ai', text: "I couldn't find any specific recommendations right now.", timestamp: new Date() });
    return;
  }
  // Ensure quick access buttons are hidden
  if (chatQuickAccessButtonsContainer) chatQuickAccessButtonsContainer.style.display = 'none';
  if (useChatInfoOnMapButton) useChatInfoOnMapButton.style.display = 'none';

  let html = '<strong>Here are some trip ideas for you:</strong><div class="recommendations-container">';
  recommendations.forEach(rec => {
    const promptForRec = `Explore ${rec.keyLocation} - ${rec.title}`;
    html += `<div class="recommendation-item">
               <h4>${rec.title}</h4>
               <p>${rec.description}</p>
               <p><small>Key Location: ${rec.keyLocation}</small></p>
               <button class="clickable-recommendation-item" data-prompt="${promptForRec.replace(/"/g, '&quot;')}">Explore this idea</button>
             </div>`;
  });
  html += '</div>';
  addChatMessageToUI({ sender: 'ai', text: html, timestamp: new Date(), isHtml: true });
}