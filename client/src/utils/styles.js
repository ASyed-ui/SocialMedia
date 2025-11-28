// Shared styles and constants for consistent theming
export const theme = {
  colors: {
    background: '#fefbf6',
    card: '#ffffff',
    textPrimary: '#333',
    textSecondary: '#666',
    textTertiary: '#999',
    border: '#e0e0e0',
    primary: '#666',
    primaryHover: '#555',
    error: '#d32f2f',
    errorHover: '#b71c1c',
    errorBg: '#ffebee',
    success: '#2e7d32',
    focus: '#666',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: '8px',
  shadow: '0 2px 8px rgba(0,0,0,0.08)',
  shadowHover: '0 4px 12px rgba(0,0,0,0.12)',
  transition: 'all 0.2s ease-in-out',
};

export const inputStyles = {
  base: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius,
    color: theme.colors.textPrimary,
    fontSize: '1rem',
    transition: theme.transition,
    outline: 'none',
  },
  focus: {
    borderColor: theme.colors.focus,
    boxShadow: `0 0 0 3px rgba(102, 102, 102, 0.1)`,
  },
  error: {
    borderColor: theme.colors.error,
  },
};

export const buttonStyles = {
  primary: {
    backgroundColor: theme.colors.primary,
    color: '#ffffff',
    borderRadius: theme.borderRadius,
    padding: '0.75rem 1.5rem',
    fontWeight: '600',
    transition: theme.transition,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: 'none',
    cursor: 'pointer',
  },
  primaryHover: {
    backgroundColor: theme.colors.primaryHover,
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  },
  secondary: {
    backgroundColor: '#f5f5f5',
    color: theme.colors.textPrimary,
    borderRadius: theme.borderRadius,
    padding: '0.75rem 1.5rem',
    fontWeight: '600',
    transition: theme.transition,
    border: 'none',
    cursor: 'pointer',
  },
  secondaryHover: {
    backgroundColor: '#e8e8e8',
  },
};

