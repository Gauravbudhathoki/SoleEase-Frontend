export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
        <span className="text-lg font-bold text-stone-900">SoleEase</span>

        <nav className="flex flex-wrap justify-center gap-6 text-sm text-stone-500">
          <a href="#" className="hover:text-stone-900 transition-colors">Sustainability</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Size Guide</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Store Locator</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Returns</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
        </nav>

        <div className="flex gap-4 text-stone-400">
          <a href="#" aria-label="Share" className="hover:text-stone-700 transition-colors">
            <ShareIcon />
          </a>
          <a href="#" aria-label="Wishlist" className="hover:text-stone-700 transition-colors">
            <HeartIcon />
          </a>
        </div>

        <p className="text-xs text-stone-400">
          © {new Date().getFullYear()} SoleEase. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}