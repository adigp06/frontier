import { Company } from '@/types/company';

export const INDIAN_DEEPTECH_STARTUPS: Omit<Company, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'Agnikul Cosmos',
    slug: 'agnikul-cosmos',
    tagline: 'Orbital launch vehicles powered by 3D-printed semi-cryogenic engines',
    description: 'Agnikul Cosmos is an Indian aerospace manufacturer building customizable small-lift launch vehicles (Agnibaan) powered by world-first fully 3D-printed single-piece semi-cryogenic rocket engines.',
    category: 'Space Tech',
    website_url: 'https://agnikul.in',
    founded_year: 2017,
    funding_stage: 'Series B',
    x: 12.5,
    y: 8.2,
    z: 14.1,
    sources: [
      { title: 'Agnikul Cosmos Official Website', url: 'https://agnikul.in' },
      { title: 'TechCrunch: Agnikul raises Series B', url: 'https://techcrunch.com/agnikul-cosmos' }
    ]
  },
  {
    name: 'Skyroot Aerospace',
    slug: 'skyroot-aerospace',
    tagline: 'Cost-effective orbital launch vehicles for small satellite constellations',
    description: 'Skyroot Aerospace develops advanced carbon-composite solid and cryogenic rocket motors. Their Vikram series of launch vehicles are designed for rapid, on-demand small satellite launches.',
    category: 'Space Tech',
    website_url: 'https://skyroot.in',
    founded_year: 2018,
    funding_stage: 'Series C+',
    x: 15.2,
    y: 10.4,
    z: 12.8,
    sources: [
      { title: 'Skyroot Aerospace Website', url: 'https://skyroot.in' },
      { title: 'Economic Times: Skyroot secures funding', url: 'https://economictimes.indiatimes.com/skyroot' }
    ]
  },
  {
    name: 'Bellatrix Aerospace',
    slug: 'bellatrix-aerospace',
    tagline: 'Advanced in-space propulsion and green propellants',
    description: 'Bellatrix Aerospace builds next-generation satellite propulsion systems including eco-friendly green propellant thrusters and Hall-effect thrusters for deep space exploration and orbital maneuvers.',
    category: 'Space Tech',
    website_url: 'https://bellatrixaerospace.com',
    founded_year: 2015,
    funding_stage: 'Series A',
    x: 10.1,
    y: 12.3,
    z: 9.7,
    sources: [
      { title: 'Bellatrix Aerospace', url: 'https://bellatrixaerospace.com' }
    ]
  },
  {
    name: 'Pixxel',
    slug: 'pixxel',
    tagline: 'Hyperspectral earth imaging satellite constellation',
    description: 'Pixxel is building a constellation of hyperspectral earth observation micro-satellites capable of detecting methane leaks, crop stress, and environmental degradation at high resolution.',
    category: 'Space Tech',
    website_url: 'https://pixxel.space',
    founded_year: 2019,
    funding_stage: 'Series C+',
    x: 14.8,
    y: 6.9,
    z: 15.5,
    sources: [
      { title: 'Pixxel Space Website', url: 'https://pixxel.space' }
    ]
  },
  {
    name: 'Dhruva Space',
    slug: 'dhruva-space',
    tagline: 'Full-stack space engineering solutions and satellite deployment',
    description: 'Dhruva Space provides full-stack space engineering solutions spanning satellite building, launch services, and ground station deployment for institutional and commercial customers.',
    category: 'Space Tech',
    website_url: 'https://dhruvaspace.com',
    founded_year: 2012,
    funding_stage: 'Series A',
    x: 11.4,
    y: 14.1,
    z: 11.2,
    sources: [
      { title: 'Dhruva Space Portal', url: 'https://dhruvaspace.com' }
    ]
  },
  {
    name: 'IdeaForge',
    slug: 'ideaforge',
    tagline: 'Market-leading industrial and tactical UAV drones',
    description: 'IdeaForge designs and manufactures high-performance vertical take-off and landing (VTOL) UAV drones for industrial inspection, defense reconnaissance, and security surveillance applications.',
    category: 'Robotics & Drones',
    website_url: 'https://ideaforge.co.in',
    founded_year: 2007,
    funding_stage: 'Public',
    x: -12.4,
    y: 15.2,
    z: 4.1,
    sources: [
      { title: 'IdeaForge Technology', url: 'https://ideaforge.co.in' }
    ]
  },
  {
    name: 'Garuda Aerospace',
    slug: 'garuda-aerospace',
    tagline: 'Agricultural and industrial drone-as-a-service provider',
    description: 'Garuda Aerospace operates a large fleet of precision agriculture drones for crop spraying, solar panel cleaning, industrial inspection, and emergency delivery.',
    category: 'Robotics & Drones',
    website_url: 'https://garudaaerospace.com',
    founded_year: 2015,
    funding_stage: 'Series A',
    x: -15.1,
    y: 11.8,
    z: 6.5,
    sources: [
      { title: 'Garuda Aerospace', url: 'https://garudaaerospace.com' }
    ]
  },
  {
    name: 'Satsure',
    slug: 'satsure',
    tagline: 'Decision intelligence platform using satellite data and AI',
    description: 'Satsure leverages satellite imagery and machine learning analytics to provide actionable insights for agriculture, banking, insurance, and infrastructure monitoring.',
    category: 'Industrial AI',
    website_url: 'https://satsure.co',
    founded_year: 2017,
    funding_stage: 'Series B',
    x: -5.2,
    y: -12.1,
    z: 14.3,
    sources: [
      { title: 'SatSure Analytics', url: 'https://satsure.co' }
    ]
  },
  {
    name: 'Aarav Unmanned Systems',
    slug: 'aarav-unmanned-systems',
    tagline: 'Enterprise drone solutions for large-scale mapping and mining',
    description: 'AUS builds sophisticated enterprise drones equipped with LiDAR and photogrammetry sensors for mining volumetric analysis, infrastructure mapping, and large acreage agricultural surveys.',
    category: 'Robotics & Drones',
    website_url: 'https://www.aus.co.in',
    founded_year: 2013,
    funding_stage: 'Series A',
    x: -9.8,
    y: 13.5,
    z: 8.2,
    sources: [
      { title: 'Aarav Unmanned Systems', url: 'https://www.aus.co.in' }
    ]
  },
  {
    name: 'Asteria Aerospace',
    slug: 'asteria-aerospace',
    tagline: 'Micro-UAV systems and cloud-based drone operations software',
    description: 'Asteria Aerospace designs ruggedized micro-UAV systems and develops proprietary SkyDeck cloud software for real-time video streaming, flight planning, and automated analytics.',
    category: 'Robotics & Drones',
    website_url: 'https://asteria.co.in',
    founded_year: 2011,
    funding_stage: 'Acquired',
    x: -11.1,
    y: 9.4,
    z: 7.9,
    sources: [
      { title: 'Asteria Aerospace', url: 'https://asteria.co.in' }
    ]
  },
  {
    name: 'AjnaLens',
    slug: 'ajnalens',
    tagline: 'Industrial spatial computing and enterprise XR headsets',
    description: 'AjnaLens develops advanced mixed reality (MR) headsets and spatial computing software designed for industrial training, defense simulation, and immersive enterprise workflows.',
    category: 'Industrial AI',
    website_url: 'https://ajnalens.com',
    founded_year: 2014,
    funding_stage: 'Series A',
    x: -8.5,
    y: -14.2,
    z: -3.1,
    sources: [
      { title: 'AjnaLens Website', url: 'https://ajnalens.com' }
    ]
  },
  {
    name: 'QuNu Labs',
    slug: 'qunu-labs',
    tagline: 'Quantum key distribution and ultra-secure encryption hardware',
    description: 'QuNu Labs pioneers quantum cybersecurity products utilizing Quantum Key Distribution (QKD) to protect critical infrastructure, financial institutions, and government networks against cyber threats.',
    category: 'Quantum Tech',
    website_url: 'https://qunulabs.com',
    founded_year: 2016,
    funding_stage: 'Series A',
    x: 4.1,
    y: 2.3,
    z: -16.5,
    sources: [
      { title: 'QuNu Labs Quantum Security', url: 'https://qunulabs.com' }
    ]
  },
  {
    name: 'BosonQ Psi',
    slug: 'bosonq-psi',
    tagline: 'Quantum-aided simulation software for enterprise engineering',
    description: 'BosonQ Psi develops advanced software that combines quantum computing principles with numerical solvers to accelerate complex multiphysics simulations in aerospace and automotive engineering.',
    category: 'Quantum Tech',
    website_url: 'https://bqpsi.com',
    founded_year: 2020,
    funding_stage: 'Seed',
    x: 6.8,
    y: 4.5,
    z: -14.2,
    sources: [
      { title: 'BosonQ Psi Enterprise Portal', url: 'https://bqpsi.com' }
    ]
  },
  {
    name: 'Sankalp Semiconductors',
    slug: 'sankalp-semiconductors',
    tagline: 'Advanced analog and mixed-signal semiconductor IP design',
    description: 'Sankalp Semiconductors provides specialized semiconductor design services and IP solutions across automotive, consumer electronics, and IoT industrial applications.',
    category: 'Semiconductors',
    website_url: 'https://sankalpsemi.com',
    founded_year: 2005,
    funding_stage: 'Acquired',
    x: -3.4,
    y: 8.7,
    z: 16.2,
    sources: [
      { title: 'Sankalp Semi', url: 'https://sankalpsemi.com' }
    ]
  },
  {
    name: 'Mindgrove Technologies',
    slug: 'mindgrove-technologies',
    tagline: 'Commercializing high-performance custom silicon processors',
    description: 'Mindgrove Technologies designs indigenous, secure, and energy-efficient commercial microprocessors tailored for IoT devices, smart appliances, and edge computing.',
    category: 'Semiconductors',
    website_url: 'https://mindgrove.in',
    founded_year: 2021,
    funding_stage: 'Seed',
    x: -1.2,
    y: 11.4,
    z: 14.8,
    sources: [
      { title: 'Mindgrove Tech Portal', url: 'https://mindgrove.in' }
    ]
  },
  {
    name: 'InCore Semiconductors',
    slug: 'incore-semiconductors',
    tagline: 'RISC-V processor IP cores and customizable SoC solutions',
    description: 'InCore Semiconductors builds highly configurable RISC-V processor IP cores, enabling semiconductor companies and OEMs to build custom System-on-Chips rapidly.',
    category: 'Semiconductors',
    website_url: 'https://incoresemi.com',
    founded_year: 2018,
    funding_stage: 'Seed',
    x: -2.5,
    y: 10.1,
    z: 13.9,
    sources: [
      { title: 'InCore Semiconductors', url: 'https://incoresemi.com' }
    ]
  },
  {
    name: 'Ishamba Robotics',
    slug: 'ishamba-robotics',
    tagline: 'Autonomous mobile robots for heavy manufacturing plants',
    description: 'Ishamba Robotics builds automated guided vehicles (AGVs) and autonomous mobile robots (AMRs) for streamlined intralogistics and heavy parts handling in automotive factories.',
    category: 'Robotics & Drones',
    website_url: 'https://ishamba.com',
    founded_year: 2017,
    funding_stage: 'Seed',
    x: -13.9,
    y: 8.1,
    z: 3.4,
    sources: [
      { title: 'Ishamba Robotics', url: 'https://ishamba.com' }
    ]
  },
  {
    name: 'Genrobotics',
    slug: 'genrobotics',
    tagline: 'Robotic solutions for hazardous urban sanitation and industrial cleaning',
    description: 'Genrobotics pioneers social impact robotics, creating robotic scavengers (Bandicoot) and robotic exoskeletons to eliminate manual scavenging and hazardous industrial cleaning.',
    category: 'Robotics & Drones',
    website_url: 'https://genrobotics.org',
    founded_year: 2017,
    funding_stage: 'Series A',
    x: -14.2,
    y: 13.2,
    z: 5.1,
    sources: [
      { title: 'Genrobotics Innovations', url: 'https://genrobotics.org' }
    ]
  },
  {
    name: 'Addverb Technologies',
    slug: 'addverb-technologies',
    tagline: 'Warehouse automation robotics and AI-powered sorting systems',
    description: 'Addverb Technologies is a global robotics and warehouse automation company offering AMRs, AS/RS, picking robots, and enterprise warehouse execution software (WES).',
    category: 'Robotics & Drones',
    website_url: 'https://addverb.com',
    founded_year: 2016,
    funding_stage: 'Series B',
    x: -10.5,
    y: 14.8,
    z: 6.2,
    sources: [
      { title: 'Addverb Automation', url: 'https://addverb.com' }
    ]
  },
  {
    name: 'Tresa Motors',
    slug: 'tresa-motors',
    tagline: 'Heavy-duty electric trucks powered by proprietary axial flux motors',
    description: 'Tresa Motors designs and manufactures medium and heavy electric commercial trucks featuring proprietary axial flux motor technology and advanced battery thermal management systems.',
    category: 'EV & Energy Tech',
    website_url: 'https://tresamotors.com',
    founded_year: 2022,
    funding_stage: 'Seed',
    x: 8.9,
    y: -9.1,
    z: 11.2,
    sources: [
      { title: 'Tresa Motors Portal', url: 'https://tresamotors.com' }
    ]
  },
  {
    name: 'Log9 Materials',
    slug: 'log9-materials',
    tagline: 'Advanced graphene-based rapid charging batteries and energy storage',
    description: 'Log9 Materials develops ultra-fast charging aluminum-air and lithium-ion battery packs leveraging proprietary nanomaterial and graphene technology for electric vehicles and grid storage.',
    category: 'EV & Energy Tech',
    website_url: 'https://log9.ai',
    founded_year: 2015,
    funding_stage: 'Series B',
    x: 7.4,
    y: -11.2,
    z: 13.5,
    sources: [
      { title: 'Log9 Materials', url: 'https://log9.ai' }
    ]
  },
  {
    name: 'Amara Raja Advanced Cell Technologies',
    slug: 'amara-raja-advanced-cell',
    tagline: 'Li-ion cell manufacturing and Gigafactory infrastructure',
    description: 'Building cutting-edge lithium-ion cell R&D and gigafactory manufacturing capabilities in India to power electric mobility and stationary grid storage systems.',
    category: 'EV & Energy Tech',
    website_url: 'https://amararaja.com',
    founded_year: 2020,
    funding_stage: 'Public',
    x: 10.2,
    y: -8.5,
    z: 12.1,
    sources: [
      { title: 'Amara Raja Energy', url: 'https://amararaja.com' }
    ]
  },
  {
    name: 'Detect Technologies',
    slug: 'detect-technologies',
    tagline: 'AI-powered industrial pipeline monitoring and safety automation',
    description: 'Detect Technologies creates hardware-software IoT solutions utilizing patented sensor technology and computer vision to monitor industrial pipelines, flare stacks, and predict equipment failure.',
    category: 'Industrial AI',
    website_url: 'https://detecttechnologies.com',
    founded_year: 2016,
    funding_stage: 'Series B',
    x: -7.1,
    y: -10.2,
    z: 12.4,
    sources: [
      { title: 'Detect Technologies', url: 'https://detecttechnologies.com' }
    ]
  },
  {
    name: 'Staqu',
    slug: 'staqu',
    tagline: 'AI-driven audio-video analytics and enterprise security platforms',
    description: 'Staqu builds advanced computer vision and NLP solutions (Jarvis) for automated video analytics, surveillance, and industrial safety compliance monitoring.',
    category: 'Industrial AI',
    website_url: 'https://staqu.com',
    founded_year: 2015,
    funding_stage: 'Series A',
    x: -4.8,
    y: -13.5,
    z: 10.1,
    sources: [
      { title: 'Staqu Technologies', url: 'https://staqu.com' }
    ]
  },
  {
    name: 'Niramai',
    slug: 'niramai',
    tagline: 'Thermal imaging healthcare diagnostics powered by machine learning',
    description: 'Niramai uses proprietary thermal imaging and advanced AI algorithms to enable non-invasive, radiation-free early detection of health conditions.',
    category: 'Industrial AI',
    website_url: 'https://niramai.com',
    founded_year: 2016,
    funding_stage: 'Series A',
    x: -6.2,
    y: -11.9,
    z: 9.8,
    sources: [
      { title: 'Niramai Health Analytix', url: 'https://niramai.com' }
    ]
  },
  {
    name: 'Fluid Robotics',
    slug: 'fluid-robotics',
    tagline: 'AI-enabled robotic mapping and water infrastructure management',
    description: 'Fluid Robotics deploys submersible robots and AI software to map underground water and wastewater networks, detect leaks, and prevent urban flooding.',
    category: 'Robotics & Drones',
    website_url: 'https://fluidrobotics.com',
    founded_year: 2019,
    funding_stage: 'Seed',
    x: -12.1,
    y: 10.2,
    z: 7.2,
    sources: [
      { title: 'Fluid Robotics Portal', url: 'https://fluidrobotics.com' }
    ]
  },
  {
    name: 'Karkhana.io',
    slug: 'karkhana-io',
    tagline: 'B2B digital manufacturing platform for on-demand custom parts',
    description: 'Karkhana.io connects OEMs and hardware startups with a vetted network of manufacturing suppliers, providing digital project management for CNC machining, 3D printing, and injection molding.',
    category: 'Industrial AI',
    website_url: 'https://karkhana.io',
    founded_year: 2018,
    funding_stage: 'Series A',
    x: -8.1,
    y: -9.5,
    z: 11.9,
    sources: [
      { title: 'Karkhana.io Manufacturing', url: 'https://karkhana.io' }
    ]
  },
  {
    name: 'Kazam',
    slug: 'kazam',
    tagline: 'Open EV charging software platform and energy management hardware',
    description: 'Kazam builds IoT-enabled EV charging hardware and an agnostic energy management software platform powering EV charging networks across fleets, residential buildings, and commercial spaces.',
    category: 'EV & Energy Tech',
    website_url: 'https://kazam.iv',
    founded_year: 2020,
    funding_stage: 'Seed',
    x: 9.2,
    y: -7.8,
    z: 10.4,
    sources: [
      { title: 'Kazam Energy', url: 'https://kazam.io' }
    ]
  },
  {
    name: 'Vyomika Space Academy',
    slug: 'vyomika-space',
    tagline: 'Space tech education and STEM satellite development labs',
    description: 'Vyomika Space builds modular satellite kits and hands-on space laboratories to foster deeptech aerospace education and early talent pipelines across India.',
    category: 'Space Tech',
    website_url: 'https://vyomikaspace.com',
    founded_year: 2020,
    funding_stage: 'Bootstrapped',
    x: 13.1,
    y: 7.5,
    z: 11.1,
    sources: [
      { title: 'Vyomika Space', url: 'https://vyomikaspace.com' }
    ]
  },
  {
    name: 'Inspektlabs',
    slug: 'inspektlabs',
    tagline: 'AI automated inspection platform for physical assets and vehicles',
    description: 'Inspektlabs uses computer vision and artificial intelligence to automate inspection workflows for cars, heavy equipment, and real estate assets from simple video captures.',
    category: 'Industrial AI',
    website_url: 'https://inspektlabs.com',
    founded_year: 2018,
    funding_stage: 'Seed',
    x: -5.9,
    y: -8.4,
    z: 10.8,
    sources: [
      { title: 'Inspektlabs AI', url: 'https://inspektlabs.com' }
    ]
  }
];
