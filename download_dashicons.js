const fs = require('fs');
const https = require('https');
https.get('https://s.w.org/wp-includes/css/dashicons.css?ver=5.4', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Keep only the woff base64 source in @font-face
    data = data.replace(/src: url\([^)]+\.eot[^)]+\);/g, '');
    data = data.replace(/src: [^;]+;/g, function(match) {
       if(match.includes('base64')) {
           // extract just the woff part
           const woff = match.match(/url\("data:application\/x-font-woff;charset=utf-8;base64,[^"]+"\)[^,]*/);
           if(woff) return 'src: ' + woff[0] + ';';
       }
       return match;
    });
    fs.writeFileSync('resources/dashicons.css', data);
    console.log('Saved to resources/dashicons.css');
  });
});
