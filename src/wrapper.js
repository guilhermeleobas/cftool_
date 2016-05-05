function readline() {
  fs = require('fs');
  win32 = function() {
    return ('win32' === process.platform);
  },
  readSync = function() {
    var fd = win32() ? process.stdin.fd : fs.openSync('/dev/stdin', 'rs');
    var ret = '';
    buffer = new Buffer(1);
    var started = false;
    while (true) {
      var bytes = fs.readSync(fd, buffer, 0, 1);
      
      if (bytes == 0)
        break;
      var chr = String.fromCharCode(buffer[0]);
      if (buffer[0] == 0x0a || buffer[0] == 0x0d) {
        if (started)
          break;
      } else {
        started = true;
        ret += chr;
      }
    }
    if (!win32()) fs.closeSync(fd);
    return ret;
  };
  return readSync();
}
print=console.log;
console.log=console.error;
write=process.stdout.write;