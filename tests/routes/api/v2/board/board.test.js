const chai = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../../../../../src/routes/app.js');
const PieceStore = require('../../../../../src/models/v2/PieceStore.js');
const generateToken = require('../../../../../src/routes/api/v2/userIdGenerate/generateToken');

const basePath = '/api/v2/board';
const ZERO = 0;
const TEST_USER_NUMBER = 10;
let testUsers = [];

function setTestUser() {
  testUsers = [...Array(TEST_USER_NUMBER)].map(() => generateToken.generate());
}

const u = n => jwt.decode(testUsers[n]).userId;

function convertComparisonResult(result) {
  const size = Math.sqrt(result.length);
  return (result.map((p, idx) => {
    if (p !== 0) {
      return {
        x: Math.floor(idx % size),
        y: Math.floor(idx / size),
        userId: p === 'I' ? 1 : p,
      };
    }
    return p;
  })).filter(p => p !== 0);
}

function convertComparisonMatchers(result, idSl) {
  // 他のテストと違って原点を中心にずらしている。
  const size = Math.sqrt(result.length);
  return (result.map((p, idx) => {
    if (p === idSl) {
      return {
        x: Math.floor(idx % size) - Math.floor(size / 2),
        y: Math.floor(idx / size) - Math.floor(size / 2),
      };
    }
    return p;
  })).filter(p => p.x !== undefined);
}

describe('board', () => {
  setTestUser(TEST_USER_NUMBER);

  // 一つ駒を置く
  it('gets all', async () => {
    await chai.request(app).delete(`${basePath}`);
    PieceStore.initPieces();

    // Given

    // "I"は初期化した時の最初のピース
    const result = [
      'I', u(0), ZERO, ZERO, ZERO,
      ZERO, u(0), u(1), u(0), ZERO,
      u(2), u(3), u(4), u(5), u(0),
      ZERO, u(6), ZERO, u(1), ZERO,
      ZERO, ZERO, ZERO, ZERO, ZERO,
    ];
    const matchers = convertComparisonResult(result);
    const size = Math.sqrt(result.length);

    result.forEach((elm, index) => {
      if (elm !== 0 && elm !== 'I') {
        const ans = {
          x: Math.floor(index % size),
          y: Math.floor(index / size),
          userId: elm,
        };
        PieceStore.addPiece(ans);
      }
    });

    // When
    const response = await chai.request(app)
      .get(`${basePath}`)
      .set('Authorization', testUsers[0]);

    // Then
    expect(response.body.pieces).toHaveLength(matchers.length);
    expect(response.body.pieces).toEqual(expect.arrayContaining(matchers));
  });
});

describe('board after turnover', () => {
  // 一つ駒を置く
  it('gets pieces after turnover some pieces', async () => {
    await chai.request(app).delete(`${basePath}`);
    PieceStore.deletePieces();

    // Given
    // 2nd piece set
    const resultFol = [
      ZERO, ZERO, ZERO, ZERO,
      u(1), ZERO, ZERO, ZERO,
      ZERO, ZERO, ZERO, ZERO,
      ZERO, ZERO, ZERO, ZERO,
    ];
    // second_pieceを取り込み
    const sizeFol = Math.sqrt(resultFol.length);
    resultFol.forEach((elm, index) => {
      if (elm !== 0) {
        const ans = {
          x: Math.floor(index % sizeFol),
          y: Math.floor(index / sizeFol),
          userId: elm,
        };
        PieceStore.addPiece(ans);
      }
    });
    const matchers = convertComparisonMatchers([
      ZERO, ZERO, ZERO, ZERO, ZERO,
      ZERO, ZERO, u(0), ZERO, ZERO,
      ZERO, u(0), 'I', u(0), ZERO,
      ZERO, u(0), u(1), u(0), ZERO,
      ZERO, ZERO, u(0), ZERO, ZERO,
    ], u(0));

    // When
    const response = await chai.request(app)
      .get(`${basePath}`)
      .set('Authorization', testUsers[0]);
    // Then
    expect(response.body.candidates).toHaveLength(matchers.length);
    expect(response.body.candidates).toEqual(expect.arrayContaining(matchers));
  });
});
