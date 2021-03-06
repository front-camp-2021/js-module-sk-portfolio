import { splitAndMerge } from "./index.js";

describe("splitAndMerge", () => {
  it("should satisfy the following conditions", () => {
    const result1 = splitAndMerge("Hello World!", ",");
    expect(result1).toEqual("H,e,l,l,o W,o,r,l,d,!");


    const result2 = splitAndMerge("Hello World!", "_");
    expect(result2).toEqual("H_e_l_l_o W_o_r_l_d_!");

    const result3 = splitAndMerge(" ", ".");
    expect(result3).toEqual(" ");

  });
});
