// Category list shown on the Home screen.
// `icon` is a plain emoji/symbol so the app needs no icon-font dependency.
export const CATEGORIES = [
  {
    id: 'first-aid',
    title: 'First Aid',
    subtitle: 'Step-by-step emergency basics',
    icon: '⛑️',
    color: '#E04848',
  },
  {
    id: 'vitals',
    title: 'Vital Signs',
    subtitle: 'Normal ranges at a glance',
    icon: '💓',
    color: '#D9467A',
  },
  {
    id: 'labs',
    title: 'Lab Values',
    subtitle: 'Common adult reference ranges',
    icon: '🧪',
    color: '#6A55C9',
  },
  {
    id: 'conditions',
    title: 'Common Conditions',
    subtitle: 'Signs and when to see a doctor',
    icon: '🩺',
    color: '#1E88A8',
  },
  {
    id: 'wellness',
    title: 'Healthy Living',
    subtitle: 'Everyday prevention tips',
    icon: '🌿',
    color: '#2E9D5B',
  },
];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
