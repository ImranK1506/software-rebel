import Index from './pages/Index';
import NotFound from './pages/NotFound';

/**
 * Single-page site on GitHub Pages: any unknown path is served by the
 * 404.html fallback (a copy of index.html), so we render the not-found
 * view whenever the path isn't the root. No client-side router needed.
 */
const App = () => (window.location.pathname === '/' ? <Index /> : <NotFound />);

export default App;
