const fs = require('fs');
const pngToIco = require('png-to-ico').default;
(async () => {
  const buf = await pngToIco('build/app-icon.png');
  fs.writeFileSync('build/app-icon.ico', buf);
})();
