/* eslint-disable class-methods-use-this */

module.exports = class Testclass {
  // コンストラクター
  constructor(firstName, lastName, testPP) {
    this.firstName = firstName;
    this.lastName = lastName;
    // this.middleName = middleName;
    this.testPP = testPP;
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

  // get middleName() {
  //   return this.middleNmae;
  // }

  // set middleName(value) {
  //   this.middleNmae = value;
  // }

  get testPP() {
    return this.testPP;
  }

  set testPP(value) {
    this.testPP = value;
  }

  getName() {
    console.log(this.lastName + this.firstName + this.middleName);
  }

  getPieces() {
    console.log(this.testPP);
  }

  array2PieceMatchers(array) {
    const size = Math.sqrt(array.length);
    return (array.map((p, idx) => (p !== 0 ? {
      x: Math.floor(idx % size) - Math.floor(size / 2),
      y: Math.floor(idx / size) - Math.floor(size / 2),
      userId: p,
    } : p))).filter(p => p !== 0);
  }

  array2CandidateMatchers(array) {
    const size = Math.sqrt(array.length);
    return (array.map((p, idx) => (p !== 0 ? {
      x: Math.floor(idx % size) - Math.floor(size / 2),
      y: Math.floor(idx / size) - Math.floor(size / 2),
    } : p))).filter(p => p !== 0);
  }
};
