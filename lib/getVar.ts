export const getVar = (property: string, element: Element) =>
    getComputedStyle(element).getPropertyValue(property);

// idk the specifics, but this basically taps in the css variables right on the global css such as the "--primary" and the like variables to be used in a function and manipulated