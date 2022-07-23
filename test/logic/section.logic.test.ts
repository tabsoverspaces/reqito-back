import { expect } from "chai";
import { SectionLogic } from "../../src/logic/section.logic";
import { PopulatedSection } from "../../src/types/populated/sections.populated";
import { generateTestRequirement } from "./util";
describe("[section/logic] doesItemBelongInSection", () => {
  test("requirement belongs", () => {
    const populatedSection: PopulatedSection = {
      uuid: "section-uuid",
      name: "Test section",
      requirements: [
        generateTestRequirement(1),
        generateTestRequirement(2),
        generateTestRequirement(3),
      ],
    };
    const result = SectionLogic.doesItemBelongInSection(
      populatedSection,
      "requirement-uuid-2"
    );

    expect(result).to.true;
  });

  test("section belongs", () => {});

  test("item does not belong", () => {});
});
