import { v as value_or_fallback, h as head, d as bind_props, c as pop, e as attr, p as push, f as ensure_array_like, g as escape_html, i as store_get, u as unsubscribe_stores, j as spread_attributes, k as rest_props, l as element, m as slot, n as sanitize_props, o as spread_props, q as copy_payload, t as assign_payload, w as add_styles, x as merge_styles, y as noop$1, z as stringify } from "../../chunks/index3.js";
import { t as themeColors, d as disableTransitions, c as cn, a as default_slot, g as getCtx, s as sheetTransitions, b as sheetVariants, e as buttonVariants, R as Root, T as Trigger, f as cn$1, h as toastState, u as useEffect, o as onDestroy } from "../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { p as page } from "../../chunks/stores.js";
import "../../chunks/client.js";
import "clsx";
import { I as Icon$1, a as Icons } from "../../chunks/index4.js";
import { d as derived, g as get_store_value, w as writable, r as readable } from "../../chunks/index2.js";
function setInitialMode(defaultMode, themeColors2) {
  const rootEl = document.documentElement;
  const mode = localStorage.getItem("mode-watcher-mode") || defaultMode;
  const light = mode === "light" || mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches;
  rootEl.classList[light ? "remove" : "add"]("dark");
  rootEl.style.colorScheme = light ? "light" : "dark";
  if (themeColors2) {
    const themeMetaEl = document.querySelector('meta[name="theme-color"]');
    if (themeMetaEl) {
      themeMetaEl.setAttribute("content", mode === "light" ? themeColors2.light : themeColors2.dark);
    }
  }
  localStorage.setItem("mode-watcher-mode", mode);
}
function Mode_watcher($$payload, $$props) {
  push();
  let track = value_or_fallback($$props["track"], () => true);
  let defaultMode = value_or_fallback($$props["defaultMode"], () => "system");
  let themeColors$1 = value_or_fallback($$props["themeColors"], () => void 0);
  let disableTransitions$1 = value_or_fallback($$props["disableTransitions"], () => true);
  themeColors.set(themeColors$1);
  disableTransitions.set(disableTransitions$1);
  const args = `"${defaultMode}"${themeColors$1 ? `, ${JSON.stringify(themeColors$1)}` : ""}`;
  head($$payload, ($$payload2) => {
    $$payload2.out += `<!--[-->`;
    if (themeColors$1) {
      $$payload2.out += `<meta name="theme-color"${attr("content", themeColors$1.dark, false)}>`;
      $$payload2.out += "<!--]-->";
    } else {
      $$payload2.out += "<!--]!-->";
    }
    $$payload2.out += ` <!--[-->${`<script nonce="%sveltekit.nonce%">(` + setInitialMode.toString() + `)(` + args + `);<\/script>`}<!--]-->`;
  });
  bind_props($$props, {
    track,
    defaultMode,
    themeColors: themeColors$1,
    disableTransitions: disableTransitions$1
  });
  pop();
}
function Sidebar_nav($$payload, $$props) {
  push();
  let { items = [] } = $$props;
  $$payload.out += `<!--[-->`;
  if (items.length) {
    const each_array = ensure_array_like(items);
    $$payload.out += `<aside class="fixed top-10 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-border md:sticky md:block"><div class="h-full py-6 pr-4 lg:py-8"><nav class="space-y-3"><div class="flex w-full flex-col pb-[50px]"><!--[-->`;
    for (let index = 0; index < each_array.length; index++) {
      const item = each_array[index];
      $$payload.out += "<!--[-->";
      $$payload.out += `<!--[-->`;
      if (item.title === "Overview") {
        $$payload.out += `<!--[-->`;
        Sidebar_nav_main_items($$payload, { items: item.items });
        $$payload.out += `<!--]-->`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<div class="pb-4"><h4 class="mb-1 ml-[9px] rounded-md px-2.5 py-2 pl-4 text-xs font-medium uppercase text-muted-foreground">${escape_html(item.title)}</h4> <!--[-->`;
        if (item.items) {
          $$payload.out += `<!--[-->`;
          Sidebar_nav_items($$payload, { items: item.items });
          $$payload.out += `<!--]-->`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += `</div>`;
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += "<!--]-->";
    }
    $$payload.out += "<!--]-->";
    $$payload.out += `</div></nav></div></aside>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  pop();
}
function Sidebar_nav_items($$payload, $$props) {
  push();
  var $$store_subs;
  let { items = [] } = $$props;
  $$payload.out += `<!--[-->`;
  if (items.length) {
    const each_array = ensure_array_like(items);
    $$payload.out += `<div class="grid grid-flow-row auto-rows-max gap-0.5 pl-4 text-sm"><!--[-->`;
    for (let index = 0; index < each_array.length; index++) {
      const item = each_array[index];
      $$payload.out += "<!--[-->";
      $$payload.out += `<!--[-->`;
      if (item.href) {
        $$payload.out += `<a${attr("href", item.href, false)}${attr("class", cn("group inline-flex w-full items-center rounded-md px-2.5 py-1.5 text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background", item.disabled && "cursor-not-allowed opacity-60 ", store_get($$store_subs ??= {}, "$page", page).url.pathname === item.href ? "text-blue-600 dark:text-blue-500" : "hover:underline"), false)}${attr("target", item.external ? "_blank" : "", false)}${attr("rel", item.external ? "noreferrer" : "", false)}>${escape_html(item.title)} <!--[-->`;
        if (item.label) {
          $$payload.out += `<span class="ml-2 rounded-[4px] bg-[#FCDAFE] px-1.5 py-1 text-[0.7rem] font-semibold leading-none text-[#2A266B] no-underline group-hover:no-underline">${escape_html(item.label)}</span>`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += `</a>`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<span class="flex w-full cursor-not-allowed items-center rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:underline">${escape_html(item.title)}</span>`;
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += "<!--]-->";
    }
    $$payload.out += "<!--]-->";
    $$payload.out += `</div>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function Sidebar_nav_main_items($$payload, $$props) {
  push();
  var $$store_subs;
  let { items = [] } = $$props;
  $$payload.out += `<!--[-->`;
  if (items.length) {
    const each_array = ensure_array_like(items);
    $$payload.out += `<div class="grid grid-flow-row auto-rows-max gap-0.5 pb-2 pl-4 text-sm"><!--[-->`;
    for (let index = 0; index < each_array.length; index++) {
      const item = each_array[index];
      $$payload.out += "<!--[-->";
      $$payload.out += `<!--[-->`;
      if (item.href) {
        $$payload.out += `<a${attr("href", item.href, false)}${attr("class", cn("group flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm font-semibold text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background", store_get($$store_subs ??= {}, "$page", page).url.pathname === item.href ? "text-blue-600 dark:text-blue-500" : "hover:underline"), false)}${attr("target", item.external ? "_blank" : "", false)}${attr("rel", item.external ? "noreferrer" : "", false)}>${escape_html(item.title)} <!--[-->`;
        if (item.label) {
          $$payload.out += `<span class="ml-2 rounded-[4px] bg-[#FCDAFE] px-1.5 py-1 text-xs font-semibold leading-none text-[#2A266B] no-underline group-hover:no-underline">${escape_html(item.label)}</span>`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += `</a>`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += "<!--]-->";
    }
    $$payload.out += "<!--]-->";
    $$payload.out += `</div>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function Mobile_link($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    href,
    open = void 0,
    class: className = void 0,
    restProps,
    children
  } = $$props;
  $$payload.out += `<a${spread_attributes({
    href,
    class: cn(store_get($$store_subs ??= {}, "$page", page).url.pathname === href ? "text-foreground" : "text-foreground/60", className),
    ...restProps
  })}><!--[-->`;
  children($$payload);
  $$payload.out += `<!--]--></a>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { open });
  pop();
}
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
  for (key of iter.keys()) {
    if (dequal(key, tar))
      return key;
  }
}
function dequal(foo, bar) {
  var ctor, len, tmp;
  if (foo === bar)
    return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date)
      return foo.getTime() === bar.getTime();
    if (ctor === RegExp)
      return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal(foo[len], bar[len]))
          ;
      }
      return len === -1;
    }
    if (ctor === Set) {
      if (foo.size !== bar.size) {
        return false;
      }
      for (len of foo) {
        tmp = len;
        if (tmp && typeof tmp === "object") {
          tmp = find(bar, tmp);
          if (!tmp)
            return false;
        }
        if (!bar.has(tmp))
          return false;
      }
      return true;
    }
    if (ctor === Map) {
      if (foo.size !== bar.size) {
        return false;
      }
      for (len of foo) {
        tmp = len[0];
        if (tmp && typeof tmp === "object") {
          tmp = find(bar, tmp);
          if (!tmp)
            return false;
        }
        if (!dequal(len[1], bar.get(tmp))) {
          return false;
        }
      }
      return true;
    }
    if (ctor === ArrayBuffer) {
      foo = new Uint8Array(foo);
      bar = new Uint8Array(bar);
    } else if (ctor === DataView) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo.getInt8(len) === bar.getInt8(len))
          ;
      }
      return len === -1;
    }
    if (ArrayBuffer.isView(foo)) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo[len] === bar[len])
          ;
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor))
          return false;
        if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor]))
          return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}
