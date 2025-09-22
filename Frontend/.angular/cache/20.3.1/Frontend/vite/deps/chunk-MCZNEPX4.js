import {
  ElementRef
} from "./chunk-6HKYVDNX.js";
import {
  __name
} from "./chunk-TJFVSI2U.js";

// node_modules/@angular/cdk/fesm2022/element.mjs
function coerceNumberProperty(value, fallbackValue = 0) {
  if (_isNumberValue(value)) {
    return Number(value);
  }
  return arguments.length === 2 ? fallbackValue : 0;
}
__name(coerceNumberProperty, "coerceNumberProperty");
function _isNumberValue(value) {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
__name(_isNumberValue, "_isNumberValue");
function coerceElement(elementOrRef) {
  return elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
}
__name(coerceElement, "coerceElement");

export {
  coerceNumberProperty,
  coerceElement
};
//# sourceMappingURL=chunk-MCZNEPX4.js.map
