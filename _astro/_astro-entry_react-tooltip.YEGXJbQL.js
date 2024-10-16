import { r as reactExports, e } from './index.CgF3vwW3.js';
import { g as getDefaultExportFromCjs } from './_commonjsHelpers.BFTU3MAI.js';

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$1 = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};

function hasWindow() {
  return typeof window !== 'undefined';
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [':popover-open', ':modal'].some(selector => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

// If <html> has a CSS width greater than the viewport, then this will be
// incorrect for RTL.
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
      // Firefox with layout.scrollbar.side = 3 in about:config to test this.
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  let htmlX = 0;
  let htmlY = 0;
  if (documentElement && !isOffsetParentAnElement && !isFixed) {
    const htmlRect = documentElement.getBoundingClientRect();
    htmlY = htmlRect.top + scroll.scrollTop;
    htmlX = htmlRect.left + scroll.scrollLeft -
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect);
  }
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlX;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlY;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;

  // Firefox returns the <html> element as the offsetParent if it's non-static,
  // while Chrome and Safari return the <body> element. The <body> element must
  // be used to perform the correct calculations even if the <html> element is
  // non-static.
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = offset$1;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = shift$1;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = flip$1;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = arrow$1;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

var classnames = {exports: {}};

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

(function (module) {
	/* global define */

	(function () {

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (arg) {
					classes = appendClass(classes, parseValue(arg));
				}
			}

			return classes;
		}

		function parseValue (arg) {
			if (typeof arg === 'string' || typeof arg === 'number') {
				return arg;
			}

			if (typeof arg !== 'object') {
				return '';
			}

			if (Array.isArray(arg)) {
				return classNames.apply(null, arg);
			}

			if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
				return arg.toString();
			}

			var classes = '';

			for (var key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classes = appendClass(classes, key);
				}
			}

			return classes;
		}

		function appendClass (value, newClass) {
			if (!newClass) {
				return value;
			}
		
			if (value) {
				return value + ' ' + newClass;
			}
		
			return value + newClass;
		}

		if (module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else {
			window.classNames = classNames;
		}
	}()); 
} (classnames));

var classnamesExports = classnames.exports;
const y = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

