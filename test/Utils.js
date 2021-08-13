const BigNumber = require("bignumber.js");
const { time } = require("@openzeppelin/test-helpers");
BigNumber.config({ DECIMAL_PLACES: 0 });

const gasLogger = {};
const gasLoggerNum = {};

async function gasLog(logTo, targetPromise) {
  const tx = await targetPromise;
  const gasUsed = tx.receipt.gasUsed;

  if (gasLogger[logTo] === undefined) {
    gasLogger[logTo] = gasUsed;
    gasLoggerNum[logTo] = 1;
  } else {
    gasLogger[logTo] =
      gasLogger[logTo] / (gasLoggerNum[logTo] + 1) +
      gasUsed / (gasLoggerNum[logTo] + 1);
    gasLoggerNum[logTo]++;
  }
}

async function printGasLog() {
  console.log(gasLogger);
}

async function advanceNBlock(n) {
  const startingBlock = await time.latestBlock();
  await time.increase(15 * Math.round(n));
  const endBlock = startingBlock.addn(n);
  await time.advanceBlockTo(endBlock);
}
async function waitHours(n) {
  await time.increase(n * 3600 + 1);
}

function assertBNEq(a, b) {
  const _a = new BigNumber(a);
  const _b = new BigNumber(b);
  const msg = _a.toFixed() + " != " + _b.toFixed();
  assert.equal(_a.eq(_b), true, msg);
}

function assertApproxBNEq(a, b, c) {
  const _a = new BigNumber(a).div(c);
  const _b = new BigNumber(b).div(c);
  const msg = _a.toFixed() + " != " + _b.toFixed();
  assert.equal(_a.eq(_b), true, msg);
}

function assertBNGt(a, b) {
  const _a = new BigNumber(a);
  const _b = new BigNumber(b);
  const msg = _a.toFixed() + " is not greater than " + _b.toFixed();
  assert.equal(_a.gt(_b), true, msg);
}

function assertNEqBN(a, b) {
  const _a = new BigNumber(a);
  const _b = new BigNumber(b);
  assert.equal(_a.eq(_b), false);
}

async function inBNfixed(a) {
  return await new BigNumber(a).toFixed();
}

module.exports = {
  gasLogger,
  gasLoggerNum,
  gasLog,
  printGasLog,
  advanceNBlock,
  assertBNEq,
  assertApproxBNEq,
  assertBNGt,
  assertNEqBN,
  inBNfixed,
  waitHours,
};
