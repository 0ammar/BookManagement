import {
  NgModule,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-6HKYVDNX.js";
import {
  __name,
  __publicField
} from "./chunk-TJFVSI2U.js";

// node_modules/@angular/cdk/fesm2022/layout.mjs
var _LayoutModule = class _LayoutModule {
};
__name(_LayoutModule, "LayoutModule");
__publicField(_LayoutModule, "ɵfac", /* @__PURE__ */ __name(function LayoutModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LayoutModule)();
}, "LayoutModule_Factory"));
__publicField(_LayoutModule, "ɵmod", ɵɵdefineNgModule({
  type: _LayoutModule
}));
__publicField(_LayoutModule, "ɵinj", ɵɵdefineInjector({}));
var LayoutModule = _LayoutModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();
var Breakpoints = {
  XSmall: "(max-width: 599.98px)",
  Small: "(min-width: 600px) and (max-width: 959.98px)",
  Medium: "(min-width: 960px) and (max-width: 1279.98px)",
  Large: "(min-width: 1280px) and (max-width: 1919.98px)",
  XLarge: "(min-width: 1920px)",
  Handset: "(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",
  Tablet: "(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",
  Web: "(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",
  HandsetPortrait: "(max-width: 599.98px) and (orientation: portrait)",
  TabletPortrait: "(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",
  WebPortrait: "(min-width: 840px) and (orientation: portrait)",
  HandsetLandscape: "(max-width: 959.98px) and (orientation: landscape)",
  TabletLandscape: "(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",
  WebLandscape: "(min-width: 1280px) and (orientation: landscape)"
};

export {
  LayoutModule,
  Breakpoints
};
//# sourceMappingURL=chunk-SRYDCNEC.js.map
