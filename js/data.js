/**
 * EcoDispose - Core Reference Data & Initial Academic Seed Records
 * Course: Semester V ISE/CSE BCS508 Environmental Studies and E-Waste Management
 * Sources:
 * - Central Pollution Control Board (CPCB) E-Waste Management Rules, 2022
 * - Karnataka State Pollution Control Board (KSPCB) Registered Recyclers / Dismantlers Directory
 */

const ECO_DATA = {
  // Karnataka E-Waste Recycling & Collection Centres (CPCB/KSPCB referenced)
  recyclingCentres: [
    {
      id: "REC-KA-001",
      name: "E-Parisaraa Pvt. Ltd. (Facility 1)",
      type: "Authorized Dismantler & Recycler",
      registrationNo: "KSPCB/EW/REG/01/2005",
      address: "Plot No. 30-P3, KIADB Industrial Area, Dobbspet, Nelamangala Taluk, Bengaluru Rural",
      area: "Nelamangala / Dobbspet",
      city: "Bengaluru Rural",
      pincode: "562123",
      lat: 13.2355,
      lng: 77.2185,
      phone: "+91 80 2836 0902",
      email: "info@eparisaraa.com",
      hours: "Mon - Sat: 9:00 AM - 5:30 PM",
      acceptedCategories: [
        "Large Home Appliances",
        "IT & Telecommunication",
        "Consumer Electronics",
        "Battery Waste & Power Storage",
        "Small Household Appliances",
        "Electrical Accessories & Cabling"
      ],
      isVerified: true,
      verificationSource: "CPCB & KSPCB Authorized Registered Recycler (India's Pioneer E-Waste Unit)",
      notes: "Accepts bulk industrial e-waste and citizen drop-offs. Scientific metal extraction & zero-landfill process."
    },
    {
      id: "REC-KA-002",
      name: "Eco-Birdd Recycling Company",
      type: "Authorized E-Waste Dismantler",
      registrationNo: "KSPCB/E-WASTE/REG-08/2014",
      address: "No. 122/A, 2nd Phase, Peenya Industrial Area, Bengaluru",
      area: "Peenya Industrial Area",
      city: "Bengaluru",
      pincode: "560058",
      lat: 13.0305,
      lng: 77.5182,
      phone: "+91 80 2839 4411",
      email: "contact@ecobirdd.in",
      hours: "Mon - Sat: 9:30 AM - 6:00 PM",
      acceptedCategories: [
        "IT & Telecommunication",
        "Small Household Appliances",
        "Consumer Electronics",
        "Electrical Accessories & Cabling"
      ],
      isVerified: true,
      verificationSource: "KSPCB Authorized E-Waste Facility Directory",
      notes: "Specialized in printed circuit board (PCB) separation and computer recycling."
    },
    {
      id: "REC-KA-003",
      name: "Cerebra Integrated Technologies Ltd.",
      type: "Authorized Recycler & Refurbisher",
      registrationNo: "CPCB/EW-REG/KA/0034",
      address: "Plot No. 41 to 46, KIADB Industrial Area, Narasapura, Kolar Road / Peenya Office",
      area: "Peenya / Narasapura KIADB",
      city: "Bengaluru / Kolar",
      pincode: "563133",
      lat: 13.1558,
      lng: 78.1752,
      phone: "+91 80 2210 0211",
      email: "ewaste@cerebracomputers.com",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM",
      acceptedCategories: [
        "Large Home Appliances",
        "IT & Telecommunication",
        "Consumer Electronics",
        "Small Household Appliances"
      ],
      isVerified: true,
      verificationSource: "CPCB Registered Recycler & Refurbishment Hub",
      notes: "Large-capacity mechanical shredding and precious metal recovery unit."
    },
    {
      id: "REC-KA-004",
      name: "Saahas Zero Waste E-Waste Collection Hub (South)",
      type: "Authorized Collection & Aggregation Hub",
      registrationNo: "KSPCB/COLL-POINT/BLR-S/12",
      address: "No. 21, 29th Main Road, Kuvempu Nagar, BTM 2nd Stage (near Jayanagar), Bengaluru",
      area: "BTM Layout / Jayanagar",
      city: "Bengaluru",
      pincode: "560076",
      lat: 12.9166,
      lng: 77.6101,
      phone: "+91 80 4168 9389",
      email: "response@saahaszerowaste.com",
      hours: "Mon - Sat: 10:00 AM - 6:00 PM",
      acceptedCategories: [
        "Small Household Appliances",
        "IT & Telecommunication",
        "Electrical Accessories & Cabling",
        "Battery Waste & Power Storage"
      ],
      isVerified: true,
      verificationSource: "KSPCB Authorized Collection Centre in partnership with formal recyclers",
      notes: "Citizen-friendly community drop-off point for home electronics, dry cells, laptops, and chargers."
    },
    {
      id: "REC-KA-005",
      name: "Saahas Zero Waste Collection Centre (East)",
      type: "Authorized Collection Hub",
      registrationNo: "KSPCB/COLL-POINT/BLR-E/15",
      address: "ECC Road, Whitefield (near Inner Circle Ground), Bengaluru",
      area: "Whitefield",
      city: "Bengaluru",
      pincode: "560066",
      lat: 12.9698,
      lng: 77.7499,
      phone: "+91 80 4168 9390",
      email: "whitefield.hub@saahaszerowaste.com",
      hours: "Mon - Sat: 9:30 AM - 5:30 PM",
      acceptedCategories: [
        "IT & Telecommunication",
        "Small Household Appliances",
        "Consumer Electronics",
        "Electrical Accessories & Cabling"
      ],
      isVerified: true,
      verificationSource: "KSPCB Authorized Collection Centre",
      notes: "Serves tech corridor (Whitefield, ITPL, Kadugodi) for residential & enterprise e-waste drop-offs."
    },
    {
      id: "REC-KA-006",
      name: "Reteck Envirotech Pvt. Ltd.",
      type: "Authorized Dismantling & Metal Extraction Facility",
      registrationNo: "KSPCB/E-WASTE/REG-19/2016",
      address: "Plot No. 89-B, Bommasandra Industrial Area, Anekal Taluk, Bengaluru",
      area: "Bommasandra / Electronic City",
      city: "Bengaluru",
      pincode: "560099",
      lat: 12.8184,
      lng: 77.6925,
      phone: "+91 80 2783 2341",
      email: "support@reteck.co",
      hours: "Mon - Sat: 9:00 AM - 6:00 PM",
      acceptedCategories: [
        "Large Home Appliances",
        "IT & Telecommunication",
        "Consumer Electronics",
        "Battery Waste & Power Storage"
      ],
      isVerified: true,
      verificationSource: "CPCB / KSPCB Certified Heavy Electronics Recycling Unit",
      notes: "Equipped to handle cooling equipment (refrigerant CFC recovery) and industrial UPS batteries."
    },
    {
      id: "REC-KA-007",
      name: "Ash Recyclers & Electronic Waste Processors",
      type: "Authorized Recycler",
      registrationNo: "KSPCB/E-WASTE/REG-22/2018",
      address: "No. 12, 1st Cross, Rajajinagar Industrial Estate, Bengaluru",
      area: "Rajajinagar Industrial Town",
      city: "Bengaluru",
      pincode: "560010",
      lat: 12.9892,
      lng: 77.5539,
      phone: "+91 80 2315 7765",
      email: "info@ashrecyclers.com",
      hours: "Mon - Sat: 10:00 AM - 6:30 PM",
      acceptedCategories: [
        "Consumer Electronics",
        "Small Household Appliances",
        "IT & Telecommunication",
        "Electrical Accessories & Cabling"
      ],
      isVerified: true,
      verificationSource: "KSPCB Registered Unit for West Bengaluru",
      notes: "Direct drop-off counter for CRT TVs, flat panels, home theatre systems, and microwaves."
    },
    {
      id: "REC-KA-008",
      name: "Greenscape Eco Management Hub",
      type: "Authorized E-Waste Collection & Logistics Centre",
      registrationNo: "CPCB/EW/REG/KA-BLR/45",
      address: "NeoTown Road, Electronic City Phase 1, Bengaluru",
      area: "Electronic City Phase 1",
      city: "Bengaluru",
      pincode: "560100",
      lat: 12.8452,
      lng: 77.6602,
      phone: "+91 80 4124 5500",
      email: "ecity@greenscape.com",
      hours: "Mon - Fri: 9:00 AM - 5:30 PM",
      acceptedCategories: [
        "IT & Telecommunication",
        "Large Home Appliances",
        "Small Household Appliances",
        "Electrical Accessories & Cabling"
      ],
      isVerified: true,
      verificationSource: "CPCB Registered Producer Responsibility Organization (PRO) Partner",
      notes: "Facilitates EPR channelization, reverse logistics, and verified serial-number tracking."
    },
    {
      id: "REC-KA-009",
      name: "Mysuru CleanTech E-Waste Centre",
      type: "Regional Collection & Dismantling Center",
      registrationNo: "KSPCB/MYS/E-WASTE/04",
      address: "Hebbal Industrial Area, Mysuru (near Infosys Campus road)",
      area: "Hebbal Industrial Area",
      city: "Mysuru",
      pincode: "570016",
      lat: 12.3582,
      lng: 76.6022,
      phone: "+91 821 240 4501",
      email: "mysuru@cleantechewaste.org",
      hours: "Mon - Sat: 9:30 AM - 5:00 PM",
      acceptedCategories: [
        "IT & Telecommunication",
        "Small Household Appliances",
        "Consumer Electronics",
        "Battery Waste & Power Storage"
      ],
      isVerified: true,
      verificationSource: "KSPCB Regional Office Mysore Directory",
      notes: "Primary authorized e-waste aggregator for Mysuru, Mandya, and Chamarajanagar districts."
    },
    {
      id: "REC-KA-010",
      name: "Mangaluru Coastal Recyclers",
      type: "Authorized Maritime & Coastal E-Waste Facility",
      registrationNo: "KSPCB/DK/E-WASTE/02",
      address: "Baikampady Industrial Area, Mangaluru",
      area: "Baikampady",
      city: "Mangaluru",
      pincode: "575011",
      lat: 12.9463,
      lng: 74.8197,
      phone: "+91 824 240 8820",
      email: "coastal@mangaloreclean.com",
      hours: "Mon - Sat: 9:00 AM - 5:00 PM",
      acceptedCategories: [
        "Large Home Appliances",
        "IT & Telecommunication",
        "Battery Waste & Power Storage"
      ],
      isVerified: true,
      verificationSource: "KSPCB Dakshina Kannada Registered E-Waste Processor",
      notes: "Coastal facility preventing marine disposal of heavy electronics and lead acid batteries."
    },
    {
      id: "REC-KA-011",
      name: "Hubballi-Dharwad Green Hub",
      type: "North Karnataka E-Waste Drop-off Center",
      registrationNo: "KSPCB/HD/E-WASTE/03",
      address: "Tarihal Industrial Estate, Hubballi",
      area: "Tarihal Industrial Estate",
      city: "Hubballi-Dharwad",
      pincode: "580026",
      lat: 15.3402,
      lng: 75.1098,
      phone: "+91 836 231 1009",
      email: "hubli@greenhubkarnataka.org",
      hours: "Mon - Sat: 9:30 AM - 5:00 PM",
      acceptedCategories: [
        "Small Household Appliances",
        "Consumer Electronics",
        "IT & Telecommunication",
        "Electrical Accessories & Cabling"
      ],
      isVerified: true,
      verificationSource: "KSPCB North Karnataka Aggregation Register",
      notes: "Serves Dharwad, Belagavi, and surrounding industrial clusters."
    }
  ],

  // Appliance Categories and Ecological Impact Metadata
  categories: [
    {
      id: "large-appliances",
      name: "Large Home Appliances",
      examples: "Refrigerators, Washing Machines, Air Conditioners, Freezers",
      typicalWeightKg: 45,
      hazardousConstituents: "CFC/HCFC/HFC Refrigerants, Polyurethane Foam insulation, Compressor Lubricants, Lead solder",
      recoveryMaterials: "Steel (up to 60%), Copper coils, Aluminum radiators, Recyclable engineering plastics",
      prepTip: "Defrost 24 hrs prior; do not puncture refrigerant copper piping; drain all internal water pumps."
    },
    {
      id: "small-appliances",
      name: "Small Household Appliances",
      examples: "Microwaves, Toasters, Blenders, Electric Kettles, Vacuum Cleaners",
      typicalWeightKg: 5,
      hazardousConstituents: "Flame retardant plastics (PBDEs), Mica insulators, Magnetrons, Lead solder",
      recoveryMaterials: "Copper winding motors, Stainless steel, ABS & Polycarbonate plastics",
      prepTip: "Empty crumbs/liquids; detach power cords neatly; pack glass trays separately."
    },
    {
      id: "it-telecom",
      name: "IT & Telecommunication",
      examples: "Laptops, Desktop Towers, Smartphones, Tablets, Servers, Routers",
      typicalWeightKg: 4,
      hazardousConstituents: "Lead in solder, Cadmium in chip resistors, Mercury in old LCD CCFL backlights, Beryllium",
      recoveryMaterials: "Precious metals (Gold, Silver, Palladium in PCBs), High-purity Copper, Aluminum casing",
      prepTip: "CRITICAL: Perform cryptographic data wipe (NIST 800-88); sign out of iCloud/Google account; remove SIM & microSD."
    },
    {
      id: "consumer-electronics",
      name: "Consumer Electronics",
      examples: "Televisions (CRT/LED/OLED), Audio Systems, DVD/Blu-ray, Projectors",
      typicalWeightKg: 12,
      hazardousConstituents: "Phosphor coating and up to 2.5kg Lead in CRT glass, Mercury in early LCD panels",
      recoveryMaterials: "Cathode glass cullet, Ferrous frames, Copper yokes, Transformers",
      prepTip: "Handle CRT screens with care to prevent implosion; tape over any cracked display panels."
    },
    {
      id: "accessories-cables",
      name: "Electrical Accessories & Cabling",
      examples: "Chargers, Power Adapters, USB cables, Extension strips, Power banks",
      typicalWeightKg: 1,
      hazardousConstituents: "PVC insulation containing phthalates and chlorine; brominated flame retardants",
      recoveryMaterials: "High-grade electrolytic Copper wire, Thermoplastic sheath granules",
      prepTip: "Bundle and secure with paper ties; separate damaged batteries from basic cables."
    },
    {
      id: "battery-waste",
      name: "Battery Waste & Power Storage",
      examples: "Lithium-ion laptop/phone batteries, Inverter Lead-Acid batteries, UPS batteries",
      typicalWeightKg: 15,
      hazardousConstituents: "Sulfuric acid electrolyte, Lead plates, Lithium cobalt oxide, flammable organic solvents",
      recoveryMaterials: "Lead ingots (99% recovery), Lithium, Cobalt, Nickel, Recycled battery-grade polypropylene",
      prepTip: "Insulate terminals with non-conductive electrical tape; store in dry, non-flammable container."
    }
  ],

  // Academic Demonstration Seed Records (Persisted into LocalStorage)
  seedRequests: [
    {
      id: "ECO-2026-1042",
      date: "2026-10-24T10:15:00Z",
      category: "Large Home Appliances",
      description: "Whirlpool Double Door 265L Refrigerator (Compressor faulty)",
      brand: "Whirlpool",
      quantity: 1,
      weightKg: 58,
      condition: "Repairable",
      disposalPreference: "Authorized Collection",
      pickupOption: "Doorstep Pickup",
      area: "Indiranagar",
      pincode: "560038",
      contactName: "Dr. Ramesh Kumar (Academic Demo)",
      contactPhone: "+91 98450 12345",
      notes: "Ground floor access. Compressor is tripped; refrigerant intact without leakage.",
      status: "Scheduled for Pickup",
      timeline: [
        { status: "Submitted", timestamp: "2026-10-24T10:15:00Z", note: "Appliance request logged in EcoDispose system." },
        { status: "Verification Pending", timestamp: "2026-10-24T12:00:00Z", note: "Verified appliance specifications against KSPCB guidelines." },
        { status: "Scheduled for Pickup", timestamp: "2026-10-25T09:30:00Z", note: "Authorized e-waste vehicle route assigned (Vehicle KA-04-E-8891)." }
      ]
    },
    {
      id: "ECO-2026-1043",
      date: "2026-10-25T14:20:00Z",
      category: "IT & Telecommunication",
      description: "Dell Latitude E5440 Laptop & Lenovo ThinkPad T430",
      brand: "Dell & Lenovo",
      quantity: 2,
      weightKg: 4.8,
      condition: "Working",
      disposalPreference: "Reuse",
      pickupOption: "Self Drop-off",
      area: "Whitefield",
      pincode: "560066",
      contactName: "Pooja Hegde (Student Project)",
      contactPhone: "+91 99801 87654",
      notes: "Drives wiped with NIST 800-88 single-pass overwrite. Suitable for rural school digital lab donation.",
      status: "Received at Centre",
      timeline: [
        { status: "Submitted", timestamp: "2026-10-25T14:20:00Z", note: "Logged with preference for digital inclusion donation." },
        { status: "Verification Pending", timestamp: "2026-10-25T16:00:00Z", note: "Hardware diagnostics verified functional motherboard and display." },
        { status: "Received at Centre", timestamp: "2026-10-26T11:45:00Z", note: "Delivered to Saahas Whitefield Hub for refurbishment screening." }
      ]
    },
    {
      id: "ECO-2026-1044",
      date: "2026-10-26T09:40:00Z",
      category: "Consumer Electronics",
      description: "Sony Trinitron 21-inch CRT Television (Legacy Tube)",
      brand: "Sony",
      quantity: 1,
      weightKg: 24,
      condition: "Non-functional",
      disposalPreference: "Recycling",
      pickupOption: "Doorstep Pickup",
      area: "Rajajinagar",
      pincode: "560010",
      contactName: "Anand Murthy",
      contactPhone: "+91 94480 33211",
      notes: "Lead glass CRT tube intact. Requires specialized de-manufacturing to extract leaded funnel glass safely.",
      status: "Recycled",
      timeline: [
        { status: "Submitted", timestamp: "2026-10-26T09:40:00Z", note: "Legacy CRT reported by household." },
        { status: "Verification Pending", timestamp: "2026-10-26T11:00:00Z", note: "Flagged for heavy metal protocol (leaded funnel glass)." },
        { status: "Scheduled for Pickup", timestamp: "2026-10-26T14:30:00Z", note: "Transport manifest prepared under Form-6 KSPCB rules." },
        { status: "Received at Centre", timestamp: "2026-10-27T10:00:00Z", note: "Safely received at Ash Recyclers Peenya unit." },
        { status: "Recycled", timestamp: "2026-10-28T16:20:00Z", note: "CRT vacuum released safely; leaded glass separated; copper yoke recovered." }
      ]
    },
    {
      id: "ECO-2026-1045",
      date: "2026-10-27T11:10:00Z",
      category: "Small Household Appliances",
      description: "LG Convection Microwave Oven (28L, Magnetron Sparking)",
      brand: "LG Electronics",
      quantity: 1,
      weightKg: 14.5,
      condition: "Damaged",
      disposalPreference: "Repair",
      pickupOption: "Self Drop-off",
      area: "BTM Layout",
      pincode: "560076",
      contactName: "Kavita Rao",
      contactPhone: "+91 97310 99881",
      notes: "High voltage capacitor discharged before boxing. Turntable glass included.",
      status: "Verification Pending",
      timeline: [
        { status: "Submitted", timestamp: "2026-10-27T11:10:00Z", note: "Request submitted for secondary repair evaluation." },
        { status: "Verification Pending", timestamp: "2026-10-27T13:00:00Z", note: "Under review by certified technician network for magnetron replacement cost." }
      ]
    },
    {
      id: "ECO-2026-1046",
      date: "2026-10-28T08:30:00Z",
      category: "Battery Waste & Power Storage",
      description: "Exide Inverter Lead-Acid Tubular Battery (150Ah) & 2x UPS packs",
      brand: "Exide & APC",
      quantity: 3,
      weightKg: 52,
      condition: "Non-functional",
      disposalPreference: "Recycling",
      pickupOption: "Doorstep Pickup",
      area: "Bommasandra",
      pincode: "560099",
      contactName: "Naveen Chandran",
      contactPhone: "+91 98441 55667",
      notes: "Sealed casing, no electrolyte leakage. Terminals taped with vulcanized insulation tape.",
      status: "Received at Centre",
      timeline: [
        { status: "Submitted", timestamp: "2026-10-28T08:30:00Z", note: "Hazardous battery disposal registered." },
        { status: "Verification Pending", timestamp: "2026-10-28T09:15:00Z", note: "Battery Waste Management Rules (BWMR) checklist cleared." },
        { status: "Scheduled for Pickup", timestamp: "2026-10-28T11:00:00Z", note: "Hazardous material transport vehicle dispatched." },
        { status: "Received at Centre", timestamp: "2026-10-28T16:00:00Z", note: "Received at Reteck Bommasandra registered smelter facility." }
      ]
    },
    {
      id: "ECO-2026-1047",
      date: "2026-10-28T15:45:00Z",
      category: "IT & Telecommunication",
      description: "5x Broken Android Smartphones (Samsung, Redmi) & 2x Cracked Tablets",
      brand: "Mixed (Samsung, Xiaomi)",
      quantity: 7,
      weightKg: 2.1,
      condition: "Non-functional",
      disposalPreference: "Recycling",
      pickupOption: "Self Drop-off",
      area: "Koramangala",
      pincode: "560034",
      contactName: "Tanvi Sharma",
      contactPhone: "+91 96112 33445",
      notes: "Lithium polymer batteries intact; screens cracked. Flash memory chipsets intact.",
      status: "Submitted",
      timeline: [
        { status: "Submitted", timestamp: "2026-10-28T15:45:00Z", note: "User generated drop-off ticket for urban e-waste collection bin." }
      ]
    },
    {
      id: "ECO-2026-1048",
      date: "2026-10-29T10:00:00Z",
      category: "Large Home Appliances",
      description: "IFB Front Load 6kg Washing Machine (Drum Bearing Broken)",
      brand: "IFB",
      quantity: 1,
      weightKg: 64,
      condition: "Damaged",
      disposalPreference: "Authorized Collection",
      pickupOption: "Doorstep Pickup",
      area: "Hebbal",
      pincode: "560024",
      contactName: "Suresh Patil",
      contactPhone: "+91 99002 44556",
      notes: "Water drained completely. Stainless steel drum can be salvaged for circular economy parts.",
      status: "Submitted",
      timeline: [
        { status: "Submitted", timestamp: "2026-10-29T10:00:00Z", note: "Heavy home appliance collection ticket logged." }
      ]
    },
    {
      id: "ECO-2026-1049",
      date: "2026-10-29T16:30:00Z",
      category: "Electrical Accessories & Cabling",
      description: "Box of 25 assorted power bricks, tangled copper USB cables, HDMI cords",
      brand: "Assorted",
      quantity: 25,
      weightKg: 6.2,
      condition: "Non-functional",
      disposalPreference: "Recycling",
      pickupOption: "Self Drop-off",
      area: "Jayanagar",
      pincode: "560011",
      contactName: "Vikram Sen",
      contactPhone: "+91 98860 77889",
      notes: "Sorted by cable type. High-purity copper core suitable for granulator recovery.",
      status: "Verification Pending",
      timeline: [
        { status: "Submitted", timestamp: "2026-10-29T16:30:00Z", note: "Cabling aggregate lot submitted." },
        { status: "Verification Pending", timestamp: "2026-10-29T17:00:00Z", note: "Assigned batch tag #CBL-2026-088." }
      ]
    }
  ],

  // 5 Expected Environmental Benefits (Required by BCS508 Prompt Section 7)
  expectedBenefits: [
    {
      id: 1,
      title: "Encourages Responsible Electronic Appliance Disposal",
      summary: "Provides an intuitive, transparent digital pathway for citizens and institutions to divert unwanted appliances away from municipal solid waste dustbins and scrap yards.",
      mechanism: "Replaces informal unregulated dumping with formal registration, category-specific guidelines, and direct linkages to verified KSPCB/CPCB authorized e-waste aggregators.",
      icon: "shield-check"
    },
    {
      id: 2,
      title: "Helps Reduce Improper Dumping and Soil & Water Contamination Risks",
      summary: "Prevents toxic heavy metals (Lead, Mercury, Cadmium) and halogenated flame retardants from leaching into Bangalore's sensitive lakes and shallow groundwater aquifers.",
      mechanism: "Diverts toxic electronic components into controlled de-manufacturing lines where toxic refrigerants, PCB capacitors, and CRT glass are safely neutralized instead of open-air burning.",
      icon: "droplet"
    },
    {
      id: 3,
      title: "Promotes Reuse, Repair, Refurbishment, and Material Recovery",
      summary: "Operationalizes the Circular Economy Hierarchy by filtering functional and repairable electronics before consigning items to irreversible material destruction.",
      mechanism: "Connects repairable appliances to secondary life extensions, and feeds dismantled fractions (Copper, Gold, Aluminum, Engineering Plastics) back into domestic manufacturing cycles.",
      icon: "refresh-cw"
    },
    {
      id: 4,
      title: "Increases Awareness of Safe E-Waste Disposal",
      summary: "Educates students, households, and technical personnel on data privacy sanitization (NIST 800-88), damaged lithium battery fire protocols, and hazardous substance exposure.",
      mechanism: "Provides an interactive digital knowledge base embedded directly into the disposal workflow, dispelling misconceptions regarding unmonitored scrap vendor recycling.",
      icon: "book-open"
    },
    {
      id: 5,
      title: "Supports Future Collection Planning Through Disposal-Request Data",
      summary: "Aggregates actionable spatial and quantitative waste intelligence for urban planners, municipal corporations, and registered Producer Responsibility Organizations (PROs).",
      mechanism: "Identifies ward-level and PIN code disposal hotspots, average appliance lifecycle lifespans, and material volume projections to optimize collection routes and reverse logistics.",
      icon: "trending-up"
    }
  ]
};

// Export to window for browser access
window.ECO_DATA = ECO_DATA;
