%lex
%%

\s+                   /* skip whitespace */
[0-9]+(\.[0-9]+)?\b   return 'NUMBER'
\"[^\"]*\"            return 'STRING'
true|false            return 'BOOLEAN'
[a-zA-Z_][a-zA-Z0-9_]*\b return 'IDENTIFIER'
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'
":"                   return ':'
","                   return ','
"("                   return '('
")"                   return ')'
"+"                   return '+'
"-"                   return '-'
"*"                   return '*'
"/"                   return '/'
"^"                   return '^'
"?"                   return '?'
"!="                  return '!='
"!"                   return '!'
"&&"                  return '&&'
"||"                  return '||'
"=="                  return '=='
">="                  return '>='
"<="                  return '<='
">"                   return '>'
"<"                   return '<'
"."                   return '.'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */
%left '||'
%left '&&'
%left '=='
%left '!='
%left '>='
%left '<='
%left '>'
%left '<'
%left '+'
%left '-'
%left '*'
%left '/'
%left '^'
%right '!'

%start expressions

%token NUMBER STRING BOOLEAN IDENTIFIER

%%

expressions
    : e EOF
        { return $1; }
    ;

e
    : e '+' e
        { $$ = $1 + $3; }
    | e '-' e
        { $$ = $1 - $3; }
    | e '*' e
        { $$ = $1 * $3; }
    | e '/' e
        { $$ = $1 / $3; }
    | e '^' e
        { $$ = Math.pow($1, $3); }
    | e '&&' e
        { $$ = $1 && $3; }
    | e '||' e
        { $$ = $1 || $3; }
    | e '==' e
        { $$ = $1 == $3; }
    | e '!=' e
        { $$ = $1 != $3; }
    | e '>=' e
        { $$ = $1 >= $3; }
    | e '<=' e
        { $$ = $1 <= $3; }
    | e '>' e
        { $$ = $1 > $3; }
    | e '<' e
        { $$ = $1 < $3; }
    | e '?' e ':' e
        { $$ = $1 ? $3 : $5; }
    | '!' e
        { $$ = !$2; }
    | '-' e
        { $$ = -$2; }
    | '(' e ')'
        { $$ = $2; }
    | NUMBER
        { $$ = Number(yytext); }
    | STRING
        { $$ = yytext.slice(1, -1); }
    | BOOLEAN
        { $$ = yytext === 'true'; }
    | IDENTIFIER
        { 
            if (typeof yy.context[yytext] !== 'undefined') {
                $$ = yy.context[yytext];
            } else {
                throw new Error("Undefined variable: " + yytext);
            }
        }
    | e '[' e ']'
        { $$ = $1[$3]; }
    | e '.' IDENTIFIER
        { $$ = $1[$3]; }
    | array
        { $$ = $1; }
    | object
        { $$ = $1; }
    ;

array
    : '[' ']'
        { $$ = []; }
    | '[' elements ']'
        { $$ = $2; }
    ;

elements
    : e
        { $$ = [$1]; }
    | elements ',' e
        { $1.push($3); $$ = $1; }
    ;

object
    : '{' '}'
        { $$ = {}; }
    | '{' properties '}'
        { $$ = $2; }
    ;

properties
    : property
        { $$ = { [$1.key]: $1.value }; }
    | properties ',' property
        { $$ = Object.assign($1, { [$3.key]: $3.value }); }
    ;

property
    : STRING ':' e
        { $$ = { key: $1.slice(1, -1), value: $3 }; }
    ;

%%