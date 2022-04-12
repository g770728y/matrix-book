// M 记为:
// * | a | c | tx|
// * | b | d | ty|
// * | 0 | 0 | 1 |
// 则: M * P = newP
// * | 1 | 0 | 10|   | 10 |   | 10 |
// * | 0 | 1 | 10| * | 5  | = | 5  |
// * | 0 | 0 | 1 |   | 0  |   | 0  |

import { DEG_TO_RAD } from "./utils/const";
import { Matrix } from "./utils/Matrix";

it("M * N = M.append(N) = N.prepend(M) ", () => {
  /* M=
  |1   1   1|
  |0   1   0|
  |0   0   1|
 N = 
  |1   0   0|
  |1   1   0|
  |0   0   1|
 K = 
  |2   1   1|
  |1   1   0|
  |0   0   1|
  */
  const M = new Matrix(1, 0, 1, 1, 1, 0);
  const N = new Matrix(1, 1, 0, 1, 0, 0);
  const K = new Matrix(2, 1, 1, 1, 1, 0);
  expect(M.clone().append(N)).toEqual(K);
  expect(N.clone().prepend(M)).toEqual(K);
});

it("M.invert * M = M * M.invert = Identity", () => {
  const M = new Matrix(1, 0, 1, 1, 1, 0);
  expect(M.clone().invert().append(M)).toEqual(Matrix.IDENTITY);
  expect(M.clone().append(M.clone().invert())).toEqual(Matrix.IDENTITY);
});

it("I.rotate(45).scale(-1,1) = I.scale(-1,1) * I.rotate(45)", () => {
  // 注意顺序相反。理解: 先旋转M再缩放N,所以是 N * M(M先应用)
  const m1 = Matrix.IDENTITY.rotate(45 * DEG_TO_RAD).scale(-1, 1);
  const m2 = Matrix.IDENTITY.rotate(45 * DEG_TO_RAD).prepend(
    Matrix.IDENTITY.scale(-1, 1)
  );
  const m3 = Matrix.IDENTITY.scale(-1, 1).append(
    Matrix.IDENTITY.rotate(45 * DEG_TO_RAD)
  );
  expect(m1).toEqual(m2);
  expect(m1).toEqual(m3);
});

it("M*N=K => N=M.invert*K", () => {
  const M = new Matrix(1, 0, 1, 1, 1, 0);
  const N = new Matrix(1, 1, 0, 1, 0, 0);
  const K = new Matrix(2, 1, 1, 1, 1, 0);
  expect(M.clone().append(N)).toEqual(K);
  expect(M.clone().invert().append(M).append(N)).toEqual(N);
  expect(N.clone()).toEqual(M.clone().invert().append(K));
});

// matrixToStage
// decompose ,  同时找到skew=(-PI,0), rotation=0

it("dot is append", () => {
  // const m = Matrix.IDENTITY.translate(100, 100).rotate(45 * DEG_TO_RAD);
  expect(2).toEqual(2);
});

it("tmp", () => {
  const parent = new Matrix(
    -0.7071067811865475,
    0.7071067811865476,
    0.7071067811865475,
    0.7071067811865476,
    141.4213562373095,
    141.42135623730948
  );
  const child = new Matrix(
    -1.1102230246251565e-16,
    -0.9999999999999999,
    -1,
    1.1102230246251565e-16,
    -185.857864376269,
    -185.857864376269
  );
  const acc = new Matrix(
    -0.7071067811865474,
    -0.7071067811865476,
    0.7071067811865476,
    -0.7071067811865476,
    141.42135623730954,
    -121.42135623730948
  );
  expect(parent.append(child)).toEqual(acc);
});

