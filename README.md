# Deno porting of East Asian Width

[![Deno CI](https://github.com/shinshin86/deno_eastasianwidth/actions/workflows/main.yml/badge.svg)](https://github.com/shinshin86/deno_eastasianwidth/actions/workflows/main.yml)

Deno porting of [eastasianwidth](https://github.com/komagata/eastasianwidth)

## Usage

```typescript
import { characterLength, eastAsianWidth, length } from "./mod.ts";

console.log(eastAsianWidth("￦")); // 'F'
console.log(eastAsianWidth("｡")); // 'H'
console.log(eastAsianWidth("뀀")); // 'W'
console.log(eastAsianWidth("a")); // 'Na'
console.log(eastAsianWidth("①")); // 'A'
console.log(eastAsianWidth("ف")); // 'N'

console.log(characterLength("￦")); // 2
console.log(characterLength("｡")); // 1
console.log(characterLength("뀀")); // 2
console.log(characterLength("a")); // 1
console.log(characterLength("①")); // 2
console.log(characterLength("ف")); // 1

console.log(length("あいうえお")); // 10
console.log(length("abcdefg")); // 7
console.log(length("￠￦｡ￜㄅ뀀¢⟭a⊙①بف")); // 19
```

## Test

`--unstable` option needs to be added.

```sh
deno test --unstable
```

## Thank you

The implementation in this repository is a port of the implementation in
[this repository (East Asian Width)](https://github.com/komagata/eastasianwidth)
for Deno.

## Licence

[MIT](https://github.com/shinshin86/deno_eastasianwidth/blob/main/LICENSE)

The Licence is MIT, according to
[the license of the ported code](https://github.com/komagata/eastasianwidth/blob/master/package.json).
