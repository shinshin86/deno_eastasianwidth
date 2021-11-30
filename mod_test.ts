import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { characterLength, eastAsianWidth, length, slice } from "./mod.ts";

Deno.test("eastAsianWidth", async (t) => {
  await t.step("Fullwidth", () => {
    assertEquals("F", eastAsianWidth("￠"));
    assertEquals("F", eastAsianWidth("￦"));
  });

  await t.step("Halfwidth", () => {
    assertEquals("H", eastAsianWidth("｡"));
    assertEquals("H", eastAsianWidth("ￜ"));
  });

  await t.step("Wide", () => {
    assertEquals("W", eastAsianWidth("ㄅ"));
    assertEquals("W", eastAsianWidth("뀀"));
  });

  await t.step("Narrow", () => {
    assertEquals("Na", eastAsianWidth("¢"));
    assertEquals("Na", eastAsianWidth("⟭"));
    assertEquals("Na", eastAsianWidth("a"));
  });

  await t.step("Ambiguous", () => {
    assertEquals("A", eastAsianWidth("⊙"));
    assertEquals("A", eastAsianWidth("①"));
  });

  await t.step("Natural", () => {
    assertEquals("N", eastAsianWidth("ب"));
    assertEquals("N", eastAsianWidth("ف"));
  });
});

Deno.test("characterLength", async (t) => {
  await t.step("Fullwidth", () => {
    assertEquals(2, characterLength("￠"));
    assertEquals(2, characterLength("￦"));
    assertEquals(2, characterLength("𩸽"));
  });

  await t.step("Halfwidth", () => {
    assertEquals(1, characterLength("｡"));
    assertEquals(1, characterLength("ￜ"));
  });

  await t.step("Wide", () => {
    assertEquals(2, characterLength("ㄅ"));
    assertEquals(2, characterLength("뀀"));
  });

  await t.step("Narrow", () => {
    assertEquals(1, characterLength("¢"));
    assertEquals(1, characterLength("⟭"));
    assertEquals(1, characterLength("a"));
  });

  await t.step("Ambiguous", () => {
    assertEquals(2, characterLength("⊙"));
    assertEquals(2, characterLength("①"));
  });

  await t.step("Natural", () => {
    assertEquals(1, characterLength("ب"));
    assertEquals(1, characterLength("ف"));
  });
});

Deno.test("length", async (t) => {
  await t.step("Fullwidth", () => {
    assertEquals(10, length("あいうえお"));
  });

  await t.step("Halfwidth", () => {
    assertEquals(7, length("abcdefg"));
  });

  await t.step("Mixed", () => {
    assertEquals(19, length("￠￦｡ￜㄅ뀀¢⟭a⊙①بف"));
  });

  await t.step("Surrogate-Pair character included", () => {
    assertEquals(4, length("a𩸽b"));
  });
});

Deno.test("slice", async (t) => {
  await t.step("Fullwidth", () => {
    assertEquals(slice("あいうえお", 0, 6), "あいう");
    assertEquals(slice("あいうえお", 2, 8), "いうえ");
    assertEquals(slice("あいうえお", 4, 10), "うえお");
    assertEquals(slice("あいうえお", 2, -2), "いうえ");
    assertEquals(slice("あいうえお", -2, 10), "お");
  });

  await t.step("Fullwidth, start / end is not aligned", () => {
    assertEquals(slice("あいうえお", 0, 1), "");
    assertEquals(slice("あいうえお", 1, 9), "あいうえ");
    assertEquals(slice("あいうえお", 9, 10), "お");
    assertEquals(slice("あいうえお", -1, 10), "お");
    assertEquals(slice("あいうえお", 1, -1), "あいうえ");
  });

  await t.step("Halfwidth", () => {
    assertEquals(slice("abcdefg", 0, 3), "abc");
    assertEquals(slice("abcdefg", 3, 6), "def");
    assertEquals(slice("abcdefg", -2, 7), "fg");
    assertEquals(slice("abcdefg", 5, -1), "f");
  });

  await t.step("Mixed", () => {
    assertEquals(slice("aあb", 0, 3), "aあ");
    assertEquals(slice("aあb", 1, 4), "あb");
  });

  await t.step("Mixed, start / end is not aligned", () => {
    assertEquals(slice("aあb", 0, 2), "a");
    assertEquals(slice("aあb", 2, 4), "あb");
    assertEquals(slice("aあb", -2, 4), "あb");
    assertEquals(slice("aあb", 2, -1), "あ");
    assertEquals(slice("aあb", 0, 2) + slice("aあb", 2, 4), "aあb");
  });

  await t.step("Surrogate-Pair character included", () => {
    assertEquals(slice("a𩸽b", 0, 3), "a𩸽");
    assertEquals(slice("a𩸽b", 1, 4), "𩸽b");
  });

  await t.step(
    "Surrogate-Pair character included, start / end is not aligned",
    () => {
      assertEquals(slice("a𩸽b", 0, 2), "a");
      assertEquals(slice("a𩸽b", 2, 4), "𩸽b");
    },
  );
});
