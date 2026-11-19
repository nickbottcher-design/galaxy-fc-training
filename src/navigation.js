export function mountNavigation() {
  const viewForHash = {
    home: 'home', teams: 'home', schedule: 'schedule', training: 'training',
    'position-training': 'training', winter: 'winter', about: 'about', coaches: 'about', standards: 'about'
  };

  function showView() {
    const route = location.hash.slice(1) || 'home';
    const view = Object.hasOwn(viewForHash, route) ? viewForHash[route] : 'home';
    for (const name of ['home', 'schedule', 'training', 'winter', 'about']) {
      document.getElementById(name + '-view').hidden = name !== view;
    }
    document.querySelectorAll('nav a').forEach(link => {
      const anchor = link.hash.slice(1);
      if (anchor === route || (anchor === 'about' && view === 'about')
        || (anchor === 'training' && (view === 'training' || view === 'winter'))) {
        link.setAttribute('aria-current', anchor === 'teams' ? 'location' : 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    if (['teams', 'position-training', 'coaches', 'standards', 'social'].includes(route)) {
      document.getElementById(route).scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener('hashchange', showView);
  showView();
  return () => window.removeEventListener('hashchange', showView);
}
