import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatTooltip,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError
} from "./chunk-RC7BLF6O.js";
import "./chunk-LQ3HTPPL.js";
import {
  OverlayModule
} from "./chunk-6ETC2A3A.js";
import {
  CdkScrollableModule
} from "./chunk-KNVU7642.js";
import "./chunk-OWPPALEO.js";
import "./chunk-NTIR4DS6.js";
import "./chunk-HCTYHZCC.js";
import "./chunk-N2CWYRF2.js";
import "./chunk-FW4XYMFG.js";
import {
  A11yModule,
  MatCommonModule
} from "./chunk-TF57TWYE.js";
import "./chunk-HN4UT24C.js";
import "./chunk-MCZNEPX4.js";
import "./chunk-SRYDCNEC.js";
import "./chunk-OFS4APLE.js";
import "./chunk-HEXI4VYK.js";
import "./chunk-ZKC5FI5I.js";
import "./chunk-MNDS4BZZ.js";
import "./chunk-GADQX22H.js";
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

// node_modules/@angular/material/fesm2022/tooltip-module.mjs
var _MatTooltipModule = class _MatTooltipModule {
};
__name(_MatTooltipModule, "MatTooltipModule");
__publicField(_MatTooltipModule, "ɵfac", /* @__PURE__ */ __name(function MatTooltipModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MatTooltipModule)();
}, "MatTooltipModule_Factory"));
__publicField(_MatTooltipModule, "ɵmod", ɵɵdefineNgModule({
  type: _MatTooltipModule,
  imports: [A11yModule, OverlayModule, MatCommonModule, MatTooltip, TooltipComponent],
  exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule]
}));
__publicField(_MatTooltipModule, "ɵinj", ɵɵdefineInjector({
  providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
  imports: [A11yModule, OverlayModule, MatCommonModule, MatCommonModule, CdkScrollableModule]
}));
var MatTooltipModule = _MatTooltipModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [A11yModule, OverlayModule, MatCommonModule, MatTooltip, TooltipComponent],
      exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule],
      providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/tooltip.mjs
var matTooltipAnimations = {
  // Represents:
  // trigger('state', [
  //   state('initial, void, hidden', style({opacity: 0, transform: 'scale(0.8)'})),
  //   state('visible', style({transform: 'scale(1)'})),
  //   transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
  //   transition('* => hidden', animate('75ms cubic-bezier(0.4, 0, 1, 1)')),
  // ])
  /** Animation that transitions a tooltip in and out. */
  tooltipState: {
    type: 7,
    name: "state",
    definitions: [
      {
        type: 0,
        name: "initial, void, hidden",
        styles: { type: 6, styles: { opacity: 0, transform: "scale(0.8)" }, offset: null }
      },
      {
        type: 0,
        name: "visible",
        styles: { type: 6, styles: { transform: "scale(1)" }, offset: null }
      },
      {
        type: 1,
        expr: "* => visible",
        animation: { type: 4, styles: null, timings: "150ms cubic-bezier(0, 0, 0.2, 1)" },
        options: null
      },
      {
        type: 1,
        expr: "* => hidden",
        animation: { type: 4, styles: null, timings: "75ms cubic-bezier(0.4, 0, 1, 1)" },
        options: null
      }
    ],
    options: {}
  }
};
export {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatTooltip,
  MatTooltipModule,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError,
  matTooltipAnimations
};
//# sourceMappingURL=@angular_material_tooltip.js.map
