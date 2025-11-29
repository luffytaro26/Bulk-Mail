import React, { Suspense } from 'react';
import './App.css';

// Lazy-load the Ui component
const Ui = React.lazy(() => import('./components/Ui'));

function App() {
return (
<>
<Suspense fallback={<div>Loading UI...</div>}> <Ui /> </Suspense>
</>
);
}

export default App;
