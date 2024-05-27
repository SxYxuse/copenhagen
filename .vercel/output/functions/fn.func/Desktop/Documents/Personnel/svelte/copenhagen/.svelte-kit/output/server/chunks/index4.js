import { k as rest_props, v as value_or_fallback, f as ensure_array_like, j as spread_attributes, l as element, m as slot, d as bind_props, c as pop, n as sanitize_props, p as push, o as spread_props } from "./index3.js";
import { a as default_slot } from "./Toaster.svelte_svelte_type_style_lang.js";
/**
 * @license lucide-svelte v0.377.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "mergeClasses",
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  push();
  let name = value_or_fallback($$props["name"], () => void 0);
  let color = value_or_fallback($$props["color"], () => "currentColor");
  let size = value_or_fallback($$props["size"], () => 24);
  let strokeWidth = value_or_fallback($$props["strokeWidth"], () => 2);
  let absoluteStrokeWidth = value_or_fallback($$props["absoluteStrokeWidth"], () => false);
  let iconNode = $$props["iconNode"];
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...$$restProps,
      width: size,
      height: size,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      class: mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class)
    },
    void 0,
    void 0,
    3
  )}><!--[-->`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const $$item = each_array[$$index];
    const [tag, attrs] = $$item;
    $$payload.out += "<!--[-->";
    $$payload.out += `<!--[-->`;
    if (tag)
      element(
        $$payload,
        tag,
        () => {
          $$payload.out += `${spread_attributes({ ...attrs }, void 0, void 0, 3)}`;
        },
        () => {
        }
      );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  }
  $$payload.out += "<!--]-->";
  $$payload.out += `<!--[-->`;
  slot($$payload, default_slot($$props), {}, null);
  $$payload.out += `<!--]--></svg>`;
  bind_props($$props, {
    name,
    color,
    size,
    strokeWidth,
    absoluteStrokeWidth,
    iconNode,
    mergeClasses
  });
  pop();
}
function Sun($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "4" }
    ],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "m4.93 4.93 1.41 1.41" }],
    ["path", { "d": "m17.66 17.66 1.41 1.41" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "M20 12h2" }],
    ["path", { "d": "m6.34 17.66-1.41 1.41" }],
    ["path", { "d": "m19.07 4.93-1.41 1.41" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { name: "sun" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, default_slot($$props), {}, null);
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!--]-->`;
  pop();
}
function Moon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "path",
      { "d": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { name: "moon" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, default_slot($$props), {}, null);
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!--]-->`;
  pop();
}
function Copy($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "rect",
      {
        "width": "14",
        "height": "14",
        "x": "8",
        "y": "8",
        "rx": "2",
        "ry": "2"
      }
    ],
    [
      "path",
      {
        "d": "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { name: "copy" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, default_slot($$props), {}, null);
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!--]-->`;
  pop();
}
function Check($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { name: "check" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, default_slot($$props), {}, null);
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!--]-->`;
  pop();
}
function Menu($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      { "x1": "4", "x2": "20", "y1": "6", "y2": "6" }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "18",
        "y2": "18"
      }
    ]
  ];
  $$payload.out += `<!--[-->`;
  Icon($$payload, spread_props([
    { name: "menu" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, default_slot($$props), {}, null);
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!--]-->`;
  pop();
}
const Icons = {
  Sun,
  Moon,
  Copy,
  Check,
  Menu
};
export {
  Icon as I,
  Icons as a
};