var define_process_env_default = {};
const h = "react-tooltip-core-styles", w = "react-tooltip-base-styles", b = { core: false, base: false };
function S({ css: e2, id: t2 = w, type: o2 = "base", ref: l2 }) {
  var r2, n2;
  if (!e2 || "undefined" == typeof document || b[o2]) return;
  if ("core" === o2 && "undefined" != typeof process && (null === (r2 = null === process || void 0 === process ? void 0 : define_process_env_default) || void 0 === r2 ? void 0 : r2.REACT_TOOLTIP_DISABLE_CORE_STYLES)) return;
  if ("base" !== o2 && "undefined" != typeof process && (null === (n2 = null === process || void 0 === process ? void 0 : define_process_env_default) || void 0 === n2 ? void 0 : n2.REACT_TOOLTIP_DISABLE_BASE_STYLES)) return;
  "core" === o2 && (t2 = h), l2 || (l2 = {});
  const { insertAt: i2 } = l2;
  if (document.getElementById(t2)) return;
  const c2 = document.head || document.getElementsByTagName("head")[0], s2 = document.createElement("style");
  s2.id = t2, s2.type = "text/css", "top" === i2 && c2.firstChild ? c2.insertBefore(s2, c2.firstChild) : c2.appendChild(s2), s2.styleSheet ? s2.styleSheet.cssText = e2 : s2.appendChild(document.createTextNode(e2)), b[o2] = true;
}
const E = async ({ elementReference: e2 = null, tooltipReference: t2 = null, tooltipArrowReference: o2 = null, place: l2 = "top", offset: r2 = 10, strategy: n2 = "absolute", middlewares: i2 = [offset(Number(r2)), flip({ fallbackAxisSideDirection: "start" }), shift({ padding: 5 })], border: c2 }) => {
  if (!e2) return { tooltipStyles: {}, tooltipArrowStyles: {}, place: l2 };
  if (null === t2) return { tooltipStyles: {}, tooltipArrowStyles: {}, place: l2 };
  const s2 = i2;
  return o2 ? (s2.push(arrow({ element: o2, padding: 5 })), computePosition(e2, t2, { placement: l2, strategy: n2, middleware: s2 }).then(({ x: e3, y: t3, placement: o3, middlewareData: l3 }) => {
    var r3, n3;
    const i3 = { left: `${e3}px`, top: `${t3}px`, border: c2 }, { x: s3, y: a2 } = null !== (r3 = l3.arrow) && void 0 !== r3 ? r3 : { x: 0, y: 0 }, u2 = null !== (n3 = { top: "bottom", right: "left", bottom: "top", left: "right" }[o3.split("-")[0]]) && void 0 !== n3 ? n3 : "bottom", d2 = c2 && { borderBottom: c2, borderRight: c2 };
    let p2 = 0;
    if (c2) {
      const e4 = `${c2}`.match(/(\d+)px/);
      p2 = (null == e4 ? void 0 : e4[1]) ? Number(e4[1]) : 1;
    }
    return { tooltipStyles: i3, tooltipArrowStyles: { left: null != s3 ? `${s3}px` : "", top: null != a2 ? `${a2}px` : "", right: "", bottom: "", ...d2, [u2]: `-${4 + p2}px` }, place: o3 };
  })) : computePosition(e2, t2, { placement: "bottom", strategy: n2, middleware: s2 }).then(({ x: e3, y: t3, placement: o3 }) => ({ tooltipStyles: { left: `${e3}px`, top: `${t3}px` }, tooltipArrowStyles: {}, place: o3 }));
}, A = (e2, t2) => !("CSS" in window && "supports" in window.CSS) || window.CSS.supports(e2, t2), _ = (e2, t2, o2) => {
  let l2 = null;
  const r2 = function(...r3) {
    const n2 = () => {
      l2 = null;
    };
    !l2 && (e2.apply(this, r3), l2 = setTimeout(n2, t2));
  };
  return r2.cancel = () => {
    l2 && (clearTimeout(l2), l2 = null);
  }, r2;
}, O = (e2) => null !== e2 && !Array.isArray(e2) && "object" == typeof e2, k = (e2, t2) => {
  if (e2 === t2) return true;
  if (Array.isArray(e2) && Array.isArray(t2)) return e2.length === t2.length && e2.every((e3, o3) => k(e3, t2[o3]));
  if (Array.isArray(e2) !== Array.isArray(t2)) return false;
  if (!O(e2) || !O(t2)) return e2 === t2;
  const o2 = Object.keys(e2), l2 = Object.keys(t2);
  return o2.length === l2.length && o2.every((o3) => k(e2[o3], t2[o3]));
}, T = (e2) => {
  if (!(e2 instanceof HTMLElement || e2 instanceof SVGElement)) return false;
  const t2 = getComputedStyle(e2);
  return ["overflow", "overflow-x", "overflow-y"].some((e3) => {
    const o2 = t2.getPropertyValue(e3);
    return "auto" === o2 || "scroll" === o2;
  });
}, L = (e2) => {
  if (!e2) return null;
  let t2 = e2.parentElement;
  for (; t2; ) {
    if (T(t2)) return t2;
    t2 = t2.parentElement;
  }
  return document.scrollingElement || document.documentElement;
}, C = "undefined" != typeof window ? reactExports.useLayoutEffect : reactExports.useEffect, R = (e2) => {
  e2.current && (clearTimeout(e2.current), e2.current = null);
}, x = "DEFAULT_TOOLTIP_ID", N = { anchorRefs: /* @__PURE__ */ new Set(), activeAnchor: { current: null }, attach: () => {
}, detach: () => {
}, setActiveAnchor: () => {
} }, $ = reactExports.createContext({ getTooltipData: () => N });
function j(e2 = x) {
  return reactExports.useContext($).getTooltipData(e2);
}
var z = { tooltip: "core-styles-module_tooltip__3vRRp", fixed: "core-styles-module_fixed__pcSol", arrow: "core-styles-module_arrow__cvMwQ", noArrow: "core-styles-module_noArrow__xock6", clickable: "core-styles-module_clickable__ZuTTB", show: "core-styles-module_show__Nt9eE", closing: "core-styles-module_closing__sGnxF" }, D = { tooltip: "styles-module_tooltip__mnnfp", arrow: "styles-module_arrow__K0L3T", dark: "styles-module_dark__xNqje", light: "styles-module_light__Z6W-X", success: "styles-module_success__A2AKt", warning: "styles-module_warning__SCK0X", error: "styles-module_error__JvumD", info: "styles-module_info__BWdHW" };
const q = ({ forwardRef: t2, id: l2, className: i2, classNameArrow: c2, variant: u2 = "dark", anchorId: d2, anchorSelect: p2, place: v2 = "top", offset: m2 = 10, events: h2 = ["hover"], openOnClick: w2 = false, positionStrategy: b2 = "absolute", middlewares: S2, wrapper: g2, delayShow: A2 = 0, delayHide: O2 = 0, float: T2 = false, hidden: x2 = false, noArrow: N2 = false, clickable: $2 = false, closeOnEsc: I2 = false, closeOnScroll: B2 = false, closeOnResize: q2 = false, openEvents: H2, closeEvents: M2, globalCloseEvents: W, imperativeModeOnly: P, style: V, position: F, afterShow: K, afterHide: U, disableTooltip: X, content: Y, contentWrapperRef: G, isOpen: Z, defaultIsOpen: J = false, setIsOpen: Q, activeAnchor: ee, setActiveAnchor: te, border: oe, opacity: le, arrowColor: re, role: ne = "tooltip" }) => {
  var ie;
  const ce = reactExports.useRef(null), se = reactExports.useRef(null), ae = reactExports.useRef(null), ue = reactExports.useRef(null), de = reactExports.useRef(null), [pe, ve] = reactExports.useState({ tooltipStyles: {}, tooltipArrowStyles: {}, place: v2 }), [me, fe] = reactExports.useState(false), [ye, he] = reactExports.useState(false), [we, be] = reactExports.useState(null), Se = reactExports.useRef(false), ge = reactExports.useRef(null), { anchorRefs: Ee, setActiveAnchor: Ae } = j(l2), _e = reactExports.useRef(false), [Oe, ke] = reactExports.useState([]), Te = reactExports.useRef(false), Le = w2 || h2.includes("click"), Ce = Le || (null == H2 ? void 0 : H2.click) || (null == H2 ? void 0 : H2.dblclick) || (null == H2 ? void 0 : H2.mousedown), Re = H2 ? { ...H2 } : { mouseover: true, focus: true, mouseenter: false, click: false, dblclick: false, mousedown: false };
  !H2 && Le && Object.assign(Re, { mouseenter: false, focus: false, mouseover: false, click: true });
  const xe = M2 ? { ...M2 } : { mouseout: true, blur: true, mouseleave: false, click: false, dblclick: false, mouseup: false };
  !M2 && Le && Object.assign(xe, { mouseleave: false, blur: false, mouseout: false });
  const Ne = W ? { ...W } : { escape: I2 || false, scroll: B2 || false, resize: q2 || false, clickOutsideAnchor: Ce || false };
  P && (Object.assign(Re, { mouseenter: false, focus: false, click: false, dblclick: false, mousedown: false }), Object.assign(xe, { mouseleave: false, blur: false, click: false, dblclick: false, mouseup: false }), Object.assign(Ne, { escape: false, scroll: false, resize: false, clickOutsideAnchor: false })), C(() => (Te.current = true, () => {
    Te.current = false;
  }), []);
  const $e = (e2) => {
    Te.current && (e2 && he(true), setTimeout(() => {
      Te.current && (null == Q || Q(e2), void 0 === Z && fe(e2));
    }, 10));
  };
  reactExports.useEffect(() => {
    if (void 0 === Z) return () => null;
    Z && he(true);
    const e2 = setTimeout(() => {
      fe(Z);
    }, 10);
    return () => {
      clearTimeout(e2);
    };
  }, [Z]), reactExports.useEffect(() => {
    if (me !== Se.current) if (R(de), Se.current = me, me) null == K || K();
    else {
      const e2 = ((e3) => {
        const t3 = e3.match(/^([\d.]+)(ms|s)$/);
        if (!t3) return 0;
        const [, o2, l3] = t3;
        return Number(o2) * ("ms" === l3 ? 1 : 1e3);
      })(getComputedStyle(document.body).getPropertyValue("--rt-transition-show-delay"));
      de.current = setTimeout(() => {
        he(false), be(null), null == U || U();
      }, e2 + 25);
    }
  }, [me]);
  const Ie = (e2) => {
    ve((t3) => k(t3, e2) ? t3 : e2);
  }, je = (e2 = A2) => {
    R(ae), ye ? $e(true) : ae.current = setTimeout(() => {
      $e(true);
    }, e2);
  }, Be = (e2 = O2) => {
    R(ue), ue.current = setTimeout(() => {
      _e.current || $e(false);
    }, e2);
  }, ze = (e2) => {
    var t3;
    if (!e2) return;
    const o2 = null !== (t3 = e2.currentTarget) && void 0 !== t3 ? t3 : e2.target;
    if (!(null == o2 ? void 0 : o2.isConnected)) return te(null), void Ae({ current: null });
    A2 ? je() : $e(true), te(o2), Ae({ current: o2 }), R(ue);
  }, De = () => {
    $2 ? Be(O2 || 100) : O2 ? Be() : $e(false), R(ae);
  }, qe = ({ x: e2, y: t3 }) => {
    var o2;
    const l3 = { getBoundingClientRect: () => ({ x: e2, y: t3, width: 0, height: 0, top: t3, left: e2, right: e2, bottom: t3 }) };
    E({ place: null !== (o2 = null == we ? void 0 : we.place) && void 0 !== o2 ? o2 : v2, offset: m2, elementReference: l3, tooltipReference: ce.current, tooltipArrowReference: se.current, strategy: b2, middlewares: S2, border: oe }).then((e3) => {
      Ie(e3);
    });
  }, He = (e2) => {
    if (!e2) return;
    const t3 = e2, o2 = { x: t3.clientX, y: t3.clientY };
    qe(o2), ge.current = o2;
  }, Me = (e2) => {
    var t3;
    if (!me) return;
    const o2 = e2.target;
    if (!o2.isConnected) return;
    if (null === (t3 = ce.current) || void 0 === t3 ? void 0 : t3.contains(o2)) return;
    [document.querySelector(`[id='${d2}']`), ...Oe].some((e3) => null == e3 ? void 0 : e3.contains(o2)) || ($e(false), R(ae));
  }, We = _(ze, 50), Pe = _(De, 50), Ve = (e2) => {
    Pe.cancel(), We(e2);
  }, Fe = () => {
    We.cancel(), Pe();
  }, Ke = reactExports.useCallback(() => {
    var e2, t3;
    const o2 = null !== (e2 = null == we ? void 0 : we.position) && void 0 !== e2 ? e2 : F;
    o2 ? qe(o2) : T2 ? ge.current && qe(ge.current) : (null == ee ? void 0 : ee.isConnected) && E({ place: null !== (t3 = null == we ? void 0 : we.place) && void 0 !== t3 ? t3 : v2, offset: m2, elementReference: ee, tooltipReference: ce.current, tooltipArrowReference: se.current, strategy: b2, middlewares: S2, border: oe }).then((e3) => {
      Te.current && Ie(e3);
    });
  }, [me, ee, Y, V, v2, null == we ? void 0 : we.place, m2, b2, F, null == we ? void 0 : we.position, T2]);
  reactExports.useEffect(() => {
    var e2, t3;
    const o2 = new Set(Ee);
    Oe.forEach((e3) => {
      (null == X ? void 0 : X(e3)) || o2.add({ current: e3 });
    });
    const l3 = document.querySelector(`[id='${d2}']`);
    l3 && !(null == X ? void 0 : X(l3)) && o2.add({ current: l3 });
    const r2 = () => {
      $e(false);
    }, n2 = L(ee), i3 = L(ce.current);
    Ne.scroll && (window.addEventListener("scroll", r2), null == n2 || n2.addEventListener("scroll", r2), null == i3 || i3.addEventListener("scroll", r2));
    let c3 = null;
    Ne.resize ? window.addEventListener("resize", r2) : ee && ce.current && (c3 = autoUpdate(ee, ce.current, Ke, { ancestorResize: true, elementResize: true, layoutShift: true }));
    const s2 = (e3) => {
      "Escape" === e3.key && $e(false);
    };
    Ne.escape && window.addEventListener("keydown", s2), Ne.clickOutsideAnchor && window.addEventListener("click", Me);
    const a2 = [], u3 = (e3) => {
      me && (null == e3 ? void 0 : e3.target) === ee || ze(e3);
    }, p3 = (e3) => {
      me && (null == e3 ? void 0 : e3.target) === ee && De();
    }, v3 = ["mouseover", "mouseout", "mouseenter", "mouseleave", "focus", "blur"], m3 = ["click", "dblclick", "mousedown", "mouseup"];
    Object.entries(Re).forEach(([e3, t4]) => {
      t4 && (v3.includes(e3) ? a2.push({ event: e3, listener: Ve }) : m3.includes(e3) && a2.push({ event: e3, listener: u3 }));
    }), Object.entries(xe).forEach(([e3, t4]) => {
      t4 && (v3.includes(e3) ? a2.push({ event: e3, listener: Fe }) : m3.includes(e3) && a2.push({ event: e3, listener: p3 }));
    }), T2 && a2.push({ event: "pointermove", listener: He });
    const y2 = () => {
      _e.current = true;
    }, h3 = () => {
      _e.current = false, De();
    };
    return $2 && !Ce && (null === (e2 = ce.current) || void 0 === e2 || e2.addEventListener("mouseenter", y2), null === (t3 = ce.current) || void 0 === t3 || t3.addEventListener("mouseleave", h3)), a2.forEach(({ event: e3, listener: t4 }) => {
      o2.forEach((o3) => {
        var l4;
        null === (l4 = o3.current) || void 0 === l4 || l4.addEventListener(e3, t4);
      });
    }), () => {
      var e3, t4;
      Ne.scroll && (window.removeEventListener("scroll", r2), null == n2 || n2.removeEventListener("scroll", r2), null == i3 || i3.removeEventListener("scroll", r2)), Ne.resize ? window.removeEventListener("resize", r2) : null == c3 || c3(), Ne.clickOutsideAnchor && window.removeEventListener("click", Me), Ne.escape && window.removeEventListener("keydown", s2), $2 && !Ce && (null === (e3 = ce.current) || void 0 === e3 || e3.removeEventListener("mouseenter", y2), null === (t4 = ce.current) || void 0 === t4 || t4.removeEventListener("mouseleave", h3)), a2.forEach(({ event: e4, listener: t5 }) => {
        o2.forEach((o3) => {
          var l4;
          null === (l4 = o3.current) || void 0 === l4 || l4.removeEventListener(e4, t5);
        });
      });
    };
  }, [ee, Ke, ye, Ee, Oe, H2, M2, W, Le, A2, O2]), reactExports.useEffect(() => {
    var e2, t3;
    let o2 = null !== (t3 = null !== (e2 = null == we ? void 0 : we.anchorSelect) && void 0 !== e2 ? e2 : p2) && void 0 !== t3 ? t3 : "";
    !o2 && l2 && (o2 = `[data-tooltip-id='${l2.replace(/'/g, "\\'")}']`);
    const r2 = new MutationObserver((e3) => {
      const t4 = [], r3 = [];
      e3.forEach((e4) => {
        if ("attributes" === e4.type && "data-tooltip-id" === e4.attributeName) {
          e4.target.getAttribute("data-tooltip-id") === l2 ? t4.push(e4.target) : e4.oldValue === l2 && r3.push(e4.target);
        }
        if ("childList" === e4.type) {
          if (ee) {
            const t5 = [...e4.removedNodes].filter((e5) => 1 === e5.nodeType);
            if (o2) try {
              r3.push(...t5.filter((e5) => e5.matches(o2))), r3.push(...t5.flatMap((e5) => [...e5.querySelectorAll(o2)]));
            } catch (e5) {
            }
            t5.some((e5) => {
              var t6;
              return !!(null === (t6 = null == e5 ? void 0 : e5.contains) || void 0 === t6 ? void 0 : t6.call(e5, ee)) && (he(false), $e(false), te(null), R(ae), R(ue), true);
            });
          }
          if (o2) try {
            const l3 = [...e4.addedNodes].filter((e5) => 1 === e5.nodeType);
            t4.push(...l3.filter((e5) => e5.matches(o2))), t4.push(...l3.flatMap((e5) => [...e5.querySelectorAll(o2)]));
          } catch (e5) {
          }
        }
      }), (t4.length || r3.length) && ke((e4) => [...e4.filter((e5) => !r3.includes(e5)), ...t4]);
    });
    return r2.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-tooltip-id"], attributeOldValue: true }), () => {
      r2.disconnect();
    };
  }, [l2, p2, null == we ? void 0 : we.anchorSelect, ee]), reactExports.useEffect(() => {
    Ke();
  }, [Ke]), reactExports.useEffect(() => {
    if (!(null == G ? void 0 : G.current)) return () => null;
    const e2 = new ResizeObserver(() => {
      setTimeout(() => Ke());
    });
    return e2.observe(G.current), () => {
      e2.disconnect();
    };
  }, [Y, null == G ? void 0 : G.current]), reactExports.useEffect(() => {
    var e2;
    const t3 = document.querySelector(`[id='${d2}']`), o2 = [...Oe, t3];
    ee && o2.includes(ee) || te(null !== (e2 = Oe[0]) && void 0 !== e2 ? e2 : t3);
  }, [d2, Oe, ee]), reactExports.useEffect(() => (J && $e(true), () => {
    R(ae), R(ue);
  }), []), reactExports.useEffect(() => {
    var e2;
    let t3 = null !== (e2 = null == we ? void 0 : we.anchorSelect) && void 0 !== e2 ? e2 : p2;
    if (!t3 && l2 && (t3 = `[data-tooltip-id='${l2.replace(/'/g, "\\'")}']`), t3) try {
      const e3 = Array.from(document.querySelectorAll(t3));
      ke(e3);
    } catch (e3) {
      ke([]);
    }
  }, [l2, p2, null == we ? void 0 : we.anchorSelect]), reactExports.useEffect(() => {
    ae.current && (R(ae), je(A2));
  }, [A2]);
  const Ue = null !== (ie = null == we ? void 0 : we.content) && void 0 !== ie ? ie : Y, Xe = me && Object.keys(pe.tooltipStyles).length > 0;
  return reactExports.useImperativeHandle(t2, () => ({ open: (e2) => {
    if (null == e2 ? void 0 : e2.anchorSelect) try {
      document.querySelector(e2.anchorSelect);
    } catch (t3) {
      return void console.warn(`[react-tooltip] "${e2.anchorSelect}" is not a valid CSS selector`);
    }
    be(null != e2 ? e2 : null), (null == e2 ? void 0 : e2.delay) ? je(e2.delay) : $e(true);
  }, close: (e2) => {
    (null == e2 ? void 0 : e2.delay) ? Be(e2.delay) : $e(false);
  }, activeAnchor: ee, place: pe.place, isOpen: Boolean(ye && !x2 && Ue && Xe) })), ye && !x2 && Ue ? e.createElement(g2, { id: l2, role: ne, className: y("react-tooltip", z.tooltip, D.tooltip, D[u2], i2, `react-tooltip__place-${pe.place}`, z[Xe ? "show" : "closing"], Xe ? "react-tooltip__show" : "react-tooltip__closing", "fixed" === b2 && z.fixed, $2 && z.clickable), onTransitionEnd: (e2) => {
    R(de), me || "opacity" !== e2.propertyName || (he(false), be(null), null == U || U());
  }, style: { ...V, ...pe.tooltipStyles, opacity: void 0 !== le && Xe ? le : void 0 }, ref: ce }, Ue, e.createElement(g2, { className: y("react-tooltip-arrow", z.arrow, D.arrow, c2, N2 && z.noArrow), style: { ...pe.tooltipArrowStyles, background: re ? `linear-gradient(to right bottom, transparent 50%, ${re} 50%)` : void 0 }, ref: se })) : null;
}, H = ({ content: t2 }) => e.createElement("span", { dangerouslySetInnerHTML: { __html: t2 } }), M = e.forwardRef(({ id: t2, anchorId: l2, anchorSelect: n2, content: i2, html: c2, render: a2, className: u2, classNameArrow: d2, variant: p2 = "dark", place: v2 = "top", offset: m2 = 10, wrapper: f2 = "div", children: h2 = null, events: w2 = ["hover"], openOnClick: b2 = false, positionStrategy: S2 = "absolute", middlewares: g2, delayShow: E2 = 0, delayHide: _2 = 0, float: O2 = false, hidden: k2 = false, noArrow: T2 = false, clickable: L2 = false, closeOnEsc: C2 = false, closeOnScroll: R2 = false, closeOnResize: x2 = false, openEvents: N2, closeEvents: $2, globalCloseEvents: I2, imperativeModeOnly: B2 = false, style: z2, position: D2, isOpen: M2, defaultIsOpen: W = false, disableStyleInjection: P = false, border: V, opacity: F, arrowColor: K, setIsOpen: U, afterShow: X, afterHide: Y, disableTooltip: G, role: Z = "tooltip" }, J) => {
  const [Q, ee] = reactExports.useState(i2), [te, oe] = reactExports.useState(c2), [le, re] = reactExports.useState(v2), [ne, ie] = reactExports.useState(p2), [ce, se] = reactExports.useState(m2), [ae, ue] = reactExports.useState(E2), [de, pe] = reactExports.useState(_2), [ve, me] = reactExports.useState(O2), [fe, ye] = reactExports.useState(k2), [he, we] = reactExports.useState(f2), [be, Se] = reactExports.useState(w2), [ge, Ee] = reactExports.useState(S2), [Ae, _e] = reactExports.useState(null), [Oe, ke] = reactExports.useState(null), Te = reactExports.useRef(P), { anchorRefs: Le, activeAnchor: Ce } = j(t2), Re = (e2) => null == e2 ? void 0 : e2.getAttributeNames().reduce((t3, o2) => {
    var l3;
    if (o2.startsWith("data-tooltip-")) {
      t3[o2.replace(/^data-tooltip-/, "")] = null !== (l3 = null == e2 ? void 0 : e2.getAttribute(o2)) && void 0 !== l3 ? l3 : null;
    }
    return t3;
  }, {}), xe = (e2) => {
    const t3 = { place: (e3) => {
      var t4;
      re(null !== (t4 = e3) && void 0 !== t4 ? t4 : v2);
    }, content: (e3) => {
      ee(null != e3 ? e3 : i2);
    }, html: (e3) => {
      oe(null != e3 ? e3 : c2);
    }, variant: (e3) => {
      var t4;
      ie(null !== (t4 = e3) && void 0 !== t4 ? t4 : p2);
    }, offset: (e3) => {
      se(null === e3 ? m2 : Number(e3));
    }, wrapper: (e3) => {
      var t4;
      we(null !== (t4 = e3) && void 0 !== t4 ? t4 : f2);
    }, events: (e3) => {
      const t4 = null == e3 ? void 0 : e3.split(" ");
      Se(null != t4 ? t4 : w2);
    }, "position-strategy": (e3) => {
      var t4;
      Ee(null !== (t4 = e3) && void 0 !== t4 ? t4 : S2);
    }, "delay-show": (e3) => {
      ue(null === e3 ? E2 : Number(e3));
    }, "delay-hide": (e3) => {
      pe(null === e3 ? _2 : Number(e3));
    }, float: (e3) => {
      me(null === e3 ? O2 : "true" === e3);
    }, hidden: (e3) => {
      ye(null === e3 ? k2 : "true" === e3);
    }, "class-name": (e3) => {
      _e(e3);
    } };
    Object.values(t3).forEach((e3) => e3(null)), Object.entries(e2).forEach(([e3, o2]) => {
      var l3;
      null === (l3 = t3[e3]) || void 0 === l3 || l3.call(t3, o2);
    });
  };
  reactExports.useEffect(() => {
    ee(i2);
  }, [i2]), reactExports.useEffect(() => {
    oe(c2);
  }, [c2]), reactExports.useEffect(() => {
    re(v2);
  }, [v2]), reactExports.useEffect(() => {
    ie(p2);
  }, [p2]), reactExports.useEffect(() => {
    se(m2);
  }, [m2]), reactExports.useEffect(() => {
    ue(E2);
  }, [E2]), reactExports.useEffect(() => {
    pe(_2);
  }, [_2]), reactExports.useEffect(() => {
    me(O2);
  }, [O2]), reactExports.useEffect(() => {
    ye(k2);
  }, [k2]), reactExports.useEffect(() => {
    Ee(S2);
  }, [S2]), reactExports.useEffect(() => {
    Te.current !== P && console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.");
  }, [P]), reactExports.useEffect(() => {
    "undefined" != typeof window && window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles", { detail: { disableCore: "core" === P, disableBase: P } }));
  }, []), reactExports.useEffect(() => {
    var e2;
    const o2 = new Set(Le);
    let r2 = n2;
    if (!r2 && t2 && (r2 = `[data-tooltip-id='${t2.replace(/'/g, "\\'")}']`), r2) try {
      document.querySelectorAll(r2).forEach((e3) => {
        o2.add({ current: e3 });
      });
    } catch (e3) {
      console.warn(`[react-tooltip] "${r2}" is not a valid CSS selector`);
    }
    const i3 = document.querySelector(`[id='${l2}']`);
    if (i3 && o2.add({ current: i3 }), !o2.size) return () => null;
    const c3 = null !== (e2 = null != Oe ? Oe : i3) && void 0 !== e2 ? e2 : Ce.current, s2 = new MutationObserver((e3) => {
      e3.forEach((e4) => {
        var t3;
        if (!c3 || "attributes" !== e4.type || !(null === (t3 = e4.attributeName) || void 0 === t3 ? void 0 : t3.startsWith("data-tooltip-"))) return;
        const o3 = Re(c3);
        xe(o3);
      });
    }), a3 = { attributes: true, childList: false, subtree: false };
    if (c3) {
      const e3 = Re(c3);
      xe(e3), s2.observe(c3, a3);
    }
    return () => {
      s2.disconnect();
    };
  }, [Le, Ce, Oe, l2, n2]), reactExports.useEffect(() => {
    (null == z2 ? void 0 : z2.border) && console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."), V && !A("border", `${V}`) && console.warn(`[react-tooltip] "${V}" is not a valid \`border\`.`), (null == z2 ? void 0 : z2.opacity) && console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."), F && !A("opacity", `${F}`) && console.warn(`[react-tooltip] "${F}" is not a valid \`opacity\`.`);
  }, []);
  let Ne = h2;
  const $e = reactExports.useRef(null);
  if (a2) {
    const t3 = a2({ content: (null == Oe ? void 0 : Oe.getAttribute("data-tooltip-content")) || Q || null, activeAnchor: Oe });
    Ne = t3 ? e.createElement("div", { ref: $e, className: "react-tooltip-content-wrapper" }, t3) : null;
  } else Q && (Ne = Q);
  te && (Ne = e.createElement(H, { content: te }));
  const Ie = { forwardRef: J, id: t2, anchorId: l2, anchorSelect: n2, className: y(u2, Ae), classNameArrow: d2, content: Ne, contentWrapperRef: $e, place: le, variant: ne, offset: ce, wrapper: he, events: be, openOnClick: b2, positionStrategy: ge, middlewares: g2, delayShow: ae, delayHide: de, float: ve, hidden: fe, noArrow: T2, clickable: L2, closeOnEsc: C2, closeOnScroll: R2, closeOnResize: x2, openEvents: N2, closeEvents: $2, globalCloseEvents: I2, imperativeModeOnly: B2, style: z2, position: D2, isOpen: M2, defaultIsOpen: W, border: V, opacity: F, arrowColor: K, setIsOpen: U, afterShow: X, afterHide: Y, disableTooltip: G, activeAnchor: Oe, setActiveAnchor: (e2) => ke(e2), role: Z };
  return e.createElement(q, { ...Ie });
});
"undefined" != typeof window && window.addEventListener("react-tooltip-inject-styles", (e2) => {
  e2.detail.disableCore || S({ css: `:root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in}`, type: "core" }), e2.detail.disableBase || S({ css: `
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`, type: "base" });
});

export { M as Tooltip };
