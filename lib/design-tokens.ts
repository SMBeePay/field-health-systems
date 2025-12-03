export const designTokens = {
  colors: {
    // DISTINCTIVE BRAND COLORS - Field Tech Aesthetic
    // Deep indigo primary with electric accents
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
      950: '#1e1b4b',
    },

    // Electric blue accent for energy and tech
    accent: {
      50: '#ecfeff',
      100: '#cffafe',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      900: '#164e63',
    },

    // Coral for warmth and athletic energy
    coral: {
      50: '#fff1f2',
      100: '#ffe4e6',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      900: '#881337',
    },

    // Status Colors - Redesigned with new palette
    status: {
      excellent: {
        text: 'text-cyan-700',
        bg: 'bg-gradient-to-br from-cyan-50 to-blue-50',
        border: 'border-cyan-300',
        dot: 'bg-cyan-500',
        glow: 'shadow-cyan-500/20',
      },
      good: {
        text: 'text-indigo-700',
        bg: 'bg-gradient-to-br from-indigo-50 to-purple-50',
        border: 'border-indigo-300',
        dot: 'bg-indigo-500',
        glow: 'shadow-indigo-500/20',
      },
      monitor: {
        text: 'text-amber-700',
        bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
        border: 'border-amber-300',
        dot: 'bg-amber-500',
        glow: 'shadow-amber-500/20',
      },
      critical: {
        text: 'text-rose-700',
        bg: 'bg-gradient-to-br from-rose-50 to-red-50',
        border: 'border-rose-300',
        dot: 'bg-rose-500',
        glow: 'shadow-rose-500/20',
      },
    },

    // Priority Colors - Enhanced with gradients
    priority: {
      low: {
        text: 'text-slate-700',
        bg: 'bg-gradient-to-br from-slate-50 to-gray-50',
        border: 'border-slate-300',
      },
      medium: {
        text: 'text-amber-700',
        bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
        border: 'border-amber-300',
      },
      high: {
        text: 'text-orange-700',
        bg: 'bg-gradient-to-br from-orange-50 to-red-50',
        border: 'border-orange-300',
      },
      critical: {
        text: 'text-rose-700',
        bg: 'bg-gradient-to-br from-rose-50 to-pink-50',
        border: 'border-rose-300',
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
    '3xl': '6rem',
  },

  // ENHANCED TYPOGRAPHY - Bolder, more expressive
  typography: {
    heading: {
      h1: 'text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600',
      h2: 'text-3xl md:text-4xl font-bold text-slate-900',
      h3: 'text-2xl md:text-3xl font-bold text-slate-900',
      h4: 'text-xl md:text-2xl font-semibold text-slate-800',
      h5: 'text-lg md:text-xl font-semibold text-slate-800',
    },
    body: {
      large: 'text-lg md:text-xl text-slate-700 leading-relaxed',
      base: 'text-base md:text-lg text-slate-700 leading-relaxed',
      small: 'text-sm md:text-base text-slate-600',
      xs: 'text-xs md:text-sm text-slate-500',
    },
    display: {
      hero: 'text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600',
      feature: 'text-4xl md:text-5xl font-extrabold text-slate-900',
    },
  },

  // ENHANCED RADIUS - More distinctive shapes
  radius: {
    sm: 'rounded-lg',
    base: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full',
    none: 'rounded-none',
  },

  // ENHANCED SHADOWS - Colored glows and depth
  shadows: {
    sm: 'shadow-lg shadow-slate-200/50',
    base: 'shadow-xl shadow-slate-300/50',
    lg: 'shadow-2xl shadow-slate-400/50',
    xl: 'shadow-2xl shadow-slate-500/50',
    glow: {
      primary: 'shadow-2xl shadow-indigo-500/30',
      accent: 'shadow-2xl shadow-cyan-500/30',
      coral: 'shadow-2xl shadow-rose-500/30',
    },
    inner: 'inset shadow-lg shadow-slate-900/10',
  },

  // ENHANCED TRANSITIONS - More fluid
  transitions: {
    fast: 'transition-all duration-200 ease-out',
    base: 'transition-all duration-300 ease-out',
    slow: 'transition-all duration-500 ease-out',
    bounce: 'transition-all duration-300 ease-in-out',
    spring: 'transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
  },

  // REDESIGNED COMPONENTS - Distinctive visual language
  components: {
    // Glass morphism card with gradient border
    card: 'bg-white/80 backdrop-blur-xl border-2 border-transparent bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl shadow-slate-300/50 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300',

    cardAlt: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200/50 rounded-2xl shadow-xl shadow-indigo-300/30 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300',

    // Distinctive buttons with gradients and glows
    button: {
      primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105',

      secondary: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105',

      outline: 'border-2 border-indigo-500 hover:bg-indigo-50 text-indigo-700 font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20',

      ghost: 'hover:bg-indigo-100 text-indigo-700 font-semibold px-4 py-2 rounded-lg transition-all duration-200',

      coral: 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/50 transition-all duration-300 hover:scale-105',
    },

    // Modern input with focus glow
    input: 'block w-full px-4 py-3 border-2 border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20 transition-all duration-200 bg-white/50 backdrop-blur-sm',

    // Enhanced badge with glow
    badge: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-md',

    // Field pattern background (signature element)
    fieldPattern: 'bg-[linear-gradient(to_right,#e0e7ff_1px,transparent_1px),linear-gradient(to_bottom,#e0e7ff_1px,transparent_1px)] bg-[size:4rem_4rem]',

    // Diagonal accent stripe
    diagonalStripe: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600',

    // Glass panel
    glassPanel: 'bg-white/70 backdrop-blur-2xl border border-white/20 shadow-2xl',
  },

  // ANIMATIONS & EFFECTS
  animations: {
    fadeIn: 'animate-in fade-in duration-500',
    slideUp: 'animate-in slide-in-from-bottom-4 duration-500',
    slideDown: 'animate-in slide-in-from-top-4 duration-500',
    scaleIn: 'animate-in zoom-in-95 duration-300',
    shimmer: 'animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent',
  },

  // GRID PATTERNS (signature field motif)
  patterns: {
    fieldGrid: 'bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:3rem_3rem]',
    fieldGridLarge: 'bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:6rem_6rem]',
    dots: 'bg-[radial-gradient(#4f46e520_1px,transparent_1px)] bg-[size:1rem_1rem]',
  },
}