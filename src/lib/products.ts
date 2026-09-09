// PRO-LUCE ARCHITECTURAL CATALOGUE MASTER DATASET
// Sourced directly from Pro-Luce Architectural Catalogue

export type ProductCategory =
  | "Spot Light"
  | "Linear Light"
  | "Track Light"
  | "Pendant Light"
  | "Magnetic Series"
  | "Tube Magnetic"
  | "Outdoor Light"
  | "Highbay Light";

export type ProductEnvironment = "Indoor" | "Outdoor" | "Indoor/Outdoor";

export type Product = {
  id: string;
  slug: string;
  model: string;
  category: ProductCategory;
  subseries?: string;
  environment: ProductEnvironment;
  catalogPage: number;
  dimensions: string;
  cutout?: string | null;
  installationMethod: string;
  material: string;
  finishes: string[];
  ipRating: string;
  power: string;
  lumens: string;
  beamAngles: string[];
  cct: string[];
  cri: string;
  inputVoltage: string;
  driverOptions: string[];
  lifeHours: string;
  description: string;
  images: string[];
  dimensionDiagram?: string | null;
};

export const products: Product[] = [
  {
    "id": "pl-008",
    "slug": "rona",
    "model": "RONA",
    "category": "Spot Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 8,
    "dimensions": "\u00d885mm\u00d7H90mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "10W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the RONA features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/rona-fixture.png"
    ],
    "dimensionDiagram": "/images/diagrams/rona-diagram.png"
  },
  {
    "id": "pl-009",
    "slug": "mini-msp",
    "model": "MINI MSP",
    "category": "Spot Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 9,
    "dimensions": "\u00d883mm\u00d7H56mm",
    "cutout": "\u00d875mm",
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "12w",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the MINI MSP features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/mini-msp.png"
    ],
    "dimensionDiagram": "/images/diagrams/mini-msp-diagram.png"
  },
  {
    "id": "pl-010",
    "slug": "leo-lsp",
    "model": "LEO LSP",
    "category": "Spot Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 10,
    "dimensions": "\u00d882mm\u00d7H75mm",
    "cutout": "\u00d875mm",
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "12w",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the LEO LSP features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/leo-lsp.png"
    ],
    "dimensionDiagram": "/images/diagrams/leo-lsp-diagram.png"
  },
  {
    "id": "pl-011",
    "slug": "nova",
    "model": "NOVA",
    "category": "Spot Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 11,
    "dimensions": "\u00d852mm \u00d7 H55mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "7W/12W/20W/30W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the NOVA features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/nova.png"
    ],
    "dimensionDiagram": "/images/diagrams/nova-diagram.png"
  },
  {
    "id": "pl-012",
    "slug": "plaster-ro",
    "model": "Plaster RO",
    "category": "Spot Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 12,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "4w/6w/8w/10w/12w/15w/18w/20w",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Plaster RO features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/plaster-ro.png"
    ],
    "dimensionDiagram": "/images/diagrams/plaster-ro-diagram.png"
  },
  {
    "id": "pl-013",
    "slug": "plaster-sq",
    "model": "Plaster SQ",
    "category": "Spot Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 13,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "4w/6w/8w/10w/12w/15w/18w/20w",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Plaster SQ features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/plaster-sq.png"
    ],
    "dimensionDiagram": "/images/diagrams/plaster-sq-diagram.png"
  },
  {
    "id": "pl-014",
    "slug": "vice",
    "model": "VICE",
    "category": "Spot Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 14,
    "dimensions": "\u00d840mm\u00d7H67mm",
    "cutout": "\u00d830mm\n\u00d850mm \n\u00d865mm",
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "6W / 8W /10W /12W / 15W",
    "lumens": "115Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "60\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "5000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the VICE features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/vice.png"
    ],
    "dimensionDiagram": "/images/diagrams/vice-diagram.png"
  },
  {
    "id": "pl-015",
    "slug": "furat",
    "model": "FURAT",
    "category": "Spot Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 15,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "3W/5W/8W/10W/12W/18W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0",
      "60\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the FURAT features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/furat.png"
    ],
    "dimensionDiagram": "/images/diagrams/furat-diagram.png"
  },
  {
    "id": "pl-016",
    "slug": "ana-trimless",
    "model": "Ana Trimless",
    "category": "Spot Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 16,
    "dimensions": "\u00d8108mm\u00d7H89mm",
    "cutout": "\u00d865mm",
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "10W / 12W / 24W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "30\u00b0",
      "36\u00b0",
      "60\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Ana Trimless features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/ana-trimless.png"
    ],
    "dimensionDiagram": "/images/diagrams/ana-trimless-diagram.png"
  },
  {
    "id": "pl-017",
    "slug": "grili-trimless",
    "model": "Grili Trimless",
    "category": "Spot Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 17,
    "dimensions": "Cutout \u00d840\u00d7285mm",
    "cutout": "\u00d840\u00d7285mm",
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "18W / 24W",
    "lumens": "90Lm/w",
    "beamAngles": [
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Grili Trimless features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/grili-trimless.png"
    ],
    "dimensionDiagram": "/images/diagrams/grili-trimless-diagram.png"
  },
  {
    "id": "pl-019",
    "slug": "pro-luce-fixture-p19",
    "model": "Pro-Luce Fixture P19",
    "category": "Spot Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 19,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "2W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "20\u00b0",
      "40\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "5000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Pro-Luce Fixture P19 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pro-luce-fixture-p19.png"
    ],
    "dimensionDiagram": "/images/diagrams/pro-luce-fixture-p19-diagram.png"
  },
  {
    "id": "pl-021",
    "slug": "lena-20-linear",
    "model": "LENA 20 Linear",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 21,
    "dimensions": "W20mm\u00d720mm\nW20mm\nH20mm",
    "cutout": null,
    "installationMethod": "Suspended / Pendant",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "15w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Linear LED Light is engineered to deliver sleek, uniform, and energy-efficient illumination for modern architectural and commercial spaces. Designed with precision optics and advanced LED technology, it provides seamless light distribution with minimal glare, making it ideal for o\ufb03ces, retail stores, showrooms, hospitality",
    "images": [
      "/images/products/lena-20-linear.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-20-linear-diagram.png"
  },
  {
    "id": "pl-022",
    "slug": "lena-35-linear",
    "model": "LENA 35 Linear",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 22,
    "dimensions": "W35mm\u00d735mm\nW35mm\nH35mm",
    "cutout": null,
    "installationMethod": "Suspended / Pendant",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "20w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Linear LED Light is engineered to deliver sleek, uniform, and energy-efficient illumination for modern architectural and commercial spaces. Designed with precision optics and advanced LED technology, it provides seamless light distribution with minimal glare, making it ideal for o\ufb03ces, retail stores, showrooms, hospitality",
    "images": [
      "/images/products/lena-35-linear.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-35-linear-diagram.png"
  },
  {
    "id": "pl-023",
    "slug": "lena-50-linear",
    "model": "LENA 50 Linear",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 23,
    "dimensions": "W50mm\u00d775mm\nW50mm\nH75mm",
    "cutout": null,
    "installationMethod": "Suspended / Pendant",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "40w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Linear LED Light is engineered to deliver sleek, uniform, and energy-efficient illumination for modern architectural and commercial spaces. Designed with precision optics and advanced LED technology, it provides seamless light distribution with minimal glare, making it ideal for o\ufb03ces, retail stores, showrooms, hospitality",
    "images": [
      "/images/products/lena-50-linear.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-50-linear-diagram.png"
  },
  {
    "id": "pl-024",
    "slug": "lena-70-linear",
    "model": "LENA 70 Linear",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 24,
    "dimensions": "W70mm\u00d775mm\nW70mm\nH75mm",
    "cutout": null,
    "installationMethod": "Suspended / Pendant",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "60w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Linear LED Light is engineered to deliver sleek, uniform, and energy-efficient illumination for modern architectural and commercial spaces. Designed with precision optics and advanced LED technology, it provides seamless light distribution with minimal glare, making it ideal for o\ufb03ces, retail stores, showrooms, hospitality",
    "images": [
      "/images/products/lena-70-linear.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-70-linear-diagram.png"
  },
  {
    "id": "pl-025",
    "slug": "lena-100-linear",
    "model": "LENA 100 Linear",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 25,
    "dimensions": "W100mm\u00d775mm\nW100mm\nH75mm",
    "cutout": null,
    "installationMethod": "Suspended / Pendant",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "80w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Linear LED Light is engineered to deliver sleek, uniform, and energy-efficient illumination for modern architectural and commercial spaces. Designed with precision optics and advanced LED technology, it provides seamless light distribution with minimal glare, making it ideal for o\ufb03ces, retail stores, showrooms, hospitality",
    "images": [
      "/images/products/lena-100-linear.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-100-linear-diagram.png"
  },
  {
    "id": "pl-026",
    "slug": "pro-luce-fixture-p26",
    "model": "Pro-Luce Fixture P26",
    "category": "Linear Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 26,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "12W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Pro-Luce Fixture P26 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pro-luce-fixture-p26.png"
    ],
    "dimensionDiagram": null
  },
  {
    "id": "pl-027",
    "slug": "input-voltage",
    "model": "Input Voltage",
    "category": "Linear Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 27,
    "dimensions": "Beam   angl   e\n                     Model\nInput Voltage               \nCRI\nTECHNICAL DETAILSPRODUCT PARAMETER\n/ PMM",
    "cutout": null,
    "installationMethod": "Suspended / Pendant",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "15W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "20\u00b0",
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Manufactured from premium-grade extruded aluminum, the triangular housing ensures excellent heat dissipation and structural durability. The high-transmittance diffuser provides smooth, uniform illumination with reduced glare, delivering both visual comfort and aesthetic sophistication.",
    "images": [
      "/images/products/input-voltage.png"
    ],
    "dimensionDiagram": "/images/diagrams/input-voltage-diagram.png"
  },
  {
    "id": "pl-028",
    "slug": "lena35",
    "model": "Lena35",
    "category": "Linear Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 28,
    "dimensions": "Beam   angl   e\n                     20WModel\nInput Voltage               \nCRI\nTECHNICAL DETAILSPRODUCT PARAMETER\n/ PMM",
    "cutout": null,
    "installationMethod": "Suspended / Pendant",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "20W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "20\u00b0",
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Manufactured from premium-grade extruded aluminum, the triangular housing ensures excellent heat dissipation and structural durability. The high-transmittance diffuser provides smooth, uniform illumination with reduced glare, delivering both visual comfort and aesthetic sophistication.",
    "images": [
      "/images/products/lena35.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena35-diagram.png"
  },
  {
    "id": "pl-029",
    "slug": "lena-50-triangle",
    "model": "LENA 50 Triangle",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 29,
    "dimensions": "W50mm\u00d775mm\nL Customizable\nH75mm\nCustomisable\nW50mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "40w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Triangular Proprofile Linear LED Light is a distinctive architectural lighting solution designed to create sharp, angular illumination with a contemporary geometric edge. Featuring a sleek triangular aluminum proprofile, this fixture introduces a modern and dynamic design element, enhancing both commercial and residential interiors.",
    "images": [
      "/images/products/lena-50-triangle.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-50-triangle-diagram.png"
  },
  {
    "id": "pl-030",
    "slug": "lena-70-triangle",
    "model": "LENA 70 Triangle",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 30,
    "dimensions": "W70mm\u00d775mm\nL Customizable\nH75mm\nCustomisable\nW70mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "60w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Triangular Proprofile Linear LED Light is a distinctive architectural lighting solution designed to create sharp, angular illumination with a contemporary geometric edge. Featuring a sleek triangular aluminum proprofile, this fixture introduces a modern and dynamic design element, enhancing both commercial and residential interiors.",
    "images": [
      "/images/products/lena-70-triangle.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-70-triangle-diagram.png"
  },
  {
    "id": "pl-031",
    "slug": "lena100",
    "model": "Lena100",
    "category": "Linear Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 31,
    "dimensions": "Beam   angl   e\n                     20W/M for W50mm",
    "cutout": null,
    "installationMethod": "Suspended / Pendant",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "20W/M",
    "lumens": "100LM/W",
    "beamAngles": [
      "20\u00b0",
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Manufactured from premium-grade extruded aluminum, the triangular housing ensures excellent heat dissipation and structural durability. The high-transmittance diffuser provides smooth, uniform illumination with reduced glare, delivering both visual comfort and aesthetic sophistication.",
    "images": [
      "/images/products/lena100.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena100-diagram.png"
  },
  {
    "id": "pl-032",
    "slug": "pro-luce-fixture-p32",
    "model": "Pro-Luce Fixture P32",
    "category": "Linear Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 32,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "12W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Pro-Luce Fixture P32 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pro-luce-fixture-p32.png"
    ],
    "dimensionDiagram": null
  },
  {
    "id": "pl-033",
    "slug": "lena-20-square",
    "model": "LENA 20 Square",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 33,
    "dimensions": "W35mm\u00d735mm\nW20mm\nH20mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "15w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Square Proprofile Linear LED Light is a bold architectural lighting solution designed to create sharp, de/f_ined illumination lines with a contemporary geometric aesthetic. Featuring a clean square aluminum proprofile, this fixture adds structured elegance to",
    "images": [
      "/images/products/lena-20-square.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-20-square-diagram.png"
  },
  {
    "id": "pl-034",
    "slug": "lena-35-square",
    "model": "LENA 35 Square",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 34,
    "dimensions": "W35mm\u00d735mm\nW35mm\nH35mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "20w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Square Proprofile Linear LED Light is a bold architectural lighting solution designed to create sharp, de/f_ined illumination lines with a contemporary geometric aesthetic. Featuring a clean square aluminum proprofile, this fixture adds structured elegance to",
    "images": [
      "/images/products/lena-35-square.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-35-square-diagram.png"
  },
  {
    "id": "pl-035",
    "slug": "lena-50-square",
    "model": "LENA 50 Square",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 35,
    "dimensions": "W50mm\u00d775mm\nW50mm\nH75mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "40w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Square Proprofile Linear LED Light is a bold architectural lighting solution designed to create sharp, de/f_ined illumination lines with a contemporary geometric aesthetic. Featuring a clean square aluminum proprofile, this fixture adds structured elegance to",
    "images": [
      "/images/products/lena-50-square.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-50-square-diagram.png"
  },
  {
    "id": "pl-036",
    "slug": "lena-70-square",
    "model": "LENA 70 Square",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 36,
    "dimensions": "W70mm\u00d775mm\nW70mm\nH75mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "60w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Square Proprofile Linear LED Light is a bold architectural lighting solution designed to create sharp, de/f_ined illumination lines with a contemporary geometric aesthetic. Featuring a clean square aluminum proprofile, this fixture adds structured elegance to",
    "images": [
      "/images/products/lena-70-square.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-70-square-diagram.png"
  },
  {
    "id": "pl-037",
    "slug": "lena-100-square",
    "model": "LENA 100 Square",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 37,
    "dimensions": "W100mm\u00d775mm\nW100mm\nH75mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "80w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Square Proprofile Linear LED Light is a bold architectural lighting solution designed to create sharp, de/f_ined illumination lines with a contemporary geometric aesthetic. Featuring a clean square aluminum proprofile, this fixture adds structured elegance to",
    "images": [
      "/images/products/lena-100-square.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-100-square-diagram.png"
  },
  {
    "id": "pl-038",
    "slug": "pro-luce-fixture-p38",
    "model": "Pro-Luce Fixture P38",
    "category": "Linear Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 38,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "12W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Pro-Luce Fixture P38 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pro-luce-fixture-p38.png"
    ],
    "dimensionDiagram": null
  },
  {
    "id": "pl-039",
    "slug": "lena-20-hexagonal",
    "model": "LENA 20 Hexagonal",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 39,
    "dimensions": "W20mm\u00d720mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "15w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Hexagonal Proprofile Linear LED Light is a striking architectural lighting solution designed to create dynamic, multi-dimensional illumination with a modern geometric appeal. Featuring a unique hexagonal aluminum proprofile, this fixture introduces a bold design statement, adding depth and visual interest to contemporary commercial",
    "images": [
      "/images/products/lena-20-hexagonal.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-20-hexagonal-diagram.png"
  },
  {
    "id": "pl-040",
    "slug": "lena-35-hexagonal",
    "model": "LENA 35 Hexagonal",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 40,
    "dimensions": "W35mm\u00d735mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "20w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Hexagonal Proprofile Linear LED Light is a striking architectural lighting solution designed to create dynamic, multi-dimensional illumination with a modern geometric appeal. Featuring a unique hexagonal aluminum proprofile, this fixture introduces a bold design statement, adding depth and visual interest to contemporary commercial",
    "images": [
      "/images/products/lena-35-hexagonal.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-35-hexagonal-diagram.png"
  },
  {
    "id": "pl-041",
    "slug": "lena-50-hexagonal",
    "model": "LENA 50 Hexagonal",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 41,
    "dimensions": "W50mm\u00d775mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "40w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Hexagonal Proprofile Linear LED Light is a striking architectural lighting solution designed to create dynamic, multi-dimensional illumination with a modern geometric appeal. Featuring a unique hexagonal aluminum proprofile, this fixture introduces a bold design statement, adding depth and visual interest to contemporary commercial",
    "images": [
      "/images/products/lena-50-hexagonal.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-50-hexagonal-diagram.png"
  },
  {
    "id": "pl-042",
    "slug": "lena-70-hexagonal",
    "model": "LENA 70 Hexagonal",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 42,
    "dimensions": "W70mm\u00d775mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "60w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Hexagonal Proprofile Linear LED Light is a striking architectural lighting solution designed to create dynamic, multi-dimensional illumination with a modern geometric appeal. Featuring a unique hexagonal aluminum proprofile, this fixture introduces a bold design statement, adding depth and visual interest to contemporary commercial",
    "images": [
      "/images/products/lena-70-hexagonal.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-70-hexagonal-diagram.png"
  },
  {
    "id": "pl-043",
    "slug": "lena-100-hexagonal",
    "model": "LENA 100 Hexagonal",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 43,
    "dimensions": "W100mm\u00d775mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "80w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Hexagonal Proprofile Linear LED Light is a striking architectural lighting solution designed to create dynamic, multi-dimensional illumination with a modern geometric appeal. Featuring a unique hexagonal aluminum proprofile, this fixture introduces a bold design statement, adding depth and visual interest to contemporary commercial",
    "images": [
      "/images/products/lena-100-hexagonal.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-100-hexagonal-diagram.png"
  },
  {
    "id": "pl-045",
    "slug": "lena-50-circle",
    "model": "LENA 50 circle",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 45,
    "dimensions": "\u00d850mm\u00d775mm\nL Customizable\n\u00d850mm\nH75mm H75mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "40w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Circular Proprofile LED Light is a re/f_ined architectural lighting solution designed to deliver smooth, continuous illumination with a clean and modern aesthetic. Featuring a perfectly balanced round aluminum proprofile, this fixture brings a sense of harmony and elegance to both commercial and residential interiors.",
    "images": [
      "/images/products/lena-50-circle.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-50-circle-diagram.png"
  },
  {
    "id": "pl-046",
    "slug": "lena-100-circle",
    "model": "LENA 100 circle",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 46,
    "dimensions": "\u00d8100mm\u00d775mm\nL Customizable\n\u00d8100mm\nH75mm H75mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "80w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Circular Proprofile LED Light is a re/f_ined architectural lighting solution designed to deliver smooth, continuous illumination with a clean and modern aesthetic. Featuring a perfectly balanced round aluminum proprofile, this fixture brings a sense of harmony and elegance to both commercial and residential interiors.",
    "images": [
      "/images/products/lena-100-circle.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-100-circle-diagram.png"
  },
  {
    "id": "pl-047",
    "slug": "pro-luce-fixture-p47",
    "model": "Pro-Luce Fixture P47",
    "category": "Linear Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 47,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "12W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Pro-Luce Fixture P47 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pro-luce-fixture-p47.png"
    ],
    "dimensionDiagram": null
  },
  {
    "id": "pl-048",
    "slug": "lena-50-ring",
    "model": "LENA 50 Ring",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 48,
    "dimensions": "\u00d850mm\u00d775mm\nL Customizable\nH75mm\nLength Customizable\n\u00d850mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "40w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "The Ring Proprofile Light is a modern architectural lighting solution designed to deliver uniform, glare-free illumination with a sleek circular form. Crafted with a high-quality aluminum proprofile and precision- engineered LED technology, it provides exceptional light distribution while maintaining a minimal and",
    "images": [
      "/images/products/lena-50-ring.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-50-ring-diagram.png"
  },
  {
    "id": "pl-049",
    "slug": "lena-100-ring",
    "model": "LENA 100 Ring",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 49,
    "dimensions": "\u00d8100mm\u00d775mm\nL Customizable\nH75mm\nLength Customizable\n\u00d8100mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "80w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "The Ring Proprofile Light is a modern architectural lighting solution designed to deliver uniform, glare-free illumination with a sleek circular form. Crafted with a high-quality aluminum proprofile and precision- engineered LED technology, it provides exceptional light distribution while maintaining a minimal and",
    "images": [
      "/images/products/lena-100-ring.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-100-ring-diagram.png"
  },
  {
    "id": "pl-050",
    "slug": "pro-luce-fixture-p50",
    "model": "Pro-Luce Fixture P50",
    "category": "Linear Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 50,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "12W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Pro-Luce Fixture P50 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pro-luce-fixture-p50.png"
    ],
    "dimensionDiagram": null
  },
  {
    "id": "pl-051",
    "slug": "lena-disc",
    "model": "LENA Disc",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 51,
    "dimensions": "H75mm\nL Customizable\nH75mm",
    "cutout": null,
    "installationMethod": "Suspended / Pendant",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "80w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Our Ceiling Pendant LED Light is a sophisticated architectural lighting solution designed to deliver focused yet ambient illumination with a sleek, modern aesthetic. Suspended elegantly from the ceiling, this fixture creates a striking visual statement while enhancing spatial depth in both commercial and residential interiors.",
    "images": [
      "/images/products/lena-disc.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-disc-diagram.png"
  },
  {
    "id": "pl-052",
    "slug": "pro-luce-fixture-p52",
    "model": "Pro-Luce Fixture P52",
    "category": "Linear Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 52,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "12W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Pro-Luce Fixture P52 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pro-luce-fixture-p52.png"
    ],
    "dimensionDiagram": null
  },
  {
    "id": "pl-053",
    "slug": "lena-50-curved",
    "model": "LENA 50 Curved",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 53,
    "dimensions": "W50mm\u00d775mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "40w/m",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "The Curved Proprofile Light is a sophisticated architectural lighting solution designed to bring movement and elegance into modern interiors. Engineered with precision-bent aluminum proprofiles and high-performance LED modules, it delivers continuous, uniform illumination",
    "images": [
      "/images/products/lena-50-curved.png"
    ],
    "dimensionDiagram": "/images/diagrams/lena-50-curved-diagram.png"
  },
  {
    "id": "pl-056",
    "slug": "c44",
    "model": "C44",
    "category": "Track Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 56,
    "dimensions": "\u00d852mm\u00d7H135mm",
    "cutout": null,
    "installationMethod": "Surface Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "15W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "24\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the C44 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/c44.png"
    ],
    "dimensionDiagram": "/images/diagrams/c44-diagram.png"
  },
  {
    "id": "pl-057",
    "slug": "mars",
    "model": "MARS",
    "category": "Track Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 57,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "30W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0",
      "90\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the MARS features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/mars.png"
    ],
    "dimensionDiagram": "/images/diagrams/mars-diagram.png"
  },
  {
    "id": "pl-058",
    "slug": "moon",
    "model": "MOON",
    "category": "Track Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 58,
    "dimensions": "\u00d8113mm \u00d7 H106mm",
    "cutout": null,
    "installationMethod": "Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "28W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the MOON features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/moon.png"
    ],
    "dimensionDiagram": "/images/diagrams/moon-diagram.png"
  },
  {
    "id": "pl-059",
    "slug": "artis",
    "model": "ARTIS",
    "category": "Track Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 59,
    "dimensions": "\u00d880mm \u00d7 H88mm",
    "cutout": null,
    "installationMethod": "Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "20W / 35W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the ARTIS features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/artis.png"
    ],
    "dimensionDiagram": "/images/diagrams/artis-diagram.png"
  },
  {
    "id": "pl-061",
    "slug": "pluto",
    "model": "PLUTO",
    "category": "Pendant Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 61,
    "dimensions": "\u00d875mm\u00d7H155mm",
    "cutout": null,
    "installationMethod": "Suspended / Pendant",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "30W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "30\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the PLUTO features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pluto.png"
    ],
    "dimensionDiagram": "/images/diagrams/pluto-diagram.png"
  },
  {
    "id": "pl-062",
    "slug": "c44-pendant",
    "model": "C44 PENDANT",
    "category": "Pendant Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 62,
    "dimensions": "\u00d855mm\u00d7H200mm",
    "cutout": null,
    "installationMethod": "Suspended / Pendant",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "10W / 20W / 30W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0",
      "60\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the C44 PENDANT features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/c44-pendant.png"
    ],
    "dimensionDiagram": "/images/diagrams/c44-pendant-diagram.png"
  },
  {
    "id": "pl-064",
    "slug": "hud-sl",
    "model": "HUD SL",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 64,
    "dimensions": "Standard Architectural Housing",
    "cutout": "45mm\u00d860-135mm",
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "12W / 24W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the HUD SL features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/hud-sl.png"
    ],
    "dimensionDiagram": "/images/diagrams/hud-sl-diagram.png"
  },
  {
    "id": "pl-065",
    "slug": "hud-ln-ad",
    "model": "HUD LN AD",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 65,
    "dimensions": "Standard Architectural Housing",
    "cutout": "210-7mm\n305-7mm\n425-7mm\n655-7mm\n\u00d8224-22-105mm\n\u00d8328-22-105mm\n\u00d8437-22-105mm\n\u00d8671-22-105mm",
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "6W/12W/24W/36W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "100\u00b0",
      "105\u00b0",
      "110\u00b0",
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the HUD LN AD features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/hud-ln-ad.png"
    ],
    "dimensionDiagram": "/images/diagrams/hud-ln-ad-diagram.png"
  },
  {
    "id": "pl-066",
    "slug": "hud-gr",
    "model": "HUD GR",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 66,
    "dimensions": "Standard Architectural Housing",
    "cutout": "205-7mm\n315-7mm\n420-7mm\n638-7mm\n\u00d8220-22-45mm\nC \u00d8330-22-45mm\nD \u00d8436-22-45mm\nE \u00d8653-22-45mm",
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "6W/12W /18W/ 24W/36W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the HUD GR features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/hud-gr.png"
    ],
    "dimensionDiagram": "/images/diagrams/hud-gr-diagram.png"
  },
  {
    "id": "pl-067",
    "slug": "hud-ln",
    "model": "HUD LN",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 67,
    "dimensions": "Standard Architectural Housing",
    "cutout": "585-7mm\n885-7mm\n1185-7mm\n\u00d8600-22-43mm\n\u00d8900-22-43mm\n\u00d81200-22-43mm",
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Oxidation Black",
      "Matte Black",
      "Matte White"
    ],
    "ipRating": "IP20",
    "power": "12W/24W/36W/48W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "100\u00b0",
      "105\u00b0",
      "110\u00b0",
      "120\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the HUD LN features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/hud-ln.png"
    ],
    "dimensionDiagram": "/images/diagrams/hud-ln-diagram.png"
  },
  {
    "id": "pl-068",
    "slug": "hud-gr-ad",
    "model": "HUD GR AD",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 68,
    "dimensions": "Standard Architectural Housing",
    "cutout": "200-7mm\n300-7mm\n400-7mm\n500-7mm\n\u00d8215-22-105mm\n\u00d8315-22-105mm\n\u00d8415-22-105mm\n\u00d8515-22-105mm",
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "6W/12W/18W/24W/36W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0",
      "60\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the HUD GR AD features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/hud-gr-ad.png"
    ],
    "dimensionDiagram": "/images/diagrams/hud-gr-ad-diagram.png"
  },
  {
    "id": "pl-069",
    "slug": "1911",
    "model": "1911",
    "category": "Linear Light",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 69,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "24W",
    "lumens": "100Lm/w",
    "beamAngles": [
      "45\u00b0"
    ],
    "cct": [
      "2700K",
      "3000K",
      "4000K",
      "6000K",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 85\u2013265V / AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the 1911 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/1911.png"
    ],
    "dimensionDiagram": "/images/diagrams/1911-diagram.png"
  },
  {
    "id": "pl-070",
    "slug": "mggl1836",
    "model": "MGGL1836",
    "category": "Linear Light",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 70,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "18W",
    "lumens": "90Lm/w",
    "beamAngles": [
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the MGGL1836 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/mggl1836.png"
    ],
    "dimensionDiagram": "/images/diagrams/mggl1836-diagram.png"
  },
  {
    "id": "pl-072",
    "slug": "magnetic-track-accessories-pack-1",
    "model": "Magnetic Track Accessories Pack 1",
    "category": "Magnetic Series",
    "subseries": "Magnetic System Accessories",
    "environment": "Indoor",
    "catalogPage": 72,
    "dimensions": "Material Finish Wire length\n150mm\nModel\nMSA06 Connect module 68\u00d75\u00d718mm",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Oxidation Black",
      "Matte Black",
      "Matte White"
    ],
    "ipRating": "IP20",
    "power": "12W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Magnetic Track Accessories Pack 1 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/magnetic-track-accessories-pack-1.png"
    ],
    "dimensionDiagram": "/images/diagrams/magnetic-track-accessories-pack-1-diagram.png"
  },
  {
    "id": "pl-073",
    "slug": "magnetic-track-accessories-pack-2",
    "model": "Magnetic Track Accessories Pack 2",
    "category": "Magnetic Series",
    "subseries": "Magnetic System Accessories",
    "environment": "Indoor",
    "catalogPage": 73,
    "dimensions": "Customizable Profile Length",
    "cutout": null,
    "installationMethod": "Recessed with Flange",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "15W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Magnetic Track Accessories Pack 2 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/magnetic-track-accessories-pack-2.png"
    ],
    "dimensionDiagram": "/images/diagrams/magnetic-track-accessories-pack-2-diagram.png"
  },
  {
    "id": "pl-074",
    "slug": "mega-pendant",
    "model": "Mega Pendant",
    "category": "Magnetic Series",
    "subseries": "Mega Magnetic Series",
    "environment": "Indoor",
    "catalogPage": 74,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Oxidation Black",
      "Matte Black",
      "Matte White"
    ],
    "ipRating": "IP20",
    "power": "6W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "360\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Mega Pendant features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/mega-pendant.png"
    ],
    "dimensionDiagram": "/images/diagrams/mega-pendant-diagram.png"
  },
  {
    "id": "pl-075",
    "slug": "mega-surface",
    "model": "Mega Surface",
    "category": "Magnetic Series",
    "subseries": "Mega Magnetic Series",
    "environment": "Indoor",
    "catalogPage": 75,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Oxidation Black",
      "Matte Black",
      "Matte White"
    ],
    "ipRating": "IP20",
    "power": "6W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "360\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Mega Surface features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/mega-surface.png"
    ],
    "dimensionDiagram": "/images/diagrams/mega-surface-diagram.png"
  },
  {
    "id": "pl-076",
    "slug": "mega-tube",
    "model": "Mega Tube",
    "category": "Magnetic Series",
    "subseries": "Mega Magnetic Series",
    "environment": "Indoor",
    "catalogPage": 76,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Oxidation Black",
      "Matte Black",
      "Matte White"
    ],
    "ipRating": "IP20",
    "power": "9W / 18W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "360\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Mega Tube features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/mega-tube.png"
    ],
    "dimensionDiagram": "/images/diagrams/mega-tube-diagram.png"
  },
  {
    "id": "pl-077",
    "slug": "vector",
    "model": "Vector",
    "category": "Magnetic Series",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 77,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Oxidation Black",
      "Matte Black",
      "Matte White"
    ],
    "ipRating": "IP20",
    "power": "5W / 9W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "24\u00b0",
      "60\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Vector features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/vector.png"
    ],
    "dimensionDiagram": "/images/diagrams/vector-diagram.png"
  },
  {
    "id": "pl-078",
    "slug": "axis",
    "model": "Axis",
    "category": "Magnetic Series",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 78,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Oxidation Black",
      "Matte Black",
      "Matte White"
    ],
    "ipRating": "IP20",
    "power": "5W / 9W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Axis features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/axis.png"
    ],
    "dimensionDiagram": "/images/diagrams/axis-diagram.png"
  },
  {
    "id": "pl-079",
    "slug": "magnova",
    "model": "Magnova",
    "category": "Magnetic Series",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 79,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Oxidation Black",
      "Matte Black",
      "Matte White"
    ],
    "ipRating": "IP20",
    "power": "3W / 6W / 12W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "15\u00b0",
      "24\u00b0",
      "36\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Magnova features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/magnova.png"
    ],
    "dimensionDiagram": "/images/diagrams/magnova-diagram.png"
  },
  {
    "id": "pl-080",
    "slug": "magcore",
    "model": "Magcore",
    "category": "Magnetic Series",
    "subseries": "",
    "environment": "Indoor",
    "catalogPage": 80,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Oxidation Black",
      "Matte Black",
      "Matte White"
    ],
    "ipRating": "IP20",
    "power": "6W / 10W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Magcore features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/magcore.png"
    ],
    "dimensionDiagram": "/images/diagrams/magcore-diagram.png"
  },
  {
    "id": "pl-081",
    "slug": "magnifity",
    "model": "Magnifity",
    "category": "Magnetic Series",
    "subseries": "Mega Magnetic Series",
    "environment": "Indoor",
    "catalogPage": 81,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Oxidation Black",
      "Matte Black",
      "Matte White"
    ],
    "ipRating": "IP20",
    "power": "6W / 10W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Magnifity features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/magnifity.png"
    ],
    "dimensionDiagram": "/images/diagrams/magnifity-diagram.png"
  },
  {
    "id": "pl-082",
    "slug": "magnex",
    "model": "Magnex",
    "category": "Magnetic Series",
    "subseries": "LENA75 Series",
    "environment": "Indoor",
    "catalogPage": 82,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Oxidation Black",
      "Matte Black",
      "Matte White"
    ],
    "ipRating": "IP20",
    "power": "6W / 12W / 18W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "15\u00b0",
      "30\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Magnex features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/magnex.png"
    ],
    "dimensionDiagram": "/images/diagrams/magnex-diagram.png"
  },
  {
    "id": "pl-084",
    "slug": "tube-magnetic-ptm01",
    "model": "Tube Magnetic PTM01",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 84,
    "dimensions": "Model Voltage Size\nModel Voltage Size\nPTMS01\nDual - head circular rotary electrical module\nThree - head circular rotary electrical module\nFour - head circular rotary electrical module\nDC 48V\nDC 48V\nDC 48V\n80\u00d750\u00d740mm\n80\u00d765\u00d740mm\n80\u00d780\u00d740mm",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "15W / 30W / 45W / 60W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM01 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm01.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm01-diagram.png"
  },
  {
    "id": "pl-085",
    "slug": "tube-magnetic-ptm05",
    "model": "Tube Magnetic PTM05",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 85,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "15W / 30W / 45W / 60W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM05 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm05.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm05-diagram.png"
  },
  {
    "id": "pl-086",
    "slug": "tube-magnetic-ptm09",
    "model": "Tube Magnetic PTM09",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 86,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "15W / 30W / 45W / 60W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM09 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm09.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm09-diagram.png"
  },
  {
    "id": "pl-087",
    "slug": "tube-magnetic-ptm13",
    "model": "Tube Magnetic PTM13",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 87,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "12W / 20W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM13 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm13.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm13-diagram.png"
  },
  {
    "id": "pl-088",
    "slug": "tube-magnetic-ptm15",
    "model": "Tube Magnetic PTM15",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 88,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "12W / 20W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM15 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm15.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm15-diagram.png"
  },
  {
    "id": "pl-089",
    "slug": "tube-magnetic-ptm17",
    "model": "Tube Magnetic PTM17",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 89,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "5W / 10W / 15W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM17 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm17.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm17-diagram.png"
  },
  {
    "id": "pl-090",
    "slug": "tube-magnetic-ptm20",
    "model": "Tube Magnetic PTM20",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 90,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "7W / 12W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM20 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm20.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm20-diagram.png"
  },
  {
    "id": "pl-091",
    "slug": "tube-magnetic-ptm22",
    "model": "Tube Magnetic PTM22",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 91,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "7 W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM22 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm22.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm22-diagram.png"
  },
  {
    "id": "pl-092",
    "slug": "tube-magnetic-ptm23",
    "model": "Tube Magnetic PTM23",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 92,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "6W / 12W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM23 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm23.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm23-diagram.png"
  },
  {
    "id": "pl-093",
    "slug": "tube-magnetic-ptm25",
    "model": "Tube Magnetic PTM25",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 93,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "5W / 2W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM25 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm25.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm25-diagram.png"
  },
  {
    "id": "pl-094",
    "slug": "tube-magnetic-ptm25-2",
    "model": "Tube Magnetic PTM25",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 94,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "7W / 2W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM25 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm25-2.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm25-2-diagram.png"
  },
  {
    "id": "pl-095",
    "slug": "tube-magnetic-ptm29",
    "model": "Tube Magnetic PTM29",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 95,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "60W / 100W / 200W /300W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM29 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm29.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm29-diagram.png"
  },
  {
    "id": "pl-096",
    "slug": "tube-magnetic-ptm33",
    "model": "Tube Magnetic PTM33",
    "category": "Tube Magnetic",
    "subseries": "PTM Tube Magnetic",
    "environment": "Indoor",
    "catalogPage": 96,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Magnetic Track Mounted",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP20",
    "power": "36W / 60W / 100W /400W",
    "lumens": "100Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "6000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 48V (Low Voltage Magnetic)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Tube Magnetic PTM33 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/tube-magnetic-ptm33.png"
    ],
    "dimensionDiagram": "/images/diagrams/tube-magnetic-ptm33-diagram.png"
  },
  {
    "id": "pl-098",
    "slug": "flood1",
    "model": "Flood1",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 98,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface / Wall Adjustable Bracket",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "3W/6W",
    "lumens": "210lm",
    "beamAngles": [
      "12\u00b0",
      "30\u00b0",
      "60\u00b0",
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K",
      "Tunable White",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Flood1 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/flood1.png"
    ],
    "dimensionDiagram": "/images/diagrams/flood1-diagram.png"
  },
  {
    "id": "pl-099",
    "slug": "flood17",
    "model": "Flood17",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 99,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface / Wall Adjustable Bracket",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "24W/36W",
    "lumens": "1680lm",
    "beamAngles": [
      "12\u00b0",
      "30\u00b0",
      "45\u00b0",
      "60\u00b0",
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K",
      "Tunable White",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Flood17 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/flood17.png"
    ],
    "dimensionDiagram": "/images/diagrams/flood17-diagram.png"
  },
  {
    "id": "pl-100",
    "slug": "flood18",
    "model": "Flood18",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 100,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface / Wall Adjustable Bracket",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "24W/36W",
    "lumens": "1680lm",
    "beamAngles": [
      "12\u00b0",
      "30\u00b0",
      "45\u00b0",
      "60\u00b0",
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K",
      "Tunable White",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Flood18 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/flood18.png"
    ],
    "dimensionDiagram": "/images/diagrams/flood18-diagram.png"
  },
  {
    "id": "pl-101",
    "slug": "flood20",
    "model": "Flood20",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 101,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface / Wall Adjustable Bracket",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "72W",
    "lumens": "5040lm",
    "beamAngles": [
      "12\u00b0",
      "30\u00b0",
      "45\u00b0",
      "60\u00b0",
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K",
      "Tunable White",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Flood20 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/flood20.png"
    ],
    "dimensionDiagram": "/images/diagrams/flood20-diagram.png"
  },
  {
    "id": "pl-102",
    "slug": "flood21",
    "model": "Flood21",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 102,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface / Wall Adjustable Bracket",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "24W / 36W",
    "lumens": "1680lm",
    "beamAngles": [
      "12\u00b0",
      "30\u00b0",
      "45\u00b0",
      "60\u00b0",
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K",
      "Tunable White",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Flood21 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/flood21.png"
    ],
    "dimensionDiagram": "/images/diagrams/flood21-diagram.png"
  },
  {
    "id": "pl-103",
    "slug": "flood22",
    "model": "Flood22",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 103,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface / Wall Adjustable Bracket",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "24W / 36W",
    "lumens": "1680lm",
    "beamAngles": [
      "12\u00b0",
      "30\u00b0",
      "45\u00b0",
      "60\u00b0",
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K",
      "Tunable White",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Flood22 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/flood22.png"
    ],
    "dimensionDiagram": "/images/diagrams/flood22-diagram.png"
  },
  {
    "id": "pl-104",
    "slug": "flood23",
    "model": "Flood23",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 104,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface / Wall Adjustable Bracket",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "72W",
    "lumens": "5040lm",
    "beamAngles": [
      "12\u00b0",
      "30\u00b0",
      "45\u00b0",
      "60\u00b0",
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K",
      "Tunable White",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Flood23 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/flood23.png"
    ],
    "dimensionDiagram": "/images/diagrams/flood23-diagram.png"
  },
  {
    "id": "pl-105",
    "slug": "flood24",
    "model": "Flood24",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 105,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface / Wall Adjustable Bracket",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "72W",
    "lumens": "5040lm",
    "beamAngles": [
      "12\u00b0",
      "30\u00b0",
      "45\u00b0",
      "60\u00b0",
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K",
      "Tunable White",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Flood24 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/flood24.png"
    ],
    "dimensionDiagram": "/images/diagrams/flood24-diagram.png"
  },
  {
    "id": "pl-106",
    "slug": "flood25",
    "model": "Flood25",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 106,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface / Wall Adjustable Bracket",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "24W",
    "lumens": "1260lm",
    "beamAngles": [
      "12\u00b0",
      "30\u00b0",
      "45\u00b0",
      "60\u00b0",
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K",
      "Tunable White",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Flood25 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/flood25.png"
    ],
    "dimensionDiagram": "/images/diagrams/flood25-diagram.png"
  },
  {
    "id": "pl-107",
    "slug": "flood26",
    "model": "Flood26",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 107,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface / Wall Adjustable Bracket",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "24W",
    "lumens": "1260lm",
    "beamAngles": [
      "12\u00b0",
      "30\u00b0",
      "45\u00b0",
      "60\u00b0",
      "24\u00b0"
    ],
    "cct": [
      "3000K",
      "5000K",
      "Tunable White",
      "RGB / RGBW"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "Phase Dimming (Triac)"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Flood26 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/flood26.png"
    ],
    "dimensionDiagram": "/images/diagrams/flood26-diagram.png"
  },
  {
    "id": "pl-108",
    "slug": "mistglow",
    "model": "Mistglow",
    "category": "Outdoor Light",
    "subseries": "",
    "environment": "Outdoor",
    "catalogPage": 108,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP67",
    "power": "2W",
    "lumens": "120Lm/W",
    "beamAngles": [
      "360\u00b0"
    ],
    "cct": [
      "2700K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "DC 24V (Low Voltage)",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Mistglow features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/mistglow.png"
    ],
    "dimensionDiagram": "/images/diagrams/mistglow-diagram.png"
  },
  {
    "id": "pl-109",
    "slug": "coastal",
    "model": "Coastal",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 109,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Surface / Wall Adjustable Bracket",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "400W\nMW",
    "lumens": "140 - 150 Lm/W",
    "beamAngles": [
      "30\u00b0",
      "60\u00b0",
      "90\u00b0",
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K"
    ],
    "cri": "Ra \u2265 90",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Coastal features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/coastal.png"
    ],
    "dimensionDiagram": "/images/diagrams/coastal-diagram.png"
  },
  {
    "id": "pl-110",
    "slug": "terra100",
    "model": "Terra100",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 110,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "In-Ground Walkover / Drive-over",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP67",
    "power": "100W",
    "lumens": "140Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "Tunable White"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Terra100 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/terra100.png"
    ],
    "dimensionDiagram": "/images/diagrams/terra100-diagram.png"
  },
  {
    "id": "pl-111",
    "slug": "terra200",
    "model": "Terra200",
    "category": "Outdoor Light",
    "subseries": "Floodlight Series",
    "environment": "Outdoor",
    "catalogPage": 111,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "In-Ground Walkover / Drive-over",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP67",
    "power": "200W",
    "lumens": "140Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "Tunable White"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the Terra200 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/terra200.png"
    ],
    "dimensionDiagram": "/images/diagrams/terra200-diagram.png"
  },
  {
    "id": "pl-112",
    "slug": "wl01",
    "model": "WL01",
    "category": "Outdoor Light",
    "subseries": "LENA75 Series",
    "environment": "Outdoor",
    "catalogPage": 112,
    "dimensions": "L100\u00d7W100\u00d7H100mm",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "75\nW",
    "lumens": "100Lm/w",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "5000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off",
      "DALI-2",
      "0-10V / 1-10V"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the WL01 features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/wl01.png"
    ],
    "dimensionDiagram": "/images/diagrams/wl01-diagram.png"
  },
  {
    "id": "pl-114",
    "slug": "pl-hb12-industrial-highbay-overview",
    "model": "PL-HB12 Industrial Highbay Overview",
    "category": "Highbay Light",
    "subseries": "PL-HB12 Highbay Series",
    "environment": "Indoor/Outdoor",
    "catalogPage": 114,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "6W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the PL-HB12 Industrial Highbay Overview features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pl-hb12-industrial-highbay-overview.png"
    ],
    "dimensionDiagram": "/images/diagrams/pl-hb12-industrial-highbay-overview-diagram.png"
  },
  {
    "id": "pl-115",
    "slug": "pl-hb12-industrial-highbay-100w-150w-200w",
    "model": "PL-HB12 Industrial Highbay (100W/150W/200W)",
    "category": "Highbay Light",
    "subseries": "PL-HB12 Highbay Series",
    "environment": "Indoor/Outdoor",
    "catalogPage": 115,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "6W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the PL-HB12 Industrial Highbay (100W/150W/200W) features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pl-hb12-industrial-highbay-100w-150w-200w.png"
    ],
    "dimensionDiagram": "/images/diagrams/pl-hb12-industrial-highbay-100w-150w-200w-diagram.png"
  },
  {
    "id": "pl-116",
    "slug": "pl-hb12-highbay-mounting-dimensions",
    "model": "PL-HB12 Highbay Mounting & Dimensions",
    "category": "Highbay Light",
    "subseries": "PL-HB12 Highbay Series",
    "environment": "Indoor/Outdoor",
    "catalogPage": 116,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "12W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the PL-HB12 Highbay Mounting & Dimensions features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pl-hb12-highbay-mounting-dimensions.png"
    ],
    "dimensionDiagram": null
  },
  {
    "id": "pl-117",
    "slug": "pl-hb12-highbay-photometrics-curves",
    "model": "PL-HB12 Highbay Photometrics & Curves",
    "category": "Highbay Light",
    "subseries": "PL-HB12 Highbay Series",
    "environment": "Indoor/Outdoor",
    "catalogPage": 117,
    "dimensions": "Standard Architectural Housing",
    "cutout": null,
    "installationMethod": "Trimless Recessed",
    "material": "Die-cast / High-grade Extruded Aluminum + Optical PC",
    "finishes": [
      "Matte White",
      "Matte Black"
    ],
    "ipRating": "IP65",
    "power": "12W",
    "lumens": "100 Lm/W",
    "beamAngles": [
      "120\u00b0"
    ],
    "cct": [
      "3000K",
      "4000K",
      "6000K"
    ],
    "cri": "Ra \u2265 80",
    "inputVoltage": "AC 220\u2013240V, 50-60Hz",
    "driverOptions": [
      "On/Off"
    ],
    "lifeHours": "50,000 Hrs",
    "description": "Engineered for high-performance architectural illumination, the PL-HB12 Highbay Photometrics & Curves features premium aluminum housing for optimal heat dissipation and superior optical glare control.",
    "images": [
      "/images/products/pl-hb12-highbay-photometrics-curves.png"
    ],
    "dimensionDiagram": null
  }
];

export const categories: ProductCategory[] = [
  "Spot Light",
  "Linear Light",
  "Track Light",
  "Pendant Light",
  "Magnetic Series",
  "Tube Magnetic",
  "Outdoor Light",
  "Highbay Light",
];

export const environments: ProductEnvironment[] = [
  "Indoor",
  "Outdoor",
  "Indoor/Outdoor",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getCategories(): ProductCategory[] {
  return categories;
}

export function getFeaturedProducts(): Product[] {
  // Curate flagship fixtures from each core category
  const slugs = [
    "rona",
    "mini-msp",
    "leo-lsp",
    "nova",
    "lena-20-linear",
    "lena-50-triangle",
    "lena-20-hexagonal",
    "mars-track",
    "c44-pendant",
    "hud-ln-ad",
    "mega-surface",
    "mega-tube",
    "tube-magnetic-ptm01",
    "tube-magnetic-ptm05",
    "flood18",
    "terra100",
    "pl-hb12-highbay",
  ];
  const featured = products.filter((p) => slugs.some((s) => p.slug.includes(s)));
  return featured.length > 0 ? featured.slice(0, 8) : products.slice(0, 8);
}

