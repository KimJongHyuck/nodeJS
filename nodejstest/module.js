// let M = {
//   v: `v`,
//   f: function () {
//     console.log(this.v);
//   },
// };

let part = require(`./modulepart1.js`);
console.log(part);

// M.f();
part.f();
