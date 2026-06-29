const fs = require('fs');
const htmlFile = 'index.html';

let html = fs.readFileSync(htmlFile, 'utf8');

// Add Dashicons link in head if not there
if (!html.includes('dashicons.css')) {
  html = html.replace('</title>', '</title>\n  <link rel="stylesheet" href="https://s.w.org/wp-includes/css/dashicons.css?ver=5.4" type="text/css" media="all" />');
}

// 1. Phone icon
html = html.replace(/<svg[^>]*>\s*<path d="M22 16\.92v3[^>]*>\s*<\/svg>/g, '<span class="dashicons dashicons-phone"></span>');

// 2. Clock icon
html = html.replace(/<svg[^>]*>\s*<circle cx="12" cy="12" r="10"\/>\s*<polyline points="12,6 12,12 16,14"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-clock"></span>');

// 3. Check icon (polyline points="20,6 9,17 4,12")
html = html.replace(/<svg[^>]*>\s*<polyline points="20,6 9,17 4,12"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-yes"></span>');

// 4. Map icon (class="location-block__map-icon")
html = html.replace(/<svg class="location-block__map-icon"[^>]*>\s*<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"\/>\s*<circle cx="12" cy="10" r="3"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-location-alt location-block__map-icon"></span>');

// 5. Star icon
html = html.replace(/<svg viewBox="0 0 24 24" fill="currentColor">\s*<polygon points="12,2 15\.09,8\.26 22,9\.27 17,14\.14 18\.18,21\.02 12,17\.77 5\.82,21\.02 7,14\.14 2,9\.27 8\.91,8\.26"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-star-filled"></span>');

// 6. Chevron Down (FAQ)
html = html.replace(/<svg[^>]*>\s*<polyline points="6,9 12,15 18,9"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-arrow-down-alt2"></span>');

// 7. Hamburger Menu
html = html.replace(/<svg[^>]*>\s*<line x1="3" y1="12"[^>]*>\s*<\/line>\s*<line[^>]*>\s*<\/line>\s*<line[^>]*>\s*<\/line>\s*<\/svg>/g, '<span class="dashicons dashicons-menu"></span>');
// Sometimes hamburger might not match exactly, let's just do a blanket replace for the mobile menu icon if we can find it later.

// 8. Shield
html = html.replace(/<svg[^>]*>\s*<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-shield"></span>');
html = html.replace(/<svg[^>]*>\s*<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"\/>\s*<polyline points="9,11 12,14 22,4"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-shield"></span>');


// 9. Windshield/Rect
html = html.replace(/<svg[^>]*>\s*<rect x="2" y="7" width="20" height="10" rx="2"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-car"></span>');
html = html.replace(/<svg[^>]*>\s*<rect x="2" y="7" width="20" height="10" rx="2"\/>\s*<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"\/>\s*<path d="M6 17v2M18 17v2"\/>\s*<circle cx="12" cy="12" r="2"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-car"></span>');

// 10. Side glass / Square
html = html.replace(/<svg[^>]*>\s*<rect x="3" y="3" width="18" height="18" rx="2"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-welcome-view-site"></span>');

// 11. Money / Cash
html = html.replace(/<svg[^>]*>\s*<rect x="2" y="6" width="20" height="12" rx="2"\/>\s*<path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-money-alt"></span>');

// 12. Phone outline (small)
html = html.replace(/<svg[^>]*>\s*<path d="M22 11\.08V12a10 10 0 1 1-5\.93-9\.14"\/>\s*<polyline points="22,4 12,14\.01 9,11\.01"\/>\s*<\/svg>/g, '<span class="dashicons dashicons-phone"></span>');

// 13. Camera/ADAS
html = html.replace(/<svg[^>]*>\s*<circle cx="12" cy="12" r="3"\/>\s*<path d="M19\.4 15[^\n]*\/>\s*<\/svg>/gs, '<span class="dashicons dashicons-camera"></span>');

// 14. Any remaining SVGs:
// Mobile menu
html = html.replace(/<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">[\s\S]*?<\/svg>/g, '<span class="dashicons dashicons-menu" style="font-size: 28px; width: 28px; height: 28px;"></span>');

// Features label icon
html = html.replace(/<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="features__label-icon">[\s\S]*?<\/svg>/g, '<span class="dashicons dashicons-star-filled features__label-icon"></span>');

// Big 64x64 SVGs (features section)
html = html.replace(/<svg viewBox="0 0 64 64" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/g, '<span class="dashicons dashicons-awards" style="font-size: 64px; width: 64px; height: 64px; color: var(--color-primary);"></span>');

fs.writeFileSync(htmlFile, html, 'utf8');
console.log('Replaced all SVG icons with WordPress Dashicons.');
