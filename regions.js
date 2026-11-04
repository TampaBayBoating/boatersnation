/* Boaters Nation — region data.
   ONE array drives the homepage grid, the ZIP finder, and region.html.

   status: "live"     = cross-checked and open
           "building" = in the works — shows a waitlist, never placeholder data

   zipPrefixes: first 3 digits of real ZIP codes in the region, as STRINGS
   (New England prefixes start with 0). A prefix belongs to exactly one
   region; the finder checks regions in array order.

   To open a region: verify its map pins, events, fuel sources and stays to
   the Tampa Bay standard, add its data, then flip status to "live".
   See ../README.md. */

var BN_REGIONS = [
  {
    slug: "tampa-bay",
    name: "Tampa Bay, FL",
    blurb: "Tampa, St. Pete, Clearwater, Bradenton and Sarasota — the bay where Boaters Nation started.",
    status: "live",
    page: "region-tampa-bay.html",
    zipPrefixes: ["335", "336", "337", "342", "346"]
  },
  {
    slug: "gulf-coast-fl",
    name: "Gulf Coast, FL",
    blurb: "Florida's other Gulf shore — Fort Myers, Cape Coral, Naples and the Panhandle.",
    status: "building",
    zipPrefixes: ["324", "325", "339", "341"]
  },
  {
    slug: "south-florida-keys",
    name: "South Florida & the Keys",
    blurb: "Miami, Fort Lauderdale, Palm Beach and the island chain of the Keys.",
    status: "building",
    zipPrefixes: ["330", "331", "332", "333", "334"]
  },
  {
    slug: "chesapeake-bay",
    name: "Chesapeake Bay",
    blurb: "Maryland and Virginia's big bay — Annapolis, Baltimore, the Eastern Shore and Hampton Roads.",
    status: "building",
    zipPrefixes: ["210", "212", "214", "216", "218", "224", "230", "231", "233", "234", "235", "236", "237", "238"]
  },
  {
    slug: "great-lakes",
    name: "Great Lakes",
    blurb: "Lakes Michigan, Erie, Ontario, Huron and Superior — freshwater boating country.",
    status: "building",
    zipPrefixes: ["142", "146", "436", "440", "441", "480", "482", "494", "496", "532", "543", "558", "600", "606"]
  },
  {
    slug: "lake-country",
    name: "Lake Country",
    blurb: "The big inland lakes — Lake of the Ozarks, Table Rock, Lake Lanier and Lake Travis.",
    status: "building",
    zipPrefixes: ["300", "305", "650", "654", "656", "657", "786", "787"]
  },
  {
    slug: "texas-gulf-coast",
    name: "Texas Gulf Coast",
    blurb: "Galveston Bay, Corpus Christi and the whole Texas shore.",
    status: "building",
    zipPrefixes: ["770", "773", "774", "775", "776", "783", "784", "785"]
  },
  {
    slug: "new-england",
    name: "New England",
    blurb: "Maine to Connecticut — rocky coasts, working harbors and summer islands.",
    status: "live",
    page: "region-new-england.html",
    zipPrefixes: ["019", "020", "021", "025", "026", "027", "028", "038", "039", "040", "041", "045", "063", "064"]
  },
  {
    slug: "pacific-northwest",
    name: "Pacific Northwest",
    blurb: "Puget Sound, the San Juan Islands and the Columbia River.",
    status: "building",
    zipPrefixes: ["970", "972", "980", "981", "982", "983", "984", "986"]
  },
  {
    slug: "mid-atlantic-coast",
    name: "Mid-Atlantic Coast",
    blurb: "Long Island, the Jersey Shore, the Delaware beaches and Ocean City.",
    status: "live",
    page: "region-mid-atlantic.html",
    zipPrefixes: ["077", "080", "082", "117", "119", "199"]
  },
  {
    slug: "carolina-coast",
    name: "Carolina Coast",
    blurb: "The Outer Banks, Wilmington, Myrtle Beach and Charleston.",
    status: "building",
    zipPrefixes: ["279", "284", "285", "294", "295", "299"]
  },
  {
    slug: "california-coast",
    name: "California Coast",
    blurb: "San Diego to San Francisco — bays, harbors and the Pacific.",
    status: "building",
    zipPrefixes: ["907", "908", "920", "921", "926", "931", "939", "941", "945", "949"]
  },
  {
    slug: "tennessee-river-lakes",
    name: "Tennessee River Lakes",
    blurb: "Kentucky Lake, Guntersville, Norris and the Tennessee River chain.",
    status: "building",
    zipPrefixes: ["356", "358", "359", "374", "379", "382"]
  },
  {
    slug: "colorado-river-lakes",
    name: "Colorado River Lakes",
    blurb: "Lake Mead, Lake Havasu, Lake Powell and the desert lakes.",
    status: "building",
    zipPrefixes: ["852", "853", "860", "864", "890", "891"]
  }
];

