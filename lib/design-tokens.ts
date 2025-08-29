export const designTokens = {
  colors: {
    // Brand Colors
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      900: '#14532d',
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
      h1: 'text-3xl font-bold text-gray-900',
      h2: 'text-2xl font-semibold text-gray-900',
      h3: 'text-xl font-semibold text-gray-900',
      h4: 'text-lg font-medium text-gray-900',
    },
    body: {
      large: 'text-lg text-gray-700',
      base: 'text-base text-gray-700',
      small: 'text-sm text-gray-600',
      xs: 'text-xs text-gray-500',
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
    card: 'bg-white border border-gray-200 rounded-lg shadow-sm',
    button: {
      primary: 'bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200',
      secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-4 py-2 rounded-md transition-colors duration-200',
      outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-md transition-colors duration-200',
    },
    input: 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500',
    badge: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  },
}