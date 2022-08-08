//
// cloneDeep (ob) {
//
//     let n = ob.constructor.name == 'Array' ? [] : {};
//
//     for (let k in ob) {
//
//         if (typeof (ob[k]) == 'object') {
//
//             n[k] = this.cloneDeep(ob[k]);
//
//         } else {
//             n[k] = ob[k];
//         }
//     }
//
//     return n;
// }