/* Look up the region for a 5-digit ZIP string. Returns the region or null. */
function bnRegionForZip(zip) {
  var p3 = String(zip || "").substring(0, 3);
  for (var i = 0; i < BN_REGIONS.length; i++) {
    if (BN_REGIONS[i].zipPrefixes.indexOf(p3) >= 0) return BN_REGIONS[i];
  }
  return null;
}

/* Look up a region by slug (region.html?r=<slug>). Returns the region or null. */
function bnRegionBySlug(slug) {
  for (var i = 0; i < BN_REGIONS.length; i++) {
    if (BN_REGIONS[i].slug === slug) return BN_REGIONS[i];
  }
  return null;
}

/* Place-name routing for the finder: rough boxes [south, west, north, east].
   A point lands in the FIRST region (array order above) whose box holds it;
   the state map is only a fallback when no box matches. Routing-grade, not
   a boundary claim. */
var BN_BBOX = {
  "tampa-bay": [[27.3,-82.9,28.5,-81.9]],
  "gulf-coast-fl": [[25.8,-82.3,27.25,-80.9],[29.3,-87.6,31.0,-84.0]],
  "south-florida-keys": [[24.4,-82.0,26.9,-79.9]],
  "chesapeake-bay": [[36.5,-77.5,39.8,-75.3]],
  "great-lakes": [[41.3,-92.7,47.9,-76.1]],
  "lake-country": [[36.4,-93.9,38.7,-91.9],[34.05,-84.25,34.55,-83.75],[36.35,-93.75,36.85,-92.95],[30.25,-98.25,30.65,-97.85]],
  "texas-gulf-coast": [[25.8,-99.5,30.3,-93.7]],
  "new-england": [[40.9,-73.8,47.5,-66.9]],
  "pacific-northwest": [[42.0,-124.8,49.1,-116.9]],
  "mid-atlantic-coast": [[37.0,-75.3,39.9,-73.9],[38.9,-74.2,41.2,-71.8]],
  "carolina-coast": [[32.0,-81.1,36.6,-75.3]],
  "california-coast": [[32.5,-124.4,42.1,-117.0]],
  "tennessee-river-lakes": [[34.5,-88.6,37.2,-84.9]],
  "colorado-river-lakes": [[34.8,-114.8,37.3,-113.9],[36.85,-111.55,37.95,-110.65]]
};
var BN_STATE_REGION = {
  "Maine": "new-england", "New Hampshire": "new-england", "Massachusetts": "new-england",
  "Rhode Island": "new-england", "Connecticut": "new-england",
  "Maryland": "chesapeake-bay", "Virginia": "chesapeake-bay", "Delaware": "mid-atlantic-coast",
  "New Jersey": "mid-atlantic-coast", "North Carolina": "carolina-coast", "South Carolina": "carolina-coast",
  "Texas": "texas-gulf-coast", "Washington": "pacific-northwest", "Oregon": "pacific-northwest",
  "California": "california-coast", "Arizona": "colorado-river-lakes", "Nevada": "colorado-river-lakes",
  "Tennessee": "tennessee-river-lakes", "Kentucky": "tennessee-river-lakes",
  "Michigan": "great-lakes", "Ohio": "great-lakes", "Indiana": "great-lakes",
  "Illinois": "great-lakes", "Wisconsin": "great-lakes", "Minnesota": "great-lakes",
  "Missouri": "lake-country", "Arkansas": "lake-country", "Georgia": "lake-country"
};
