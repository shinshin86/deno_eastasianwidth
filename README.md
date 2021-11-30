# deno_eastasianwidth

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
