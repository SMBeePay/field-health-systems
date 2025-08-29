# Field Health Systems

A comprehensive SaaS platform that transforms artificial sports field testing data into actionable insights for athletic directors, facility managers, and maintenance teams.

## 🏟️ Overview

Field Health Systems combines field testing IoT devices, data analytics, and predictive maintenance to ensure optimal field performance, athlete safety, and cost-effective maintenance scheduling.

### Key Features

- **Field Health Dashboard**: Real-time monitoring with status indicators (Excellent/Good/Monitor/Critical)
- **Testing Data Management**: Comprehensive interface for inputting field testing measurements
- **Smart Recommendations**: AI-powered maintenance recommendations based on sport-specific standards
- **Performance Analytics**: Interactive charts showing field performance trends over time
- **Compliance Reporting**: Automated reports for FIFA, NCAA, NFHS, and custom standards

### Supported Sports

- Football (American)
- Soccer (FIFA Quality Pro compliant)
- Lacrosse
- Field Hockey
- Baseball
- Multi-Purpose Fields

## 🧠 Intelligence Engine

Our advanced knowledge base incorporates universal truths about artificial turf performance:

### GMAX (Shock Absorption)
- Range: 55-200 GMAX
- Sport-specific safety limits (Soccer <130, Football <200)
- Temperature impact modeling (can double on hot days >90°F)
- Age degradation tracking (3% yearly increase)

### Shear Factor (Traction)
- Balanced resistance for optimal safety
- Sport-specific ranges to prevent slipping and knee injuries
- Moisture and temperature impact analysis

### Infill Depth
- Sport-specific optimal ranges (12-25mm)
- Migration and compaction modeling
- Weather impact on infill settling

## 🚀 Technology Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Animation**: Framer Motion for smooth interactions
- **Charts**: Recharts for data visualization
- **Validation**: Zod for type-safe data validation
- **Icons**: Lucide React
- **Deployment**: Optimized for Vercel

## 📊 Core Metrics

The system tracks three critical field performance metrics:

1. **GMAX**: Surface hardness measurement (lower is better)
2. **Shear Factor**: Rotational resistance for traction (balance is key)
3. **Infill Depth**: Exposed infill above fiber tips (sport-specific targets)

All metrics are evaluated against sport-specific standards with environmental condition adjustments.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd field-health-systems

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📈 Performance Standards

### Football Fields
- GMAX: <200 (Optimal: 55-120)
- Infill Depth: 15-20mm
- Shear Factor: 25-45 Nm

### Soccer Fields
- GMAX: <130 (FIFA: <100)
- Infill Depth: 12-18mm  
- Shear Factor: 20-40 Nm

### Multi-Purpose Fields
- GMAX: <165 (Optimal: 55-110)
- Infill Depth: 14-19mm
- Shear Factor: 20-40 Nm

## 🎯 Key Benefits

- **Safety First**: Prevent injuries through proactive field monitoring
- **Cost Optimization**: Reduce emergency repairs by up to 75%
- **Data-Driven Decisions**: Evidence-based maintenance and budget planning
- **Regulatory Compliance**: Automated documentation for insurance and governing bodies
- **Extended Field Life**: Proactive care extends field lifespan by 3-5 years

## 🏗️ Project Structure

```
field-health-systems/
├── app/                    # Next.js App Router pages
├── components/            
│   ├── layout/            # Header, sidebar, navigation
│   └── ui/                # Reusable UI components
├── lib/
│   ├── field-performance-knowledge.ts  # Expert knowledge base
│   ├── schemas.ts         # Zod validation schemas
│   ├── utils.ts          # Utility functions
│   ├── design-tokens.ts  # Design system constants
│   └── mock-data.ts      # Development data
└── public/               # Static assets
```

## 🔮 Future Enhancements

- IoT sensor integration for continuous monitoring
- Mobile app for field technicians
- Advanced machine learning for predictive analytics
- Multi-tenant SaaS platform
- Integration with maintenance management systems

## 📄 License

This project is proprietary software developed for Clean Green Turf.

## 🤝 Contributing

This is a private repository. For questions or support, please contact the development team.

---

**Field Health Systems** - Transforming field maintenance through intelligent data analytics.