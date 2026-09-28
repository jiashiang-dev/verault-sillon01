import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Sillon01Page from '@/pages/Sillon01Page';
import '@/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode><Sillon01Page /></StrictMode>,
);
