export function generateTestRequirement(index: number) {
  return {
    uuid: `requirement-uuid-${index}`,
    name: `requirement-name-${index}`,
    actor: `actor-uuid-${index}`,
    modal: `test-modal-${index}`,
    wording: `test-wording-${index}`,
  };
}
