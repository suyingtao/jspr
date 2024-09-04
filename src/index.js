const parser = require('./parser').parser;

exports.expr = function expr(str) {
  return parser.parse(str);
};

exports.exprWithContext = function exprWithContext(str, context) {
  parser.yy = { context };
  const result = parser.parse(str);
  parser.yy = {};
  return result;
};
