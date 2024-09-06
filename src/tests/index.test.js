const exprWithContext = require("..").exprWithContext;
const expr = require("..").expr;

describe("expr", () => {
  test("add", () => {
    expect(expr("1 + 2 + 3")).toBe(1 + 2 + 3);
  });

  test("sub", () => {
    expect(expr("1 - 2 - 3")).toBe(1 - 2 - 3);
  });

  test("mul", () => {
    expect(expr("1 * 2 * 3")).toBe(1 * 2 * 3);
  });

  test("div", () => {
    expect(expr("1 / 2 / 3")).toBe(1 / 2 / 3);
  });

  test("unary", () => {
    expect(expr("-1")).toBe(-1);
    expect(expr("!1")).toBe(!1);
    expect(expr("!0")).toBe(!0);
  });

  test("parentheses", () => {
    expect(expr("(1 + 2) * 3")).toBe((1 + 2) * 3);
    expect(expr("1 + (2 * 3)")).toBe(1 + (2 * 3));
    expect(expr("1 + (2 * 3) + 4")).toBe(1 + (2 * 3) + 4);
    expect(expr("(1 + 2) * (3 + 4)")).toBe((1 + 2) * (3 + 4));
    expect(expr("(1 + 2) * (3 + 4) + 5")).toBe((1 + 2) * (3 + 4) + 5);
    expect(expr("(1 + 2) * (3 + 4) + 5 * 6")).toBe((1 + 2) * (3 + 4) + 5 * 6);
    expect(expr("(1 + 2) * (3 + 4) + 5 * 6 - 7")).toBe((1 + 2) * (3 + 4) + 5 * 6 - 7);
  });

  test("precedence", () => {
    expect(expr("1 + 2 * 3")).toBe(1 + 2 * 3);
    expect(expr("1 + 2 * 3 + 4")).toBe(1 + 2 * 3 + 4);
    expect(expr("1 + 2 * 3 + 4 / 5")).toBe(1 + 2 * 3 + 4 / 5);
    expect(expr("1 + 2 * 3 + 4 / 5 - 6")).toBe(1 + 2 * 3 + 4 / 5 - 6);
  });

  test("binary", () => {
    expect(expr("1 == 2")).toBe(1 == 2);
    expect(expr("1 != 2")).toBe(1 != 2);
    expect(expr("1 > 2")).toBe(1 > 2);
    expect(expr("1 < 2")).toBe(1 < 2);
    expect(expr("1 >= 2")).toBe(1 >= 2);
    expect(expr("1 <= 2")).toBe(1 <= 2);
    expect(expr("1 && 2")).toBe(1 && 2);
    expect(expr("1 || 2")).toBe(1 || 2);
  });

  test("ternary", () => {
    expect(expr("1 ? 2 : 3")).toBe(1 ? 2 : 3);
    expect(expr("1 ? 2 ? 3 : 4 : 5")).toBe(1 ? 2 ? 3 : 4 : 5);
    expect(expr("1 ? 2 ? 3 : 4 : 5 ? 6 : 7")).toBe(1 ? 2 ? 3 : 4 : 5 ? 6 : 7);
    expect(expr("1 ? 2 ? 3 : 4 : 5 ? 6 : 7 ? 8 : 9")).toBe(1 ? 2 ? 3 : 4 : 5 ? 6 : 7 ? 8 : 9);
  });

  test("array", () => {
    expect(expr("[1, 2, 3]")).toEqual([1, 2, 3]);
    expect(expr("[1, 2, 3, 4, 5]")).toEqual([1, 2, 3, 4, 5]);
    expect(expr("[1 + 2]")).toEqual([1 + 2]);
    expect(expr("[1 + 2, 3 + 4]")).toEqual([1 + 2, 3 + 4]);
    expect(expr("[1 + 2, 3 + 4, 5 + 6]")).toEqual([1 + 2, 3 + 4, 5 + 6]);
  });

  test("object", () => {
    expect(expr('{"a": 1, "b": 2, "c": 3}')).toEqual({ a: 1, b: 2, c: 3 });
    expect(expr('{"a": 1 + 2, "b": 3 + 4, "c": 5 + 6}')).toEqual({ a: 1 + 2, b: 3 + 4, c: 5 + 6 });
    expect(expr('{"a": { "b": 1 + 2 }, "c": { "d": 3 + 4 }}')).toEqual({ a: { b: 1 + 2 }, c: { d: 3 + 4 } });
    expect(expr('{"a": [1, 2, 3], "b": [4, 5, 6]}')).toEqual({ a: [1, 2, 3], b: [4, 5, 6] });
    expect(expr('{"a": [1 + 2, 3 + 4, 5 + 6], "b": [7 + 8, 9 + 10, 11 + 12]}')).toEqual({ a: [1 + 2, 3 + 4, 5 + 6], b: [7 + 8, 9 + 10, 11 + 12] });
  });
});

describe("exprWithContext", () => {
  test("basic", () => {
    expect(exprWithContext("1 + 2 + 3", {})).toBe(1 + 2 + 3);
  });

  test("context", () => {
    const context = {
      x: 1,
      y: "a",
      z: [3, 4],
      p: { q: 1 },
    };
    expect(exprWithContext("x + y + z[0] + p.q", context)).toBe(1 + "a" + 3 + 1);
  });
});
