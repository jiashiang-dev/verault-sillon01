import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DefaultDemo from '@/demos/default';
import '@/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode><DefaultDemo /></StrictMode>,
);