function getAttrs(builders) {
  const attrs = {};
  builders.forEach((builder) => {
    Object.keys(builder).forEach((key) => {
      if (key !== "action") {
        attrs[key] = builder[key];
      }
    });
  });
  return attrs;
}
function Button$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["href", "type", "builders", "el"]);
  push();
  let href = value_or_fallback($$props["href"], () => void 0);
  let type = value_or_fallback($$props["type"], () => void 0);
  let builders = value_or_fallback($$props["builders"], () => []);
  let el = value_or_fallback($$props["el"], () => void 0);
  const attrs = { "data-button-root": "" };
  $$payload.out += `<!--[-->`;
  if (builders && builders.length) {
    const $$tag = href ? "a" : "button";
    $$payload.out += `<!--[-->`;
    if ($$tag)
      element(
        $$payload,
        $$tag,
        () => {
          $$payload.out += `${spread_attributes({
            type: href ? void 0 : type,
            href,
            tabindex: "0",
            ...getAttrs(builders),
            ...$$restProps,
            ...attrs
          })}`;
        },
        () => {
          $$payload.out += `<!--[-->`;
          slot($$payload, default_slot($$props), {}, null);
          $$payload.out += `<!--]-->`;
        }
      );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    const $$tag_1 = href ? "a" : "button";
    $$payload.out += `<!--[-->`;
    if ($$tag_1)
      element(
        $$payload,
        $$tag_1,
        () => {
          $$payload.out += `${spread_attributes({
            type: href ? void 0 : type,
            href,
            tabindex: "0",
            ...$$restProps,
            ...attrs
          })}`;
        },
        () => {
          $$payload.out += `<!--[-->`;
          slot($$payload, default_slot($$props), {}, null);
          $$payload.out += `<!--]-->`;
        }
      );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { href, type, builders, el });
  pop();
}
function Dialog_close($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { close }, getAttrs: getAttrs2 } = getCtx();
  const attrs = getAttrs2("close");
  builder = store_get($$store_subs ??= {}, "$close", close);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      default_slot($$props),
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<button${spread_attributes({ ...builder, type: "button", ...$$restProps })}><!--[-->`;
    slot(
      $$payload,
      default_slot($$props),
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]--></button>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Dialog_portal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el"]);
  push();
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const { elements: { portalled }, getAttrs: getAttrs2 } = getCtx();
  const attrs = getAttrs2("portal");
  builder = store_get($$store_subs ??= {}, "$portalled", portalled);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      default_slot($$props),
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!--[-->`;
    slot(
      $$payload,
      default_slot($$props),
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]--></div>`;
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Dialog_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "el"
  ]);
  push();
  var $$store_subs;
  let builder;
  let transition = value_or_fallback($$props["transition"], () => void 0);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => void 0);
  let inTransition = value_or_fallback($$props["inTransition"], () => void 0);
  let inTransitionConfig = value_or_fallback($$props["inTransitionConfig"], () => void 0);
  let outTransition = value_or_fallback($$props["outTransition"], () => void 0);
  let outTransitionConfig = value_or_fallback($$props["outTransitionConfig"], () => void 0);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let id = value_or_fallback($$props["id"], () => void 0);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { content },
    states: { open },
    ids,
    getAttrs: getAttrs2
  } = getCtx();
  const attrs = getAttrs2("content");
  if (id) {
    ids.content.set(id);
  }
  builder = store_get($$store_subs ??= {}, "$content", content);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild && store_get($$store_subs ??= {}, "$open", open)) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      default_slot($$props),
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    if (transition && store_get($$store_subs ??= {}, "$open", open)) {
      $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!--[-->`;
      slot(
        $$payload,
        default_slot($$props),
        {
          get builder() {
            return builder;
          }
        },
        null
      );
      $$payload.out += `<!--]--></div>`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += `<!--[-->`;
      if (inTransition && outTransition && store_get($$store_subs ??= {}, "$open", open)) {
        $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!--[-->`;
        slot(
          $$payload,
          default_slot($$props),
          {
            get builder() {
              return builder;
            }
          },
          null
        );
        $$payload.out += `<!--]--></div>`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<!--[-->`;
        if (inTransition && store_get($$store_subs ??= {}, "$open", open)) {
          $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!--[-->`;
          slot(
            $$payload,
            default_slot($$props),
            {
              get builder() {
                return builder;
              }
            },
            null
          );
          $$payload.out += `<!--]--></div>`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += `<!--[-->`;
          if (outTransition && store_get($$store_subs ??= {}, "$open", open)) {
            $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!--[-->`;
            slot(
              $$payload,
              default_slot($$props),
              {
                get builder() {
                  return builder;
                }
              },
              null
            );
            $$payload.out += `<!--]--></div>`;
            $$payload.out += "<!--]-->";
          } else {
            $$payload.out += `<!--[-->`;
            if (store_get($$store_subs ??= {}, "$open", open)) {
              $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}><!--[-->`;
              slot(
                $$payload,
                default_slot($$props),
                {
                  get builder() {
                    return builder;
                  }
                },
                null
              );
              $$payload.out += `<!--]--></div>`;
              $$payload.out += "<!--]-->";
            } else {
              $$payload.out += "<!--]!-->";
            }
            $$payload.out += "<!--]!-->";
          }
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, {
    transition,
    transitionConfig,
    inTransition,
    inTransitionConfig,
    outTransition,
    outTransitionConfig,
    asChild,
    id,
    el
  });
  pop();
}
function Dialog_overlay($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "el"
  ]);
  push();
  var $$store_subs;
  let builder;
  let transition = value_or_fallback($$props["transition"], () => void 0);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => void 0);
  let inTransition = value_or_fallback($$props["inTransition"], () => void 0);
  let inTransitionConfig = value_or_fallback($$props["inTransitionConfig"], () => void 0);
  let outTransition = value_or_fallback($$props["outTransition"], () => void 0);
  let outTransitionConfig = value_or_fallback($$props["outTransitionConfig"], () => void 0);
  let asChild = value_or_fallback($$props["asChild"], () => false);
  let el = value_or_fallback($$props["el"], () => void 0);
  const {
    elements: { overlay },
    states: { open },
    getAttrs: getAttrs2
  } = getCtx();
  const attrs = getAttrs2("overlay");
  builder = store_get($$store_subs ??= {}, "$overlay", overlay);
  Object.assign(builder, attrs);
  $$payload.out += `<!--[-->`;
  if (asChild && store_get($$store_subs ??= {}, "$open", open)) {
    $$payload.out += `<!--[-->`;
    slot(
      $$payload,
      default_slot($$props),
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    if (transition && store_get($$store_subs ??= {}, "$open", open)) {
      $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}></div>`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += `<!--[-->`;
      if (inTransition && outTransition && store_get($$store_subs ??= {}, "$open", open)) {
        $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}></div>`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<!--[-->`;
        if (inTransition && store_get($$store_subs ??= {}, "$open", open)) {
          $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}></div>`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += `<!--[-->`;
          if (outTransition && store_get($$store_subs ??= {}, "$open", open)) {
            $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}></div>`;
            $$payload.out += "<!--]-->";
          } else {
            $$payload.out += `<!--[-->`;
            if (store_get($$store_subs ??= {}, "$open", open)) {
              $$payload.out += `<div${spread_attributes({ ...builder, ...$$restProps })}></div>`;
              $$payload.out += "<!--]-->";
            } else {
              $$payload.out += "<!--]!-->";
            }
            $$payload.out += "<!--]!-->";
          }
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, {
    transition,
    transitionConfig,
    inTransition,
    inTransitionConfig,
    outTransition,
    outTransitionConfig,
    asChild,
    el
  });
  pop();
}
function Sheet_portal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  $$payload.out += `<!--[-->`;
  Dialog_portal($$payload, spread_props([
    { class: cn(className) },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, default_slot($$props), {}, null);
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className });
  pop();
}
const linear = (x) => x;
function cubic_out(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function split_css_unit(value) {
  const split = typeof value === "string" && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return split ? [parseFloat(split[1]), split[2] || "px"] : [
    /** @type {number} */
    value,
    "px"
  ];
}
function fade(node, { delay = 0, duration = 400, easing = linear } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function fly(node, { delay = 0, duration = 400, easing = cubic_out, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  const [x_value, x_unit] = split_css_unit(x);
  const [y_value, y_unit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x_value}${x_unit}, ${(1 - t) * y_value}${y_unit});
			opacity: ${target_opacity - od * u}`
  };
}
function Sheet_overlay($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "transition", "transitionConfig"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let transition = value_or_fallback($$props["transition"], () => fade);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], () => ({ duration: 150 }));
  $$payload.out += `<!--[-->`;
  Dialog_overlay($$payload, spread_props([
    {
      transition,
      transitionConfig,
      class: cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ", className)
    },
    $$restProps
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: className,
    transition,
    transitionConfig
  });
  pop();
}
function X($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const iconNode = [
    ["path", { "d": "M18 6 6 18" }],
    ["path", { "d": "m6 6 12 12" }]
  ];
  $$payload.out += `<!--[-->`;
  Icon$1($$payload, spread_props([
    { name: "x" },
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
function Sheet_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "side",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig"
  ]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let side = value_or_fallback($$props["side"], () => "right");
  let inTransition = value_or_fallback($$props["inTransition"], () => fly);
  let inTransitionConfig = value_or_fallback($$props["inTransitionConfig"], () => sheetTransitions[side ?? "right"].in);
  let outTransition = value_or_fallback($$props["outTransition"], () => fly);
  let outTransitionConfig = value_or_fallback($$props["outTransitionConfig"], () => sheetTransitions[side ?? "right"].out);
  $$payload.out += `<!--[-->`;
  Sheet_portal($$payload, {
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Sheet_overlay($$payload2, {});
      $$payload2.out += `<!--]--> <!--[-->`;
      Dialog_content($$payload2, spread_props([
        {
          inTransition,
          inTransitionConfig,
          outTransition,
          outTransitionConfig,
          class: cn(sheetVariants({ side }), className)
        },
        $$restProps,
        {
          children: ($$payload3, $$slotProps2) => {
            $$payload3.out += `<!--[-->`;
            slot($$payload3, default_slot($$props), {}, null);
            $$payload3.out += `<!--]--> <!--[-->`;
            Dialog_close($$payload3, {
              class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
              children: ($$payload4, $$slotProps3) => {
                $$payload4.out += `<!--[-->`;
                X($$payload4, { class: "h-4 w-4" });
                $$payload4.out += `<!--]--> <span class="sr-only">Close</span>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        }
      ]));
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: className,
    side,
    inTransition,
    inTransitionConfig,
    outTransition,
    outTransitionConfig
  });
  pop();
}
function Button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "variant", "size", "builders"]);
  push();
  let className = value_or_fallback($$props["class"], () => void 0);
  let variant = value_or_fallback($$props["variant"], () => "default");
  let size = value_or_fallback($$props["size"], () => "default");
  let builders = value_or_fallback($$props["builders"], () => []);
  $$payload.out += `<!--[-->`;
  Button$1($$payload, spread_props([
    {
      builders,
      class: cn(buttonVariants({ variant, size, className })),
      type: "button"
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        $$payload2.out += `<!--[-->`;
        slot($$payload2, default_slot($$props), {}, null);
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!--]-->`;
  bind_props($$props, { class: className, variant, size, builders });
  pop();
}
const navigation = {
  main: [
    // {
    // 	title: 'Docs',
    // 	href: '/'
    // }
  ],
  sidebar: [
    {
      title: "Overview",
      items: [
        {
          title: "Introduction",
          href: "/content/index",
          items: []
        }
      ]
    },
    {
      title: "content",
      items: [
        {
          title: "Server-side tokens",
          href: "/content/server-side-tokens",
          items: []
        },
        {
          title: "Sessions",
          href: "/content/sessions",
          items: []
        },
        {
          title: "Password authentication",
          href: "/content/password-authentication",
          items: []
        },
        {
          title: "Email verification",
          href: "/content/email-verification",
          items: []
        },
        {
          title: "Password reset",
          href: "/content/password-reset",
          items: []
        },
        {
          title: "Generating random values",
          href: "/content/random-values",
          items: []
        },
        {
          title: "OAuth",
          href: "/content/oauth",
          items: []
        },
        {
          title: "Multi-factor authentication (MFA)",
          href: "/content/mfa",
          items: []
        },
        {
          title: "Passkeys",
          href: "/content/passkeys",
          items: []
        },
        {
          title: "Cross-site request forgery (CSRF)",
          href: "/content/csrf",
          items: []
        },
        {
          title: "Open redirect",
          href: "/content/open-redirect",
          items: []
        }
      ]
    }
  ]
};
function Mobile_nav($$payload, $$props) {
  push();
  let open = false;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!--[-->`;
    Root($$payload2, {
      get open() {
        return open;
      },
      set open($$value) {
        open = $$value;
        $$settled = false;
      },
      children: ($$payload3, $$slotProps) => {
        $$payload3.out += `<!--[-->`;
        Trigger($$payload3, {
          asChild: true,
          children: ($$payload4, $$slotProps2) => {
            const builder = $$slotProps2.builder;
            $$payload4.out += `<!--[-->`;
            Button($$payload4, {
              builders: [builder],
              variant: "ghost",
              class: "mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden",
              children: ($$payload5, $$slotProps3) => {
                $$payload5.out += `<!--[-->`;
                Icons.Menu($$payload5, { class: "h-5 w-5" });
                $$payload5.out += `<!--]--> <span class="sr-only">Toggle Menu</span>`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!--]--> <!--[-->`;
        Sheet_content($$payload3, {
          side: "left",
          class: "pr-0",
          children: ($$payload4, $$slotProps2) => {
            const each_array = ensure_array_like(navigation.sidebar);
            $$payload4.out += `<!--[-->`;
            Mobile_link($$payload4, {
              href: "/",
              class: "flex items-center font-quicksand font-bold",
              open,
              children: ($$payload5, $$slotProps3) => {
                $$payload5.out += `The Copenhagen Book`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!--]--> <div class="my-4 h-[calc(100vh-8rem)] overflow-auto pb-10 pl-6"><div class="flex flex-col space-y-2"><!--[-->`;
            for (let index = 0; index < each_array.length; index++) {
              const navItem = each_array[index];
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<div class="flex flex-col space-y-3 pt-6"><h4 class="font-medium">${escape_html(navItem.title)}</h4> <!--[-->`;
              if (navItem?.items?.length) {
                const each_array_1 = ensure_array_like(navItem.items);
                $$payload4.out += `<!--[-->`;
                for (let $$index = 0; $$index < each_array_1.length; $$index++) {
                  const item = each_array_1[$$index];
                  $$payload4.out += "<!--[-->";
                  $$payload4.out += `<!--[-->`;
                  if (!item.disabled && item.href) {
                    $$payload4.out += `<!--[-->`;
                    Mobile_link($$payload4, {
                      href: item.href,
                      get open() {
                        return open;
                      },
                      set open($$value) {
                        open = $$value;
                        $$settled = false;
                      },
                      children: ($$payload5, $$slotProps3) => {
                        $$payload5.out += `${escape_html(item.title)}`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload4.out += `<!--]-->`;
                    $$payload4.out += "<!--]-->";
                  } else {
                    $$payload4.out += "<!--]!-->";
                  }
                  $$payload4.out += "<!--]-->";
                }
                $$payload4.out += "<!--]-->";
                $$payload4.out += "<!--]-->";
              } else {
                $$payload4.out += "<!--]!-->";
              }
              $$payload4.out += `</div>`;
              $$payload4.out += "<!--]-->";
            }
            $$payload4.out += "<!--]-->";
            $$payload4.out += `</div></div>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!--]-->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function Icon($$payload, $$props) {
  push();
  let type = value_or_fallback($$props["type"], () => "success");
  $$payload.out += `<!--[-->`;
  if (type === "success") {
    $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    if (type === "error") {
      $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += `<!--[-->`;
      if (type === "info") {
        $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<!--[-->`;
        if (type === "warning") {
          $$payload.out += `<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += "<!--]!-->";
  }
  bind_props($$props, { type });
  pop();
}
function Loader($$payload, $$props) {
  push();
  let visible = $$props["visible"];
  const bars = Array(12).fill(0);
  const each_array = ensure_array_like(bars);
  $$payload.out += `<div class="sonner-loading-wrapper"${attr("data-visible", visible, false)}><div class="sonner-spinner"><!--[-->`;
  for (let i = 0; i < each_array.length; i++) {
    each_array[i];
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="sonner-loading-bar"></div>`;
    $$payload.out += "<!--]-->";
  }
  $$payload.out += "<!--]-->";
  $$payload.out += `</div></div>`;
  bind_props($$props, { visible });
  pop();
}
function Toast($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  var $$store_subs;
  let isFront, isVisible, toastType, toastClass, toastDescriptionClass, heightIndex, coords, toastsHeightBefore, disabled, isPromiseLoadingOrInfiniteDuration;
  const TOAST_LIFETIME = 4e3;
  const GAP = 14;
  const TIME_BEFORE_UNMOUNT = 200;
  const defaultClasses = {
    toast: "",
    title: "",
    description: "",
    loader: "",
    closeButton: "",
    cancelButton: "",
    actionButton: "",
    action: "",
    warning: "",
    error: "",
    success: "",
    default: "",
    info: "",
    loading: ""
  };
  const {
    toasts,
    heights,
    removeHeight,
    setHeight,
    remove
  } = toastState;
  let toast = $$props["toast"];
  let index = $$props["index"];
  let expanded = $$props["expanded"];
  let invert = $$props["invert"];
  let position = $$props["position"];
  let visibleToasts = $$props["visibleToasts"];
  let expandByDefault = $$props["expandByDefault"];
  let closeButton = $$props["closeButton"];
  let interacting = $$props["interacting"];
  let cancelButtonStyle = value_or_fallback($$props["cancelButtonStyle"], () => "");
  let actionButtonStyle = value_or_fallback($$props["actionButtonStyle"], () => "");
  let duration = value_or_fallback($$props["duration"], () => 4e3);
  let descriptionClass = value_or_fallback($$props["descriptionClass"], () => "");
  let classes = value_or_fallback($$props["classes"], () => ({}));
  let unstyled = value_or_fallback($$props["unstyled"], () => false);
  let mounted = false;
  let removed = false;
  let swiping = false;
  let swipeOut = false;
  let offsetBeforeRemove = 0;
  let initialHeight = 0;
  let offset = 0;
  let closeTimerStartTimeRef = 0;
  let lastCloseTimerStartTimeRef = 0;
  async function updateHeights() {
    {
      return;
    }
  }
  function deleteToast() {
    removed = true;
    offsetBeforeRemove = offset;
    removeHeight(toast.id);
    setTimeout(
      () => {
        remove(toast.id);
      },
      TIME_BEFORE_UNMOUNT
    );
  }
  let timeoutId;
  let remainingTime = toast.duration || duration || TOAST_LIFETIME;
  function pauseTimer() {
    if (lastCloseTimerStartTimeRef < closeTimerStartTimeRef) {
      const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef;
      remainingTime = remainingTime - elapsedTime;
    }
    lastCloseTimerStartTimeRef = (/* @__PURE__ */ new Date()).getTime();
  }
  function startTimer() {
    closeTimerStartTimeRef = (/* @__PURE__ */ new Date()).getTime();
    timeoutId = setTimeout(
      () => {
        toast.onAutoClose?.(toast);
        deleteToast();
      },
      remainingTime
    );
  }
  let effect;
  classes = { ...defaultClasses, ...classes };
  isFront = index === 0;
  isVisible = index + 1 <= visibleToasts;
  toast.title;
  toast.description;
  toastType = toast.type;
  toastClass = toast.class || "";
  toastDescriptionClass = toast.descriptionClass || "";
  heightIndex = store_get($$store_subs ??= {}, "$heights", heights).findIndex((height) => height.toastId === toast.id) || 0;
  coords = position.split("-");
  toastsHeightBefore = store_get($$store_subs ??= {}, "$heights", heights).reduce(
    (prev, curr, reducerIndex) => {
      if (reducerIndex >= heightIndex)
        return prev;
      return prev + curr.height;
    },
    0
  );
  invert = toast.invert || invert;
  disabled = toastType === "loading";
  offset = Math.round(heightIndex * GAP + toastsHeightBefore);
  updateHeights();
  if (toast.updated) {
    clearTimeout(timeoutId);
    remainingTime = toast.duration || duration || TOAST_LIFETIME;
    startTimer();
  }
  isPromiseLoadingOrInfiniteDuration = toast.promise && toastType === "loading" || toast.duration === Number.POSITIVE_INFINITY;
  effect = useEffect(() => {
    if (!isPromiseLoadingOrInfiniteDuration) {
      if (expanded || interacting) {
        pauseTimer();
      } else {
        startTimer();
      }
    }
    return () => clearTimeout(timeoutId);
  });
  store_get($$store_subs ??= {}, "$effect", effect);
  if (toast.delete) {
    deleteToast();
  }
  $$payload.out += `<li${add_styles(merge_styles(`${$$sanitized_props.style} ${toast.style}`, {
    "--index": index,
    "--toasts-before": index,
    "--z-index": store_get($$store_subs ??= {}, "$toasts", toasts).length - index,
    "--offset": `${removed ? offsetBeforeRemove : offset}px`,
    "--initial-height": `${initialHeight}px`
  }))}${attr("aria-live", toast.important ? "assertive" : "polite", false)} aria-atomic="true" role="status"${attr("tabindex", 0, false)}${attr("class", cn$1($$sanitized_props.class, toastClass, classes?.toast, toast?.classes?.toast, classes?.[toastType], toast?.classes?.[toastType]), false)} data-sonner-toast=""${attr("data-styled", !(toast.component || toast?.unstyled || unstyled), false)}${attr("data-mounted", mounted, false)}${attr("data-promise", Boolean(toast.promise), false)}${attr("data-removed", removed, false)}${attr("data-visible", isVisible, false)}${attr("data-y-position", coords[0], false)}${attr("data-x-position", coords[1], false)}${attr("data-index", index, false)}${attr("data-front", isFront, false)}${attr("data-swiping", swiping, false)}${attr("data-type", toastType, false)}${attr("data-invert", invert, false)}${attr("data-swipe-out", swipeOut, false)}${attr("data-expanded", Boolean(expanded || expandByDefault && mounted), false)}><!--[-->`;
  if (closeButton && !toast.component) {
    $$payload.out += `<button aria-label="Close toast"${attr("data-disabled", disabled, false)} data-close-button=""${attr("class", cn$1(classes?.closeButton, toast?.classes?.closeButton), false)}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <!--[-->`;
  if (toast.component) {
    $$payload.out += `<!--[-->`;
    toast.component?.($$payload, spread_props([toast.componentProps]));
    $$payload.out += `<!--]-->`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += `<!--[-->`;
    if (toastType !== "default" || toast.icon || toast.promise) {
      $$payload.out += `<div data-icon=""><!--[-->`;
      if ((toast.promise || toastType === "loading") && !toast.icon) {
        $$payload.out += `<!--[-->`;
        slot($$payload, $$props.$$slots?.["loading-icon"], {}, null);
        $$payload.out += `<!--]-->`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += ` <!--[-->`;
      if (toast.icon) {
        $$payload.out += `<!--[-->`;
        toast.icon?.($$payload, {});
        $$payload.out += `<!--]-->`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<!--[-->`;
        if (toastType === "success") {
          $$payload.out += `<!--[-->`;
          slot($$payload, $$props.$$slots?.["success-icon"], {}, null);
          $$payload.out += `<!--]-->`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += `<!--[-->`;
          if (toastType === "error") {
            $$payload.out += `<!--[-->`;
            slot($$payload, $$props.$$slots?.["error-icon"], {}, null);
            $$payload.out += `<!--]-->`;
            $$payload.out += "<!--]-->";
          } else {
            $$payload.out += `<!--[-->`;
            if (toastType === "warning") {
              $$payload.out += `<!--[-->`;
              slot($$payload, $$props.$$slots?.["warning-icon"], {}, null);
              $$payload.out += `<!--]-->`;
              $$payload.out += "<!--]-->";
            } else {
              $$payload.out += `<!--[-->`;
              if (toastType === "info") {
                $$payload.out += `<!--[-->`;
                slot($$payload, $$props.$$slots?.["info-icon"], {}, null);
                $$payload.out += `<!--]-->`;
                $$payload.out += "<!--]-->";
              } else {
                $$payload.out += "<!--]!-->";
              }
              $$payload.out += "<!--]!-->";
            }
            $$payload.out += "<!--]!-->";
          }
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += `</div>`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += ` <div data-content=""><!--[-->`;
    if (toast.title) {
      $$payload.out += `<div data-title=""${attr("class", cn$1(classes?.title, toast?.classes?.title), false)}><!--[-->`;
      if (typeof toast.title !== "string") {
        $$payload.out += `<!--[-->`;
        toast.title?.($$payload, spread_props([toast.componentProps]));
        $$payload.out += `<!--]-->`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `${escape_html(toast.title)}`;
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += `</div>`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += ` <!--[-->`;
    if (toast.description) {
      $$payload.out += `<div data-description=""${attr("class", cn$1(descriptionClass, toastDescriptionClass, classes?.description, toast.classes?.description), false)}><!--[-->`;
      if (typeof toast.description !== "string") {
        $$payload.out += `<!--[-->`;
        toast.description?.($$payload, spread_props([toast.componentProps]));
        $$payload.out += `<!--]-->`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `${escape_html(toast.description)}`;
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += `</div>`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += `</div> <!--[-->`;
    if (toast.cancel) {
      $$payload.out += `<button data-button="" data-cancel=""${attr("style", cancelButtonStyle, false)}${attr("class", cn$1(classes?.cancelButton, toast?.classes?.cancelButton), false)}>${escape_html(toast.cancel.label)}</button>`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += ` <!--[-->`;
    if (toast.action) {
      $$payload.out += `<button data-button=""${attr("style", actionButtonStyle, false)}${attr("class", cn$1(classes?.actionButton, toast?.classes?.actionButton), false)}>${escape_html(toast.action.label)}</button>`;
      $$payload.out += "<!--]-->";
    } else {
      $$payload.out += "<!--]!-->";
    }
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += `</li>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, {
    toast,
    index,
    expanded,
    invert,
    position,
    visibleToasts,
    expandByDefault,
    closeButton,
    interacting,
    cancelButtonStyle,
    actionButtonStyle,
    duration,
    descriptionClass,
    classes,
    unstyled
  });
  pop();
}
function Toaster($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "invert",
    "theme",
    "position",
    "hotkey",
    "richColors",
    "expand",
    "duration",
    "visibleToasts",
    "closeButton",
    "toastOptions",
    "offset",
    "dir"
  ]);
  push();
  var $$store_subs;
  let possiblePositions, hotkeyLabel;
  const VISIBLE_TOASTS_AMOUNT = 3;
  const VIEWPORT_OFFSET = "32px";
  const TOAST_WIDTH = 356;
  const GAP = 14;
  const DARK = "dark";
  const LIGHT = "light";
  function getInitialTheme(t) {
    if (t !== "system") {
      return t;
    }
    if (typeof window !== "undefined") {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return DARK;
      }
      return LIGHT;
    }
    return LIGHT;
  }
  function getDocumentDirection() {
    if (typeof window === "undefined")
      return "ltr";
    if (typeof document === "undefined")
      return "ltr";
    const dirAttribute = document.documentElement.getAttribute("dir");
    if (dirAttribute === "auto" || !dirAttribute) {
      return window.getComputedStyle(document.documentElement).direction;
    }
    return dirAttribute;
  }
  let invert = value_or_fallback($$props["invert"], () => false);
  let theme = value_or_fallback($$props["theme"], () => "light");
  let position = value_or_fallback($$props["position"], () => "bottom-right");
  let hotkey = value_or_fallback($$props["hotkey"], () => ["altKey", "KeyT"]);
  let richColors = value_or_fallback($$props["richColors"], () => false);
  let expand = value_or_fallback($$props["expand"], () => false);
  let duration = value_or_fallback($$props["duration"], () => 4e3);
  let visibleToasts = value_or_fallback($$props["visibleToasts"], () => VISIBLE_TOASTS_AMOUNT);
  let closeButton = value_or_fallback($$props["closeButton"], () => false);
  let toastOptions = value_or_fallback($$props["toastOptions"], () => ({}));
  let offset = value_or_fallback($$props["offset"], () => null);
  let dir = value_or_fallback($$props["dir"], getDocumentDirection);
  const tmp = toastState, toasts = tmp.toasts, heights = tmp.heights;
  let expanded = false;
  let interacting = false;
  let actualTheme = getInitialTheme(theme);
  onDestroy(() => {
  });
  possiblePositions = Array.from(new Set([
    position,
    ...store_get($$store_subs ??= {}, "$toasts", toasts).filter((toast) => toast.position).map((toast) => toast.position)
  ].filter(Boolean)));
  hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
  if (store_get($$store_subs ??= {}, "$toasts", toasts).length <= 1) {
    expanded = false;
  }
  {
    const toastsToDismiss = store_get($$store_subs ??= {}, "$toasts", toasts).filter((toast) => toast.dismiss && !toast.delete);
    if (toastsToDismiss.length > 0) {
      const updatedToasts = store_get($$store_subs ??= {}, "$toasts", toasts).map((toast) => {
        const matchingToast = toastsToDismiss.find((dismissToast) => dismissToast.id === toast.id);
        if (matchingToast) {
          return { ...toast, delete: true };
        }
        return toast;
      });
      toasts.set(updatedToasts);
    }
  }
  {
    if (theme !== "system") {
      actualTheme = theme;
    }
    if (typeof window !== "undefined") {
      if (theme === "system") {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          actualTheme = DARK;
        } else {
          actualTheme = LIGHT;
        }
      }
      const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
      const changeHandler = ({ matches }) => {
        actualTheme = matches ? DARK : LIGHT;
      };
      if ("addEventListener" in mediaQueryList) {
        mediaQueryList.addEventListener("change", changeHandler);
      } else {
        mediaQueryList.addListener(changeHandler);
      }
    }
  }
  $$payload.out += `<!--[-->`;
  if (store_get($$store_subs ??= {}, "$toasts", toasts).length > 0) {
    const each_array = ensure_array_like(possiblePositions);
    $$payload.out += `<section${attr("aria-label", `Notifications ${hotkeyLabel}`, false)}${attr("tabindex", -1, false)} class="svelte-1fo5d1m"><!--[-->`;
    for (let index = 0; index < each_array.length; index++) {
      const position2 = each_array[index];
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(store_get($$store_subs ??= {}, "$toasts", toasts).filter((toast) => !toast.position && index === 0 || toast.position === position2));
      $$payload.out += `<ol${spread_attributes(
        {
          tabindex: -1,
          class: $$sanitized_props.class,
          "data-sonner-toaster": true,
          "data-theme": actualTheme,
          "data-rich-colors": richColors,
          dir: dir === "auto" ? getDocumentDirection() : dir,
          "data-y-position": position2.split("-")[0],
          "data-x-position": position2.split("-")[1],
          style: $$sanitized_props.style,
          ...$$restProps
        },
        { "svelte-1fo5d1m": true },
        {
          "--front-toast-height": `${store_get($$store_subs ??= {}, "$heights", heights)[0]?.height}px`,
          "--offset": typeof offset === "number" ? `${offset}px` : offset || VIEWPORT_OFFSET,
          "--width": `${TOAST_WIDTH}px`,
          "--gap": `${GAP}px`
        }
      )}><!--[-->`;
      for (let index2 = 0; index2 < each_array_1.length; index2++) {
        const toast = each_array_1[index2];
        $$payload.out += "<!--[-->";
        $$payload.out += `<!--[-->`;
        Toast($$payload, {
          index: index2,
          toast,
          invert,
          visibleToasts,
          closeButton,
          interacting,
          position: position2,
          expandByDefault: expand,
          expanded,
          actionButtonStyle: toastOptions?.actionButtonStyle || "",
          cancelButtonStyle: toastOptions?.cancelButtonStyle || "",
          class: toastOptions?.class || "",
          descriptionClass: toastOptions?.descriptionClass || "",
          classes: toastOptions.classes || {},
          duration: toastOptions?.duration ?? duration,
          unstyled: toastOptions.unstyled || false,
          $$slots: {
            "loading-icon": ($$payload2, $$slotProps) => {
              $$payload2.out += `<!--[-->`;
              slot($$payload2, $$props.$$slots?.["loading-icon"], {}, () => {
                $$payload2.out += `<!--[-->`;
                Loader($$payload2, { visible: toast.type === "loading" });
                $$payload2.out += `<!--]-->`;
              });
              $$payload2.out += `<!--]-->`;
            },
            "success-icon": ($$payload2, $$slotProps) => {
              $$payload2.out += `<!--[-->`;
              slot($$payload2, $$props.$$slots?.["success-icon"], {}, () => {
                $$payload2.out += `<!--[-->`;
                Icon($$payload2, { type: "success" });
                $$payload2.out += `<!--]-->`;
              });
              $$payload2.out += `<!--]-->`;
            },
            "error-icon": ($$payload2, $$slotProps) => {
              $$payload2.out += `<!--[-->`;
              slot($$payload2, $$props.$$slots?.["error-icon"], {}, () => {
                $$payload2.out += `<!--[-->`;
                Icon($$payload2, { type: "error" });
                $$payload2.out += `<!--]-->`;
              });
              $$payload2.out += `<!--]-->`;
            },
            "warning-icon": ($$payload2, $$slotProps) => {
              $$payload2.out += `<!--[-->`;
              slot($$payload2, $$props.$$slots?.["warning-icon"], {}, () => {
                $$payload2.out += `<!--[-->`;
                Icon($$payload2, { type: "warning" });
                $$payload2.out += `<!--]-->`;
              });
              $$payload2.out += `<!--]-->`;
            },
            "info-icon": ($$payload2, $$slotProps) => {
              $$payload2.out += `<!--[-->`;
              slot($$payload2, $$props.$$slots?.["info-icon"], {}, () => {
                $$payload2.out += `<!--[-->`;
                Icon($$payload2, { type: "info" });
                $$payload2.out += `<!--]-->`;
              });
              $$payload2.out += `<!--]-->`;
            }
          }
        });
        $$payload.out += `<!--]-->`;
        $$payload.out += "<!--]-->";
      }
      $$payload.out += "<!--]-->";
      $$payload.out += `</ol>`;
      $$payload.out += "<!--]-->";
    }
    $$payload.out += "<!--]-->";
    $$payload.out += `</section>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, {
    invert,
    theme,
    position,
    hotkey,
    richColors,
    expand,
    duration,
    visibleToasts,
    closeButton,
    toastOptions,
    offset,
    dir
  });
  pop();
}
function Header($$payload, $$props) {
  push();
  $$payload.out += `<header class="sticky top-0 z-50 overflow-x-hidden border-b border-border bg-background/75 backdrop-blur-md"><div class="container px-4"><div class="flex h-[70px] items-center justify-between gap-3"><div class="flex items-center gap-1.5"><!--[-->`;
  Mobile_nav($$payload);
  $$payload.out += `<!--]--> <a href="/" class="ml-2 rounded-md font-quicksand focus-visible:outline-none text-xl font-bold focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background">The Copenhagen Book</a></div> <div class="flex items-center justify-end gap-2.5"><!--[-->`;
  Button($$payload, {
    variant: "ghost",
    size: "icon",
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `<!--[-->`;
      Icons.Sun($$payload2, {
        class: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      });
      $$payload2.out += `<!--]--> <!--[-->`;
      Icons.Moon($$payload2, {
        class: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      });
      $$payload2.out += `<!--]--> <span class="sr-only">Change theme</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!--]--></div></div></div></header>`;
  pop();
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
({
  type: "hidden",
  "aria-hidden": true,
  hidden: true,
  tabIndex: -1,
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function lightable(value) {
  function subscribe(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe };
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
makeElement("empty");
function makeElement(name, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction(removeUndefined({
              ...result(...args2),
              [`data-melt-${name}`]: "",
              action: action ?? noop
            }));
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction(removeUndefined({
          ...result,
          [`data-melt-${name}`]: "",
          action: action ?? noop
        }));
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction(removeUndefined({
            ...result(...args2),
            [`data-melt-${name}`]: "",
            action: action ?? noop
          }));
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction(removeUndefined({
        ...result,
        [`data-melt-${name}`]: "",
        action: action ?? noop
      })));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix) {
  const name = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector(part));
  return {
    name,
    attribute,
    selector,
    getEl
  };
}
function isHTMLElement(element2) {
  return element2 instanceof HTMLElement;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
const safeOnMount = (fn) => {
  try {
    noop$1(fn);
  } catch {
    return fn;
  }
};
function withGet(store) {
  return {
    ...store,
    get: () => get_store_value(store)
  };
}
withGet.writable = function(initial) {
  const internal = writable(initial);
  let value = initial;
  return {
    subscribe: internal.subscribe,
    set(newValue) {
      internal.set(newValue);
      value = newValue;
    },
    update(updater) {
      const newValue = updater(value);
      internal.set(newValue);
      value = newValue;
    },
    get() {
      return value;
    }
  };
};
withGet.derived = function(stores, fn) {
  const subscribers = /* @__PURE__ */ new Map();
  const get = () => {
    const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
    return fn(values);
  };
  const subscribe = (subscriber) => {
    const unsubscribers = [];
    const storesArr = Array.isArray(stores) ? stores : [stores];
    storesArr.forEach((store) => {
      unsubscribers.push(store.subscribe(() => {
        subscriber(get());
      }));
    });
    subscriber(get());
    subscribers.set(subscriber, unsubscribers);
    return () => {
      const unsubscribers2 = subscribers.get(subscriber);
      if (unsubscribers2) {
        for (const unsubscribe of unsubscribers2) {
          unsubscribe();
        }
      }
      subscribers.delete(subscriber);
    };
  };
  return {
    get,
    subscribe
  };
};
({
  prefix: "",
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0),
  type: readable(void 0),
  checked: void 0
});
const defaults$1 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
({
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  positioning: {
    placement: "bottom"
  },
  escapeBehavior: "close",
  closeOnOutsideClick: true,
  onOutsideClick: void 0,
  preventScroll: false,
  forceVisible: false,
  locale: "en",
  granularity: void 0,
  disabled: false,
  readonly: false,
  minValue: void 0,
  maxValue: void 0,
  weekdayFormat: "narrow",
  ...omit(defaults$1, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
});
const defaults = {
  exclude: ["h1"],
  scrollOffset: 0,
  scrollBehaviour: "smooth",
  activeType: "lowest"
};
function createTableOfContents(args) {
  const argsWithDefaults = { ...defaults, ...args };
  const { selector, exclude, activeType, scrollBehaviour, scrollOffset, headingFilterFn, scrollFn } = argsWithDefaults;
  const { name } = createElHelpers("table-of-contents");
  const possibleHeadings = ["h1", "h2", "h3", "h4", "h5", "h6"];
  let headingsList = [];
  let elementsList = [];
  let elementHeadingLU = {};
  let headingParentsLU = {};
  const activeParentIdxs = withGet.writable([]);
  const visibleElementIdxs = withGet.writable([]);
  let elementTarget = null;
  let mutationObserver = null;
  let observer = null;
  const observer_threshold = 0.01;
  const activeHeadingIdxs = withGet(writable([]));
  const headingsTree = withGet(writable([]));
  function generateInitialLists(elementTarget2) {
    let headingsList2 = [];
    let elementsList2 = [];
    const includedHeadings = possibleHeadings.filter((h) => !exclude.includes(h));
    const targetHeaders = elementTarget2?.querySelectorAll(includedHeadings.join(", "));
    targetHeaders?.forEach((el) => {
      if (!el.id) {
        const uniqueID = el.innerText.replaceAll(/[^a-zA-Z0-9 ]/g, "").replaceAll(" ", "-").toLowerCase();
        el.id = `${uniqueID}`;
      }
      headingsList2.push(el);
    });
    headingsList2 = [...headingsList2];
    if (headingFilterFn) {
      headingsList2 = headingsList2.filter((heading) => headingFilterFn(heading));
    }
    elementsList2 = [].slice.call(elementTarget2?.getElementsByTagName("*"));
    elementsList2 = elementsList2.filter((el) => includedHeadings.includes(el.nodeName.toLowerCase()) || el.children.length === 0);
    elementsList2.splice(0, elementsList2.indexOf(headingsList2[0]));
    return {
      headingsList: headingsList2,
      elementsList: elementsList2
    };
  }
  function createTree(arr, startIndex = 0) {
    const tree = [];
    let i = 0;
    while (i < arr.length) {
      const node = {
        title: arr[i].innerText,
        index: startIndex + i,
        id: arr[i].id,
        node: arr[i],
        children: []
      };
      let j = i + 1;
      while (j < arr.length && parseInt(arr[j].tagName.charAt(1)) > parseInt(arr[i].tagName.charAt(1))) {
        j++;
      }
      node.children = createTree(arr.slice(i + 1, j), startIndex + i + 1);
      tree.push(node);
      i = j;
    }
    return tree;
  }
  function scrollToTargetAdjusted(selector2) {
    const element2 = document.getElementById(selector2);
    if (element2) {
      const elementPosition = element2.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - scrollOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: scrollBehaviour
      });
    }
  }
  const shouldHighlightParents = activeType === "highest-parents" || activeType === "lowest-parents" || activeType === "all-parents";
  function handleElementObservation(entries) {
    for (let i = 0; i < entries.length; i++) {
      const el_idx = elementsList.indexOf(entries[i].target);
      const toc_idx = elementHeadingLU[el_idx];
      let tempVisibleElementIdxs = visibleElementIdxs.get();
      if (entries[i].intersectionRatio >= observer_threshold) {
        if (tempVisibleElementIdxs.indexOf(el_idx) === -1) {
          tempVisibleElementIdxs = [...tempVisibleElementIdxs, el_idx];
          visibleElementIdxs.set(tempVisibleElementIdxs);
          if (shouldHighlightParents && headingParentsLU[toc_idx]) {
            activeParentIdxs.update((prev) => {
              return [...prev, ...headingParentsLU[toc_idx]];
            });
          }
        }
      } else {
        tempVisibleElementIdxs = tempVisibleElementIdxs.filter((item2) => item2 !== el_idx);
        visibleElementIdxs.set(tempVisibleElementIdxs);
        if (shouldHighlightParents && headingParentsLU[toc_idx]) {
          activeParentIdxs.update((prev) => {
            const newArr = [...prev];
            headingParentsLU[toc_idx]?.forEach((parent) => {
              const index = newArr.indexOf(parent);
              newArr.splice(index, 1);
            });
            return newArr;
          });
        }
      }
    }
    const allActiveHeaderIdxs = Array.from(new Set(visibleElementIdxs.get().map((idx) => elementHeadingLU[idx])));
    let activeHeaderIdxs;
    if (allActiveHeaderIdxs.length === 0) {
      activeHeaderIdxs = [];
    } else {
      switch (activeType) {
        case "highest":
          activeHeaderIdxs = [Math.min(...allActiveHeaderIdxs)];
          break;
        case "lowest":
          activeHeaderIdxs = [Math.max(...allActiveHeaderIdxs)];
          break;
        case "all":
          activeHeaderIdxs = allActiveHeaderIdxs;
          break;
        case "all-parents": {
          const parentIdxs = allActiveHeaderIdxs.flatMap((idx) => headingParentsLU[idx] ?? []);
          activeHeaderIdxs = [...allActiveHeaderIdxs, ...parentIdxs];
          break;
        }
        default: {
          const activeHeaderIdx = activeType === "highest-parents" ? Math.min(...allActiveHeaderIdxs) : Math.max(...allActiveHeaderIdxs);
          if (headingParentsLU[activeHeaderIdx]) {
            activeHeaderIdxs = [...headingParentsLU[activeHeaderIdx], activeHeaderIdx];
          } else {
            activeHeaderIdxs = [activeHeaderIdx];
          }
        }
      }
    }
    activeHeadingIdxs.set(activeHeaderIdxs);
  }
  function initialization() {
    observer?.disconnect();
    headingsList.forEach((h, i) => {
      headingParentsLU[i] = null;
      let current_heading = h.tagName;
      let parents = [];
      for (let j = i - 1; j >= 0; j--) {
        if (headingsList[j].tagName < current_heading) {
          current_heading = headingsList[j].tagName;
          parents = [...parents, j];
        }
      }
      headingParentsLU[i] = parents.length > 0 ? parents : null;
      const startIndex = elementsList.indexOf(headingsList[i]);
      const endIndex = i !== headingsList.length - 1 ? elementsList.indexOf(headingsList[i + 1]) : elementsList.length;
      for (let j = startIndex; j < endIndex; j++) {
        elementHeadingLU[j] = i;
      }
    });
    headingsTree.set(createTree(headingsList));
    if (activeType !== "none") {
      observer = new IntersectionObserver(handleElementObservation, {
        root: null,
        threshold: observer_threshold
      });
      elementsList.forEach((el) => observer?.observe(el));
    }
  }
  function mutationHandler() {
    const newElementTarget = document.querySelector(selector);
    if (!newElementTarget)
      return;
    const { headingsList: newHeadingsList, elementsList: newElementsList } = generateInitialLists(newElementTarget);
    if (dequal(headingsList, newHeadingsList))
      return;
    headingsList = newHeadingsList;
    elementsList = newElementsList;
    headingParentsLU = {};
    elementHeadingLU = {};
    initialization();
  }
  safeOnMount(() => {
    elementTarget = document.querySelector(selector);
    if (!elementTarget)
      return;
    ({ headingsList, elementsList } = generateInitialLists(elementTarget));
    initialization();
    mutationObserver = new MutationObserver(mutationHandler);
    mutationObserver.observe(elementTarget, { childList: true, subtree: true });
    return () => {
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  });
  const item = makeElement(name("item"), {
    stores: activeHeadingIdxs,
    returned: ($activeHeadingIdxs) => {
      return (id) => {
        const idx = headingsList.findIndex((heading) => heading.id === id);
        const active = $activeHeadingIdxs.includes(idx);
        return {
          "data-id": id,
          "data-active": active ? "" : void 0
        };
      };
    },
    action: (node) => {
      const id = node.getAttribute("data-id");
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        e.preventDefault();
        if (scrollFn) {
          scrollFn(`${id}`);
        } else {
          scrollToTargetAdjusted(`${id}`);
        }
        if (id) {
          history.pushState({}, "", `#${id}`);
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const isActive = derived(activeHeadingIdxs, ($activeHeadingIdxs) => {
    return (headingId) => {
      const idx = headingsList.findIndex((heading) => heading.id === headingId);
      return $activeHeadingIdxs.includes(idx);
    };
  });
  return {
    elements: {
      item
    },
    states: {
      activeHeadingIdxs,
      headingsTree
    },
    helpers: {
      isActive
    }
  };
}
function Tree($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    tree = [],
    activeHeadingIdxs,
    item,
    level = 1,
    isActive
  } = $$props;
  $$payload.out += `<ul class="m-0 list-none"><!--[-->`;
  if (tree && tree.length) {
    const each_array = ensure_array_like(tree);
    $$payload.out += `<!--[-->`;
    for (let i = 0; i < each_array.length; i++) {
      const heading = each_array[i];
      $$payload.out += "<!--[-->";
      const node = heading.node.innerHTML;
      const nodeWithoutSpan = node.replace(/<span.*<\/span>/g, "");
      const __MELTUI_BUILDER_0__ = store_get($$store_subs ??= {}, "$item", item)(heading.id);
      $$payload.out += `<li${attr("class", `mt-0 ${stringify(level === 1 && "border-l")}`, false)}><div${attr("class", cn("-mx-[1px] inline-flex items-center justify-center gap-1 border-l border-l-transparent pb-2 pl-4 text-muted-foreground no-underline transition-colors data-[hover]:border-l-foreground", level !== 1 ? "pl-8" : "", store_get($$store_subs ??= {}, "$isActive", isActive)(heading.id) && "border-l-foreground"), false)}><a${spread_attributes({
        href: `#${stringify(heading.id)}`,
        ...__MELTUI_BUILDER_0__,
        class: "transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[active]:text-foreground"
      })}><!--[-->${nodeWithoutSpan}<!--]--></a></div> <!--[-->`;
      if (heading.children && heading.children.length) {
        $$payload.out += `<!--[-->`;
        Tree($$payload, {
          tree: heading.children,
          level: level + 1,
          activeHeadingIdxs,
          isActive,
          item
        });
        $$payload.out += `<!--]-->`;
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += `</li>`;
      $$payload.out += "<!--]-->";
    }
    $$payload.out += "<!--]-->";
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += `</ul>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function Table_of_contents($$payload, $$props) {
  push();
  var $$store_subs;
  let { selector = "#content" } = $$props;
  const {
    elements: { item },
    states: { headingsTree, activeHeadingIdxs },
    helpers: { isActive }
  } = createTableOfContents({
    selector,
    exclude: ["h1", "h4", "h5", "h6"],
    activeType: "all",
    scrollOffset: 80
  });
  $$payload.out += `<div class="mt-1 overflow-y-auto rounded-lg p-4"><nav><!--[-->`;
  {
    $$payload.out += `<!--[-->`;
    Tree($$payload, {
      tree: store_get($$store_subs ??= {}, "$headingsTree", headingsTree),
      activeHeadingIdxs: store_get($$store_subs ??= {}, "$activeHeadingIdxs", activeHeadingIdxs),
      item,
      isActive
    });
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></nav></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let { children } = $$props;
  $$payload.out += `<!--[-->`;
  Mode_watcher($$payload, {});
  $$payload.out += `<!--]--> <!--[-->`;
  Toaster($$payload, { richColors: true });
  $$payload.out += `<!--]--> <!--[-->`;
  Header($$payload);
  $$payload.out += `<!--]--> <div class="min-h-[calc(100vh-64px)]"><div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10"><!--[-->`;
  Sidebar_nav($$payload, { items: navigation.sidebar });
  $$payload.out += `<!--]--> <main${attr("class", cn("relative pb-6 pl-4 pr-4 pt-16 md:pl-0 lg:gap-10 xl:grid-cols-[1fr_220px]", store_get($$store_subs ??= {}, "$page", page).error ?? "xl:grid"), false)}><div class="mx-auto w-full min-w-0 md:max-w-[700px]" id="content"><!--[-->`;
  children($$payload);
  $$payload.out += `<!--]--></div> <!--[-->`;
  if (!store_get($$store_subs ??= {}, "$page", page).error) {
    $$payload.out += `<div class="hidden text-sm xl:block"><div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6"><!--[-->`;
    Table_of_contents($$payload, {});
    $$payload.out += `<!--]--></div></div>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += `</main></div></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
