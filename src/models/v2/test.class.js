/* eslint-disable class-methods-use-this */
// module.exports = class Test {
//   // コンストラクター
//   constructor(a) {
//     this.putPieces = [0];
//     this.pieceMatchers = [0];
//     this.candidateMatchers = [0];
//     this.hoge = a;
//   }

//   get putPieces() {
//     return !this.putPieces
//       ? this.putPieces : '';
//   }

//   set putPieces(val) {
//     if (!val) {
//       this.putPieces = val;
//     }
//   }

//   get pieceMatchers() {
//     return !this.pieceMatchers
//       ? this.pieceMatchers : '';
//   }

//   set pieceMatchers(val) {
//     if (!val) {
//       this.pieceMatchers = val;
//     }
//   }

//   get candidateMatchers() {
//     return !this.candidateMatchers
//       ? this.candidateMatchers : '';
//   }

//   set candidateMatchers(val) {
//     if (!val) {
//       this.candidateMatchers = val;
//     }
//   }

//   get hoge() {
//     return !this.hoge
//       ? this.hoge : '';
//   }

//   set hoge(val) {
//     if (!val) {
//       this.hoge = val;
//     }
//   }

//   test() {
//     console.log('hoge');
//   }
// };

module.exports = class Members {
  //     // コンストラクター
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get firstName() {
    return this.firstNmae;
  }

  set firstName(value) {
    this.firstNmae = value;
  }

  get lastName() {
    return this.lastNmae;
  }

  set lastName(value) {
    this.lastNmae = value;
  }

  getName() {
    console.log(this.lastName + this.firstName);
  }
};
