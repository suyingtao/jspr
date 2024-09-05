# Jspr

`Jspr` 是一个使用 `jison` 生成的表达式解释器，它能够在 `JavaScript` 环境中运行，支持 `JavaScript` 的基本语法，包括变量名、数字、字符串、数组、对象、括号、一元表达式、二元表达式、三元表达式等

## 功能

- 数据类型：支持数字、字符串、布尔值、数组、对象
- 变量名，在表达式中使用外部传入的变量，通过 `.` 或 `[]` 访问变量属性
- 支持括号，改变运算的优先级
- 一元表达式
    - `-` 取负
    - `!` 逻辑非
- 二元表达式
    - `+` 加法
    - `-` 减法
    - `*` 乘法
    - `/` 除法
    - `^` 幂运算
    - `==` 等于
    - `!=` 不等于
    - `>` 大于
    - `<` 小于
    - `>=` 大于等于
    - `<=` 小于等于
    - `&&` 逻辑与
    - `||` 逻辑或
- 三元表达式
    - `e ? e : e` 三元运算符

## 使用方式

1. `expr` 解析表达式，返回结果

```js
const expr = require('jspr').expr;

const result = expr('1 + 2 * 3');
console.log(result); // 7
```

2. `exprWithContext` 在给定的上下文中，解析表达式，返回结果。当表达式中需要使用外部变量时使用。

```js
const exprWithContext = require('jspr').exprWithContext;

const context = {
    a: 1,
    b: 2,
};
const result = exprWithContext('a + b', context);
console.log(result); // 3
```
