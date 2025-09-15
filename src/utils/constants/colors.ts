export const colors = {
  primary: '#FF6B9D', 
  secondary: '#4ECDC4', 
  accent: '#3B82F6', 
  

  neutral: '#6B7280', 
  background: '#FFFFFF', 
  overlay: 'rgba(255, 255, 255, 0.8)', 
  

  black: '#000000',
  white: '#FFFFFF',
  grey: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  

  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
} as const;

export type ColorKey = keyof typeof colors;
