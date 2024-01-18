import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthApp } from './components/AuthApp';

const root = createRoot(document.getElementById('app')!);

root.render(<AuthApp/>);