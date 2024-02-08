import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthApp } from './components/AuthApp';
import "./style.css";

const root = createRoot(document.getElementById('app')!);

root.render(<AuthApp/>);