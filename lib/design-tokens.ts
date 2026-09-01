export const designTokens = {
  colors: {
    // Brand Colors - From Brand Guide
    brand: {
      navy: '#0D1B2A',      // Primary - Navy
      blue: '#1E88E5',      // Secondary - Blue
      green: '#43B02A',     // Accent - Grass Green
      lightGray: '#E6E6EA', // Neutral
    },
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#1E88E5',  // Brand Blue
      600: '#1976D2',
      700: '#1565C0',
      900: '#0D1B2A',  // Brand Navy
    },
    
    // Status Colors
    status: {
      excellent: {
        text: 'text-green-700',
        bg: 'bg-green-50',
        border: 'border-green-200',
        dot: 'bg-green-500',
      },
      good: {
        text: 'text-blue-700',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        dot: 'bg-blue-500',
      },
      monitor: {
        text: 'text-yellow-700',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        dot: 'bg-yellow-500',
      },
      critical: {
        text: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-red-200',
        dot: 'bg-red-500',
      },
    },
    
    // Priority Colors
    priority: {
      low: {
        text: 'text-gray-700',
        bg: 'bg-gray-50',
        border: 'border-gray-200',
      },
      medium: {
        text: 'text-yellow-700',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
      },
      high: {
        text: 'text-orange-700',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
      },
      critical: {
        text: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-red-200',
      },
    },
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  
  typography: {
    heading: {
      h1: 'text-4xl md:text-5xl font-bold text-gray-900',  // Montserrat Bold
      h2: 'text-3xl md:text-4xl font-bold text-gray-900',  // Montserrat Bold
      h3: 'text-2xl md:text-3xl font-semibold text-gray-900',  // Montserrat Medium
      h4: 'text-xl md:text-2xl font-semibold text-gray-900',  // Montserrat Medium
    },
    body: {
      large: 'text-lg md:text-xl text-gray-700',  // Open Sans
      base: 'text-base md:text-lg text-gray-700',  // Open Sans
      small: 'text-sm text-gray-600',  // Open Sans
      xs: 'text-xs text-gray-500',  // Open Sans
    },
  },
  
  radius: {
    sm: 'rounded-sm',
    base: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  },
  
  shadows: {
    sm: 'shadow-sm',
    base: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },
  
  transitions: {
    fast: 'transition-all duration-150 ease-in-out',
    base: 'transition-all duration-200 ease-in-out',
    slow: 'transition-all duration-300 ease-in-out',
  },
  
  components: {
    card: 'bg-white border border-gray-200 rounded-xl shadow-sm',
    button: {
      primary: 'bg-[#1E88E5] hover:bg-[#1976D2] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg',
      secondary: 'bg-[#43B02A] hover:bg-[#3a9624] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200',
      outline: 'border-2 border-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-white text-[#0D1B2A] font-semibold px-6 py-3 rounded-lg transition-all duration-200',
    },
    input: 'block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#1E88E5] focus:border-[#1E88E5]',
    badge: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
  },
}