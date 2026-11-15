window.__ModuleLoader__.load({
  id: 'dsh-rheostat',
  factory(require) {
    const React = require('react');
    const ReactDOM = require('react-dom');
    const h = React.createElement;
    const { useEffect, useMemo, useRef, useState, useSyncExternalStore } = React;

    const NS = 'rheostat';
    const SLOT = 'conversation.input.model';
    const LABEL_SLOT = 'conversation.input.model.label';

    const CSS = `
.rgs-root {
  min-width: 0;
  position: relative;
  --rgs-max-blue: #4d6bfe;
}

.rgs-trigger {
  border-radius: var(--dsw-radius-sm);
  min-width: 0;
  max-width: min(360px, 45cqw);
  height: 28px;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  background: 0 0;
  border: none;
  outline: none;
  align-items: center;
  gap: 4px;
  padding: 0 4px 0 8px;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  display: flex;
}

.rgs-trigger:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover);
}

.rgs-trigger:focus-visible {
  box-shadow: 0 0 0 2px var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
}

.rgs-trigger:disabled {
  color: var(--dsw-alias-label-dimmed);
  cursor: default;
}

.rgs-triggerLabel {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

.rgs-triggerEffort {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  color: color-mix(
    in srgb,
    var(--rgs-max-blue) var(--rgs-tint, 0%),
    var(--dsw-alias-label-caption)
  );
  flex-shrink: 1000;
  overflow: hidden;
  transition: color 220ms ease;
}

.rgs-triggerIcon {
  display: var(--dsh-composer-model-icon-display, none);
  flex: none;
}

.rgs-triggerLabel,
.rgs-triggerEffort {
  display: var(--dsh-composer-model-text-display, block);
}

.rgs-chevron {
  color: var(--dsw-alias-label-caption);
  flex: none;
  transition: transform .12s;
}

.rgs-chevronOpen {
  transform: rotate(180deg);
}

.rgs-spinner {
  width: 14px;
  height: 14px;
  flex: none;
  border-radius: 50%;
  border: 1.5px solid var(--dsw-alias-border-l2);
  border-top-color: var(--dsw-alias-label-secondary);
  animation: rgs-spin .7s linear infinite;
}

@keyframes rgs-spin {
  to { transform: rotate(360deg); }
}

.rgs-menu {
  z-index: 1100;
  --dsw-elevation-stroke-color: var(--dsw-alias-border-l1);
  position: fixed;
  display: flex;
  flex-direction: column;
  width: max-content;
  min-width: min(240px, 100vw - 32px);
  max-width: min(420px, 100vw - 32px);
  max-height: min(360px, 100vh - 96px);
  padding: 4px;
  border: .5px solid var(--dsw-elevation-stroke-color, var(--dsw-alias-border-l1));
  border-radius: var(--dsw-radius-lg);
  background: var(--dsw-menu-surface-fill, var(--dsw-alias-bg-overlay));
  backdrop-filter: var(--dsw-menu-backdrop-filter, blur(20px));
  box-shadow: var(--dsw-elevation-prominent, 0 12px 32px rgb(0 0 0 / 16%));
  color: var(--dsw-alias-label-primary);
  --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);
  --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);
  overflow: hidden;
}

.rgs-status,
.rgs-empty {
  color: var(--dsw-alias-label-tertiary);
  padding: 8px;
  font-size: 12px;
  line-height: 18px;
}

.rgs-error,
.rgs-warning {
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-interactive-bg-hover-danger);
  color: var(--dsw-alias-state-error-primary);
  justify-content: space-between;
  align-items: flex-start;
  gap: 6px;
  margin-bottom: 3px;
  padding: 6px 7px;
  font-size: 11px;
  line-height: 16px;
  display: flex;
}

.rgs-warning {
  background: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-state-warn-label);
}

.rgs-retry {
  color: inherit;
  font: inherit;
  cursor: pointer;
  background: 0 0;
  border: none;
  flex: none;
  padding: 0;
  font-weight: 600;
}

.rgs-searchRow {
  flex-shrink: 0;
  margin: 2px 0 3px;
  position: relative;
}

.rgs-search {
  box-sizing: border-box;
  width: 100%;
  border-radius: var(--dsw-radius-md);
  background: 0 0;
  border: 0 solid transparent;
  outline: none;
  color: var(--dsw-alias-label-primary);
  padding: 5px 7px;
  font-size: 12px;
  line-height: normal;
  display: flex;
}

.rgs-searchWithQuery {
  padding-right: 34px;
}

.rgs-search::placeholder {
  color: var(--dsw-alias-label-caption);
}

.rgs-searchClear {
  width: 24px;
  height: 24px;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
  background: 0 0;
  border: none;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  padding: 0;
  display: inline-flex;
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
}

.rgs-searchClear:hover,
.rgs-searchClear:focus-visible {
  background: var(--dsw-alias-interactive-bg-hover);
  outline: none;
}

.rgs-groups {
  min-height: 0;
  overflow-y: auto;
}

.rgs-groupLabel {
  color: var(--dsw-alias-label-tertiary);
  padding: 6px 8px 3px;
  font-size: 11px;
  line-height: 16px;
  white-space: nowrap;
}

.rgs-option {
  box-sizing: border-box;
  border-radius: var(--dsw-radius-md);
  width: auto;
  min-width: 100%;
  min-height: 34px;
  color: inherit;
  text-align: left;
  cursor: pointer;
  background: 0 0;
  border: none;
  outline: none;
  align-items: center;
  gap: 6px;
  padding: 5px 7px;
  display: flex;
}

.rgs-option:hover:not(:disabled),
.rgs-option:focus-visible {
  background: var(--dsw-alias-interactive-bg-hover);
}

.rgs-option:disabled {
  color: var(--dsw-alias-label-dimmed);
  cursor: default;
}

.rgs-optionCopy {
  flex-direction: column;
  flex: 1;
  min-width: 0;
  display: flex;
}

.rgs-modelName {
  color: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  overflow: hidden;
}

.rgs-check {
  color: var(--dsw-alias-label-primary);
  flex: 0 0 14px;
  place-items: center;
  display: grid;
}

.rgs-check svg {
  width: 14px;
  height: 14px;
}

.rgs-cell {
  box-sizing: border-box;
  border-radius: var(--dsw-radius-md);
  width: auto;
  min-width: 100%;
  height: 34px;
  color: var(--dsw-alias-label-primary);
  cursor: pointer;
  text-align: left;
  background: 0 0;
  border: none;
  outline: none;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  font-size: 13px;
  line-height: 20px;
  display: flex;
}

.rgs-cell:hover,
.rgs-cell:focus-visible {
  background: var(--dsw-alias-interactive-bg-hover);
}

.rgs-cellLabel {
  white-space: nowrap;
  flex: none;
}

.rgs-cellValue {
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  min-width: 0;
  color: var(--dsw-alias-label-tertiary);
  flex: auto;
  overflow: hidden;
}

.rgs-cellChevron {
  width: 12px;
  height: 12px;
  color: var(--dsw-alias-menu-icon);
  flex: none;
}

.rgs-effort {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* One fixed width for every level so the menu never resizes per level. */
  width: 304px;
  max-width: 100%;
  padding: 6px 8px 10px;
  /* A fixed blue for the Max state: the host brand token is monochrome. */
  --rgs-max-blue: #4d6bfe;
}

.rgs-effortHead {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  line-height: 20px;
}

.rgs-effortBody {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rgs-rice {
  display: block;
  width: 40px;
  height: 29px;
  flex: none;
}

.rgs-effortLabel {
  color: var(--dsw-alias-label-secondary);
}

.rgs-effortValue {
  color: color-mix(
    in srgb,
    var(--rgs-max-blue) var(--rgs-tint, 0%),
    var(--dsw-alias-label-tertiary)
  );
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: color 220ms ease;
}

.rgs-effortHint {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 32px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11.5px;
  line-height: 16px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: color 180ms ease;
}

.rgs-effort[data-max='true'] .rgs-effortHint {
  color: var(--dsw-alias-label-secondary);
}

.rgs-slider {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 22px;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
}

.rgs-slider__track {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 4px;
  margin-top: -2px;
  border-radius: 999px;
  background: var(--dsw-alias-border-l2);
  overflow: hidden;
}

.rgs-slider__fill {
  height: 100%;
  width: var(--rgs-progress, 0%);
  border-radius: inherit;
  background: color-mix(
    in srgb,
    var(--rgs-max-blue) var(--rgs-tint, 0%),
    var(--dsw-alias-brand-primary)
  );
  transition:
    width 180ms cubic-bezier(.2, .7, .3, 1),
    background-color 220ms ease;
}

.rgs-slider__thumb {
  position: absolute;
  top: 50%;
  left: var(--rgs-progress, 0%);
  width: 12px;
  height: 12px;
  /* Content-box: 12px + 2px borders per side, so half the outer box is 8px. */
  margin: -8px 0 0 -8px;
  border-radius: 50%;
  background: color-mix(
    in srgb,
    var(--rgs-max-blue) var(--rgs-tint, 0%),
    var(--dsw-alias-brand-primary)
  );
  border: 2px solid var(--dsw-alias-bg-overlay);
  box-shadow: 0 0 0 1px var(--dsw-alias-border-l2), 0 1px 2px rgb(0 0 0 / 18%);
  transition:
    left 180ms cubic-bezier(.2, .7, .3, 1),
    transform 120ms ease,
    box-shadow 120ms ease,
    background-color 220ms ease;
  will-change: left;
}

.rgs-slider[data-dragging='true'] .rgs-slider__fill,
.rgs-slider[data-dragging='true'] .rgs-slider__thumb {
  transition: none;
}

.rgs-slider[data-max='true'] .rgs-slider__thumb {
  transform: scale(1.08);
  box-shadow:
    0 0 0 1px var(--dsw-alias-border-l2),
    0 0 0 2px color-mix(in srgb, var(--rgs-max-blue) 15%, transparent),
    0 0 8px 1px color-mix(in srgb, var(--rgs-max-blue) 28%, transparent);
}

.rgs-slider__wind {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 220ms ease;
}

.rgs-slider[data-max='true'] .rgs-slider__wind {
  opacity: 1;
}

.rgs-slider__wind i {
  position: absolute;
  top: 0;
  right: 0;
  height: var(--h, 2.5px);
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--rgs-max-blue) 0%,
    color-mix(in srgb, var(--rgs-max-blue) 45%, transparent) 78%,
    transparent 100%
  );
  box-shadow: 0 0 5px color-mix(in srgb, var(--rgs-max-blue) 35%, transparent);
  transform-origin: right center;
  opacity: 0;
  /* One shared speed and an evenly spaced start per line keeps the stream
     continuous instead of bunched into groups. */
  animation: rgs-line-left 5s linear infinite;
  animation-delay: calc(var(--i, 0) * 0.25s);
}

.rgs-slider:not([data-max='true']) .rgs-slider__wind i {
  animation-play-state: paused;
}

.rgs-slider__wind i:nth-child(3n + 1) {
  --h: 3px;
  --alpha: 1;
}

.rgs-slider__wind i:nth-child(3n + 2) {
  --h: 2px;
  --alpha: .55;
}

.rgs-slider__wind i:nth-child(3n + 3) {
  --h: 2.5px;
  --alpha: .8;
}

.rgs-slider__wind i:nth-child(1) {
  width: 64px;
  margin-top: -10px;
  --i: 0;
}

.rgs-slider__wind i:nth-child(2) {
  width: 30px;
  margin-top: -8px;
  --i: 1;
}

.rgs-slider__wind i:nth-child(3) {
  width: 52px;
  margin-top: -6px;
  --i: 2;
}

.rgs-slider__wind i:nth-child(4) {
  width: 22px;
  margin-top: -4px;
  --i: 3;
}

.rgs-slider__wind i:nth-child(5) {
  width: 58px;
  margin-top: -2px;
  --i: 4;
}

.rgs-slider__wind i:nth-child(6) {
  width: 36px;
  margin-top: 0;
  --i: 5;
}

.rgs-slider__wind i:nth-child(7) {
  width: 30px;
  margin-top: 2px;
  --i: 6;
}

.rgs-slider__wind i:nth-child(8) {
  width: 60px;
  margin-top: 4px;
  --i: 7;
}

.rgs-slider__wind i:nth-child(9) {
  width: 20px;
  margin-top: 6px;
  --i: 8;
}

.rgs-slider__wind i:nth-child(10) {
  width: 46px;
  margin-top: 8px;
  --i: 9;
}

.rgs-slider__wind i:nth-child(11) {
  width: 34px;
  margin-top: 10px;
  --i: 10;
}

.rgs-slider__wind i:nth-child(12) {
  width: 54px;
  margin-top: -11px;
  --i: 11;
}

.rgs-slider__wind i:nth-child(13) {
  width: 40px;
  margin-top: -9px;
  --i: 12;
}

.rgs-slider__wind i:nth-child(14) {
  width: 26px;
  margin-top: -5px;
  --i: 13;
}

.rgs-slider__wind i:nth-child(15) {
  width: 50px;
  margin-top: -1px;
  --i: 14;
}

.rgs-slider__wind i:nth-child(16) {
  width: 18px;
  margin-top: 3px;
  --i: 15;
}

.rgs-slider__wind i:nth-child(17) {
  width: 44px;
  margin-top: 7px;
  --i: 16;
}

.rgs-slider__wind i:nth-child(18) {
  width: 56px;
  margin-top: -3px;
  --i: 17;
}

.rgs-slider__wind i:nth-child(19) {
  width: 34px;
  margin-top: 5px;
  --i: 18;
}

.rgs-slider__wind i:nth-child(20) {
  width: 48px;
  margin-top: 9px;
  --i: 19;
}

@keyframes rgs-line-left {
  0% {
    opacity: 0;
    right: 0;
    transform: scaleX(.9);
  }
  8% {
    opacity: calc(.55 * var(--alpha, 1));
  }
  55% {
    opacity: calc(.5 * var(--alpha, 1));
  }
  88% {
    opacity: calc(.22 * var(--alpha, 1));
  }
  100% {
    opacity: 0;
    right: 100%;
    transform: scaleX(1);
  }
}

.rgs-slider:hover:not([data-disabled='true']) .rgs-slider__thumb {
  transform: scale(1.08);
}

.rgs-slider[data-max='true']:hover:not([data-disabled='true']) .rgs-slider__thumb {
  transform: scale(1.14);
}

.rgs-slider:focus-visible .rgs-slider__thumb {
  box-shadow:
    0 0 0 1px var(--dsw-alias-border-l2),
    0 0 0 4px color-mix(in srgb, var(--dsw-alias-brand-primary) 32%, transparent);
}

.rgs-slider[data-disabled='true'] {
  opacity: 0.5;
  cursor: default;
}

.rgs-ticks {
  position: relative;
  height: 14px;
}

.rgs-tick {
  position: absolute;
  top: 0;
  color: var(--dsw-alias-label-tertiary);
  font-size: 10px;
  line-height: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.rgs-tickActive {
  color: var(--dsw-alias-label-secondary);
}
`;

    const MEASURE_STYLE = { visibility: 'hidden', left: 0, top: 0 };

    function groupName(group, t) {
      return group.id === 'deepseek-account' ? t('provider.account') : group.name;
    }

    function orderGroups(groups) {
      return [...groups].sort((left, right) => {
        const rank = (group) => group.id === 'deepseek-account' ? 0 : group.id === 'deepseek-official' ? 1 : 2;
        return rank(left) - rank(right);
      });
    }

    function IconChevronDown({ className }) {
      return h('svg', {
        className,
        width: 12,
        height: 12,
        viewBox: '0 0 12 12',
        'aria-hidden': true,
        fill: 'none',
      }, h('path', {
        d: 'M2.6 4.6 6 8l3.4-3.4',
        stroke: 'currentColor',
        strokeWidth: 1.2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }));
    }

    function IconChevronRight({ className }) {
      return h('svg', {
        className,
        width: 12,
        height: 12,
        viewBox: '0 0 12 12',
        'aria-hidden': true,
        fill: 'none',
      }, h('path', {
        d: 'M4.6 2.6 8 6l-3.4 3.4',
        stroke: 'currentColor',
        strokeWidth: 1.2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }));
    }

    function IconCheck() {
      return h('svg', {
        viewBox: '0 0 12 12',
        'aria-hidden': true,
        fill: 'none',
      }, h('path', {
        d: 'M2.5 6.2 4.9 8.6 9.5 3.4',
        stroke: 'currentColor',
        strokeWidth: 1.4,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }));
    }

    function IconData({ className }) {
      return h('svg', {
        className,
        width: 16,
        height: 16,
        viewBox: '0 0 16 16',
        'aria-hidden': true,
        fill: 'none',
      },
      h('ellipse', { cx: 8, cy: 4.5, rx: 4.6, ry: 1.9, stroke: 'currentColor', strokeWidth: 1.2 }),
      h('path', { d: 'M3.4 4.5v7c0 1 2 1.9 4.6 1.9s4.6-.9 4.6-1.9v-7', stroke: 'currentColor', strokeWidth: 1.2 }),
      h('path', { d: 'M3.4 8c0 1 2 1.9 4.6 1.9s4.6-.9 4.6-1.9', stroke: 'currentColor', strokeWidth: 1.2 }));
    }

    function IconClose({ className }) {
      return h('svg', {
        className,
        width: 12,
        height: 12,
        viewBox: '0 0 12 12',
        'aria-hidden': true,
        fill: 'none',
      }, h('path', {
        d: 'M3 3l6 6M9 3l-6 6',
        stroke: 'currentColor',
        strokeWidth: 1.3,
        strokeLinecap: 'round',
      }));
    }

    function effortIndex(efforts, current, defaultEffort) {
      const id = current ?? defaultEffort;
      if (id === undefined) return -1;
      return efforts.findIndex((effort) => effort.id === id);
    }

    const HINT_KEYS = {
      off: 'hint.off',
      low: 'hint.low',
      high: 'hint.high',
      max: 'hint.max',
    };

    /**
     * An original little rice bowl: the heap shrinks with the level and an
     * empty bowl marks Max. `fill` is 1 at the first level and 0 at the last.
     */
    function RiceBowl({ fill, id }) {
      const level = Math.min(1, Math.max(0, fill));
      const rimY = 14;
      const bottom = 30;
      const riceTop = rimY + (1 - level) * (bottom - rimY - 5);
      const heaped = level > 0.9;
      const hasRice = level > 0.02;
      return h('svg', {
        className: 'rgs-rice',
        viewBox: '0 0 44 32',
        'aria-hidden': true,
      },
      h('path', { d: 'M4 14 H40 C39 25 32 30 22 30 C12 30 5 25 4 14 Z', fill: '#9a6636' }),
      h('ellipse', {
        cx: 22,
        cy: rimY,
        rx: 18,
        ry: 3.4,
        fill: 'none',
        stroke: '#7c4f28',
        strokeWidth: 2.2,
      }),
      h('clipPath', { id: `${id}-inner` },
        h('path', { d: 'M5.5 14 C6.3 24.5 13 28.5 22 28.5 C31 28.5 37.7 24.5 38.5 14 Z' })),
      h('g', { 'clip-path': `url(#${id}-inner)` },
        h('ellipse', { cx: 22, cy: 26.5, rx: 13, ry: 2.6, fill: '#5e3a1f', opacity: 0.3 }),
        hasRice
          ? h('rect', { x: 0, y: riceTop, width: 44, height: 24, fill: '#fffdf8' })
          : null,
        hasRice
          ? h('ellipse', {
              cx: 22,
              cy: riceTop,
              rx: 17,
              ry: 2.2,
              fill: '#f3ecdf',
              stroke: '#e0d3bd',
              strokeWidth: 0.8,
            })
          : null),
      heaped
        ? h('path', {
            d: 'M9 14.5 C12 9.5 16 5.5 22 4.5 C28 5.5 32 9.5 35 14.5 Z',
            fill: '#fffdf8',
            stroke: '#d9cbb4',
            strokeWidth: 1,
          })
        : null,
      heaped
        ? h('path', {
            d: 'M16.6 10.2 q2.6 -2 5.4 -1.2',
            fill: 'none',
            stroke: '#ddcfb9',
            strokeWidth: 1,
            strokeLinecap: 'round',
          })
        : null,
      heaped
        ? h('path', {
            d: 'M18.4 13 q3.4 -1.6 6.6 -.8',
            fill: 'none',
            stroke: '#ddcfb9',
            strokeWidth: 1,
            strokeLinecap: 'round',
          })
        : null);
    }

    function EffortSlider({ reasoning, current, commit, t }) {
      const efforts = reasoning.efforts;
      const effective = current ? current.reasoningEffort ?? reasoning.defaultEffort : reasoning.defaultEffort;
      let committed = effortIndex(efforts, current ? current.reasoningEffort : undefined, reasoning.defaultEffort);
      if (committed < 0) committed = 0;
      const max = Math.max(0, efforts.length - 1);

      const [value, setValue] = useState(committed);
      const [dragging, setDragging] = useState(false);
      const [windKey, setWindKey] = useState(0);
      const [bowlId] = useState(() => `rgs-bowl-${Math.random().toString(36).slice(2, 8)}`);
      const lastSent = useRef(null);
      const latestSend = useRef(0);
      const dragRef = useRef(false);
      const trackRef = useRef(null);
      const wasMax = useRef(null);
      const committedRef = useRef(committed);
      committedRef.current = committed;

      useEffect(() => {
        if (dragRef.current) return;
        setValue(committed);
      }, [committed, efforts.length]);

      useEffect(() => {
        lastSent.current = null;
      }, [committed]);

      /* Dragging is never blocked by a pending selection: the directory keeps
         the newest selection, so the slider stays responsive and the latest
         release wins. */
      const blocked = efforts.length < 2;
      const shownIndex = Math.min(Math.max(0, Math.round(value)), Math.max(0, efforts.length - 1));
      const selected = efforts[shownIndex] ?? efforts[0];
      const hintKey = selected ? HINT_KEYS[String(selected.id).toLowerCase()] : undefined;
      const riceFill = efforts.length > 1 ? 1 - shownIndex / (efforts.length - 1) : 1;
      const progress = max > 0 ? (value / max) * 100 : 0;
      const atMax = max > 0 && shownIndex === max;

      useEffect(() => {
        // Restart the stream on every Max entry so the lines always set off
        // from the knob instead of appearing mid-track.
        if (wasMax.current === null) {
          wasMax.current = atMax;
          if (atMax) setWindKey((key) => key + 1);
          return;
        }
        if (atMax && !wasMax.current) setWindKey((key) => key + 1);
        wasMax.current = atMax;
      }, [atMax]);

      const stopAt = (event) => {
        const track = trackRef.current;
        if (!track) return 0;
        const rect = track.getBoundingClientRect();
        if (rect.width <= 0 || max === 0) return 0;
        const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        return ratio * max;
      };

      const send = async (rawIndex) => {
        const index = Math.min(max, Math.max(0, Math.round(rawIndex)));
        const effort = efforts[index];
        if (!effort) return;
        if (effort.id === effective || effort.id === lastSent.current) return;
        const token = ++latestSend.current;
        lastSent.current = effort.id;
        let accepted = false;
        try {
          accepted = await commit(effort.id);
        } catch {
          accepted = false;
        }
        if (token !== latestSend.current) return;
        if (!accepted) {
          lastSent.current = null;
          setValue(committedRef.current);
        }
      };

      const finish = (event) => {
        if (!dragRef.current) return;
        dragRef.current = false;
        setDragging(false);
        const next = Math.min(max, Math.max(0, Math.round(stopAt(event))));
        setValue(next);
        try {
          if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        } catch {
          // The pointer may already be released.
        }
        void send(next);
      };

      const cancel = () => {
        if (!dragRef.current) return;
        dragRef.current = false;
        setDragging(false);
        setValue(committed);
      };

      const onKeyDown = (event) => {
        if (event.key === 'Escape' && dragRef.current) {
          event.preventDefault();
          cancel();
          return;
        }
        if (blocked) return;
        let next = shownIndex;
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = Math.min(max, shownIndex + 1);
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next = Math.max(0, shownIndex - 1);
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = max;
        else return;
        event.preventDefault();
        if (next === shownIndex) return;
        setValue(next);
        void send(next);
      };

      return h('div', {
        className: 'rgs-effort',
        'data-max': atMax ? 'true' : undefined,
        style: { '--rgs-tint': `${progress}%` },
      },
        h('div', { className: 'rgs-effortHead' },
          h('span', { className: 'rgs-effortLabel' }, t('menu.effort')),
          h('span', { className: 'rgs-effortValue' }, selected ? selected.name : ''),
        ),
        h('div', { className: 'rgs-effortBody' },
          hintKey
            ? h('p', { className: 'rgs-effortHint' }, t(hintKey))
            : h('span', { className: 'rgs-effortHint', 'aria-hidden': true }),
          h(RiceBowl, { fill: riceFill, id: bowlId }),
        ),
        h('div', {
          ref: trackRef,
          className: 'rgs-slider',
          role: 'slider',
          tabIndex: blocked ? -1 : 0,
          'aria-label': t('menu.effort'),
          'aria-valuemin': 0,
          'aria-valuemax': max,
          'aria-valuenow': shownIndex,
          'aria-valuetext': selected ? selected.name : '',
          'aria-disabled': blocked ? true : undefined,
          'data-dragging': dragging ? 'true' : undefined,
          'data-disabled': efforts.length < 2 ? 'true' : undefined,
          'data-max': atMax ? 'true' : undefined,
          style: {
            '--rgs-progress': `${progress}%`,
            '--rgs-tint': `${progress}%`,
          },
          onPointerDown: (event) => {
            if (blocked || event.button !== 0) return;
            dragRef.current = true;
            setDragging(true);
            event.currentTarget.focus();
            try {
              event.currentTarget.setPointerCapture(event.pointerId);
            } catch {
              // Pointer capture is an enhancement; dragging still works without it.
            }
            setValue(stopAt(event));
          },
          onPointerMove: (event) => {
            if (!dragRef.current) return;
            setValue(stopAt(event));
          },
          onPointerUp: finish,
          onPointerCancel: cancel,
          onKeyDown,
        },
        h('div', { className: 'rgs-slider__track' },
          h('div', { className: 'rgs-slider__fill' })),
        h('span', { key: windKey, className: 'rgs-slider__wind', 'aria-hidden': true },
          h('i'), h('i'), h('i'), h('i'), h('i'), h('i'), h('i'), h('i'), h('i'),
          h('i'), h('i'), h('i'), h('i'), h('i'), h('i'), h('i'), h('i'), h('i'),
          h('i'), h('i')),
        h('div', { className: 'rgs-slider__thumb' })),
        efforts.length > 1
          ? h('div', { className: 'rgs-ticks', 'aria-hidden': true },
              efforts.map((effort, index) => {
                const pct = (index / (efforts.length - 1)) * 100;
                const anchor = index === 0
                  ? 'none'
                  : index === efforts.length - 1
                    ? 'translateX(-100%)'
                    : 'translateX(-50%)';
                return h('span', {
                  key: effort.id,
                  className: index === shownIndex ? 'rgs-tick rgs-tickActive' : 'rgs-tick',
                  style: { left: `${pct}%`, transform: anchor },
                }, effort.name);
              }))
          : null,
      );
    }

    const EMPTY_STATE = { current: null, groups: [], status: 'idle', pending: null, failures: [] };

    /* Resolution pacing: start fast enough to win a cold-start race, back off to
       a steady poll so a slow session still recovers, and finally hand the seat
       back to the built-in selector rather than leaving a dead trigger. */
    const RESOLVE_DELAY_MIN = 150;
    const RESOLVE_DELAY_MAX = 2000;
    const RESOLVE_GIVE_UP_ATTEMPTS = 40;

    /**
     * Visible stand-in for the model seat while the session's model directory
     * cannot be resolved yet (a cold session, a slow connection). It retries on
     * click and the wrapper retries in the background, so the composer never
     * loses its model button to a transient failure.
     */
    function FallbackSeat({ t, onRetry }) {
      return h('button', {
        type: 'button',
        className: 'rgs-trigger',
        title: t('trigger.connecting'),
        onClick: onRetry,
      },
      h(IconData, { className: 'rgs-triggerIcon' }),
      h('span', { className: 'rgs-triggerLabel' }, t('trigger.connecting')),
      h('span', { className: 'rgs-spinner', 'aria-hidden': true }));
    }

    function ModelSeat(props) {
      const { available, directory, resolve, load } = props;
      const t = typeof props.t === 'function' ? props.t : (key) => key;
      const [store, setStore] = useState(directory || null);
      const [probes, setProbes] = useState(0);
      const [reason, setReason] = useState(null);

      useEffect(() => {
        if (directory) setStore(directory);
      }, [directory]);

      /* The slot's inject result is cached per session scope, so the first read
         can land before the client session binding exists. A failed read there
         is a transient composition state, not a verdict: re-read it until the
         directory shows up instead of latching onto the placeholder. */
      useEffect(() => {
        if (!available || store) return undefined;
        let cancelled = false;
        let timer = 0;
        let delay = RESOLVE_DELAY_MIN;
        let attempts = 0;
        const tick = () => {
          if (cancelled) return;
          let outcome = null;
          try {
            outcome = typeof resolve === 'function' ? resolve() : null;
          } catch (failure) {
            outcome = { store: null, error: failure instanceof Error ? failure.message : String(failure) };
          }
          if (outcome && outcome.store) {
            setReason(null);
            setStore(outcome.store);
            return;
          }
          attempts += 1;
          setProbes(attempts);
          setReason(outcome?.error ?? 'unresolved');
          delay = Math.min(RESOLVE_DELAY_MAX, Math.round(delay * 1.6));
          timer = setTimeout(tick, delay);
        };
        timer = setTimeout(tick, 0);
        return () => {
          cancelled = true;
          clearTimeout(timer);
        };
      }, [available, store, resolve]);

      /* Reading the directory once is what asks the Host for the model catalog;
         without this the trigger can sit on an idle catalog forever. */
      useEffect(() => {
        if (store) load?.();
      }, [store, load]);

      if (!available) return null;
      if (!store) {
        if (probes >= RESOLVE_GIVE_UP_ATTEMPTS) {
          /* Shadowing the shipped seat only earns its keep while this one can
             actually read the session's directory. Failing that, abdicate so the
             composer regains the built-in selector. */
          throw new Error(`dsh-rheostat: model directory unavailable (${reason ?? 'unknown'})`);
        }
        return h(FallbackSeat, {
          t,
          onRetry: () => {
            let outcome = null;
            try {
              outcome = typeof resolve === 'function' ? resolve() : null;
            } catch (failure) {
              outcome = { store: null, error: failure instanceof Error ? failure.message : String(failure) };
            }
            if (outcome && outcome.store) setStore(outcome.store);
          },
        });
      }
      return h(SeatView, { ...props, directory: store });
    }

    function SeatView(props) {
      const { locked, directory, load, select, renderSlot } = props;
      const t = typeof props.t === 'function' ? props.t : (key) => key;
      const state = useSyncExternalStore(
        (listener) => (directory ? directory.subscribe(listener) : () => {}),
        () => (directory ? directory.getSnapshot() : EMPTY_STATE),
      );
      const [open, setOpen] = useState(false);
      const [pane, setPane] = useState('root');
      const [query, setQuery] = useState('');
      const [menuPos, setMenuPos] = useState(null);
      const [error, setError] = useState(null);
      const rootRef = useRef(null);
      const triggerRef = useRef(null);
      const menuRef = useRef(null);
      const searchRef = useRef(null);
      const [menuId] = useState(() => `rgs-${Math.random().toString(36).slice(2, 8)}`);

      const groups = useMemo(() => orderGroups(state.groups || []).map((group) => ({
        ...group,
        provider: { id: group.id, name: groupName(group, t) },
      })), [state.groups, t]);

      const choices = useMemo(() => groups.flatMap((group) => group.models.map((model) => ({
        group,
        model,
        selection: {
          provider: group.id,
          model: model.id,
          ...model.reasoning?.defaultEffort === undefined ? {} : { reasoningEffort: model.reasoning.defaultEffort },
        },
      }))), [groups]);

      const showSearch = choices.length > 4;
      const trimmed = query.trim().toLowerCase();
      const filteredGroups = useMemo(() => groups.map((group) => ({
        ...group,
        models: trimmed === ''
          ? group.models
          : group.models.filter((model) => model.name.toLowerCase().includes(trimmed)),
      })).filter((group) => group.models.length > 0), [groups, trimmed]);

      const currentChoice = state.current === null
        ? undefined
        : choices.find((choice) => choice.selection.provider === state.current.provider && choice.selection.model === state.current.model);
      const reasoning = currentChoice && currentChoice.model.reasoning
        && Array.isArray(currentChoice.model.reasoning.efforts)
        ? currentChoice.model.reasoning
        : undefined;
      const effectiveEffort = state.current?.reasoningEffort ?? reasoning?.defaultEffort;
      const effortLabel = currentChoice === undefined
        ? undefined
        : reasoning === undefined
          ? state.retainedEffort
          : effectiveEffort === undefined
            ? t('effort.providerDefault')
            : reasoning.efforts.find((effort) => effort.id === effectiveEffort)?.name ?? effectiveEffort;
      const pending = state.pending ?? null;
      const busy = pending !== null || state.status === 'selecting';

      const renderLabel = (group, model, placement, selected) => {
        const provider = group.provider;
        if (typeof renderSlot === 'function') {
          try {
            return renderSlot(LABEL_SLOT, { provider, model, placement, selected }, { fallback: model.name });
          } catch {
            return model.name;
          }
        }
        return model.name;
      };

      useEffect(() => {
        if (!open) return;
        const closeOutside = (event) => {
          if (rootRef.current?.contains(event.target) === true) return;
          if (menuRef.current?.contains(event.target) === true) return;
          setOpen(false);
          setPane('root');
        };
        document.addEventListener('mousedown', closeOutside);
        return () => document.removeEventListener('mousedown', closeOutside);
      }, [open]);

      useEffect(() => {
        if (!open) {
          setMenuPos(null);
          return;
        }
        const place = () => {
          const trigger = triggerRef.current;
          const menu = menuRef.current;
          if (!trigger || !menu) return;
          const rect = trigger.getBoundingClientRect();
          const width = menu.offsetWidth || 240;
          const height = menu.offsetHeight || 0;
          const margin = 12;
          let left = rect.right - width;
          let top = rect.top - 8 - height;
          left = Math.min(Math.max(left, margin), window.innerWidth - width - margin);
          top = Math.min(Math.max(top, margin), window.innerHeight - height - margin);
          setMenuPos({ left, top });
        };
        place();
        window.addEventListener('scroll', place, true);
        window.addEventListener('resize', place);
        const observer = typeof ResizeObserver !== 'undefined' && menuRef.current !== null
          ? new ResizeObserver(place)
          : null;
        if (observer && menuRef.current !== null) observer.observe(menuRef.current);
        return () => {
          window.removeEventListener('scroll', place, true);
          window.removeEventListener('resize', place);
          observer?.disconnect();
        };
      }, [open, pane, query]);

      /* A cold client can reach the model catalog before the Host generation is
         ready; the shared catalog then stays failed until somebody asks again
         and the trigger reads "Select model" forever. Ask again in the
         background so the seat recovers on its own. */
      const catalogStatus = state.status;
      useEffect(() => {
        if (catalogStatus !== 'error' && catalogStatus !== 'idle') return undefined;
        let cancelled = false;
        let timer = 0;
        let delay = 700;
        let tries = 0;
        const retry = () => {
          if (cancelled || tries >= 8) return;
          tries += 1;
          load();
          delay = Math.min(8000, Math.round(delay * 1.8));
          timer = setTimeout(retry, delay);
        };
        timer = setTimeout(retry, delay);
        return () => {
          cancelled = true;
          clearTimeout(timer);
        };
      }, [catalogStatus, load]);

      if (!directory) return null;

      const show = () => {
        setError(null);
        setQuery('');
        setPane(currentChoice === undefined ? 'model' : 'root');
        setOpen(true);
        load();
      };

      const close = (restoreFocus) => {
        setOpen(false);
        setPane('root');
        setQuery('');
        if (restoreFocus) queueMicrotask(() => triggerRef.current?.focus());
      };

      const submit = (selection, keepOpen) => {
        setError(null);
        triggerRef.current?.focus();
        let result;
        try {
          result = select(selection);
        } catch (failure) {
          setError(failure instanceof Error ? failure.message : String(failure));
          return;
        }
        Promise.resolve(result).then((outcome) => {
          if (outcome === undefined) return;
          if (outcome.ok) {
            if (!keepOpen) close(true);
            return;
          }
          const failure = outcome.error;
          setError(failure?.code === 'session/writer-held'
            ? t('error.sessionInUse')
            : t('error.action', { message: failure ? `${failure.code}: ${failure.message}` : 'unknown error' }));
        }, (failure) => setError(t('error.action', { message: String(failure?.message ?? failure) })));
      };

      const commitEffort = (effortId) => {
        if (!state.current) return Promise.resolve(false);
        return Promise.resolve(select({
          provider: state.current.provider,
          model: state.current.model,
          reasoningEffort: effortId,
        })).then((outcome) => {
          if (outcome && outcome.ok) return true;
          const failure = outcome?.error;
          setError(failure?.code === 'session/writer-held'
            ? t('error.sessionInUse')
            : t('error.action', { message: failure ? `${failure.code}: ${failure.message}` : 'unknown error' }));
          return false;
        }, () => false);
      };

      const chooseModel = (group, model) => {
        if (state.current?.provider === group.id && state.current.model === model.id) {
          close(true);
          return;
        }
        submit({ provider: group.id, model: model.id });
      };

      const onKeyDown = (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          if (pane !== 'root') {
            setPane('root');
            return;
          }
          close(true);
        }
      };

      const onBlur = (event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && (rootRef.current?.contains(next) === true || menuRef.current?.contains(next) === true)) return;
        close();
      };

      const waiting = currentChoice === undefined && (state.status === 'loading' || state.status === 'idle');
      const failing = currentChoice === undefined && state.status === 'error';
      /* A known selection whose catalog entry has not arrived yet still names
         the model the session will use, which beats a bare placeholder. */
      const modelLabel = waiting
        ? t('trigger.loading')
        : currentChoice
          ? currentChoice.model.name
          : failing
            ? t('trigger.failed')
            : state.current
              ? state.current.model
              : t('trigger.fallback');
      const triggerText = effortLabel === undefined ? modelLabel : `${modelLabel} · ${effortLabel}`;
      const currentEffortIndex = reasoning === undefined
        ? -1
        : reasoning.efforts.findIndex((effort) => effort.id === effectiveEffort);
      const effortTint = reasoning !== undefined && reasoning.efforts.length > 1 && currentEffortIndex > 0
        ? (currentEffortIndex / (reasoning.efforts.length - 1)) * 100
        : 0;
      const triggerAria = waiting
        ? t('trigger.loading')
        : currentChoice === undefined
          ? failing
            ? t('trigger.failed')
            : t('trigger.fallback')
          : effortLabel === undefined
            ? t('trigger.modelAria', { model: modelLabel })
            : t('trigger.aria', { model: modelLabel, effort: effortLabel });

      const modelPane = h('div', { key: 'models' },
        showSearch
          ? h('div', { className: 'rgs-searchRow' },
              h('input', {
                ref: searchRef,
                className: query === '' ? 'rgs-search' : 'rgs-search rgs-searchWithQuery',
                type: 'text',
                role: 'searchbox',
                'aria-label': t('search.placeholder'),
                placeholder: t('search.placeholder'),
                value: query,
                readOnly: busy,
                onChange: (event) => setQuery(event.currentTarget.value),
                onKeyDown: (event) => {
                  if (event.key === 'Enter') {
                    const first = filteredGroups[0]?.models[0];
                    if (first) chooseModel(filteredGroups[0], first);
                  }
                },
              }),
              query === ''
                ? null
                : h('button', {
                    type: 'button',
                    className: 'rgs-searchClear',
                    'aria-label': t('search.clear'),
                    disabled: busy,
                    onClick: () => {
                      setQuery('');
                      searchRef.current?.focus();
                    },
                  }, h(IconClose)),
            )
          : null,
        state.status === 'loading' ? h('div', { className: 'rgs-status' }, t('status.loading')) : null,
        error !== null ? h('div', { className: 'rgs-error', role: 'alert' },
          h('span', null, error),
          h('button', {
            type: 'button',
            className: 'rgs-retry',
            onClick: () => {
              setError(null);
              load();
            },
          }, t('action.reload'))) : null,
        (state.failures || []).map((failure) => h('div', { key: failure.id, className: 'rgs-warning' },
          h('span', null, t('warning.groupLoad', {
            name: failure.id === 'deepseek-account' ? t('provider.account') : failure.name,
            message: failure.message,
          })),
          h('button', {
            type: 'button',
            className: 'rgs-retry',
            onClick: () => {
              setError(null);
              load();
            },
          }, t('action.reload')))),
        h('div', { className: 'rgs-groups', role: 'menu', 'aria-label': t('menu.model') },
          filteredGroups.map((group) => h('div', { key: group.id },
            h('div', { className: 'rgs-groupLabel' }, group.provider.name),
            group.models.map((model) => {
              const selected = state.current?.provider === group.id && state.current.model === model.id;
              const pendingRow = pending !== null && pending.provider === group.id && pending.model === model.id;
              return h('button', {
                key: model.id,
                type: 'button',
                role: 'menuitemradio',
                'aria-checked': selected,
                className: 'rgs-option',
                title: model.name,
                disabled: busy,
                onClick: () => chooseModel(group, model),
              },
              h('span', { className: 'rgs-optionCopy' },
                h('span', {
                  className: 'rgs-modelName',
                  'data-provider-id': group.provider.id,
                  'data-model-id': model.id,
                }, renderLabel(group, model, 'option', selected))),
              h('span', { className: 'rgs-check' },
                pendingRow ? h('span', { className: 'rgs-spinner' }) : selected ? h(IconCheck) : null));
            }))),
        ),
        state.status === 'ready' && filteredGroups.length === 0
          ? h('div', { className: 'rgs-empty', role: 'status' }, t(choices.length === 0 ? 'empty.models' : 'search.empty'))
          : null,
      );

      const effortPane = reasoning === undefined
        ? h('div', { className: 'rgs-empty' }, t('empty.efforts'))
        : h('div', { key: 'effort' },
            error !== null ? h('div', { className: 'rgs-error', role: 'alert' }, h('span', null, error)) : null,
            h(EffortSlider, {
              reasoning,
              current: state.current,
              commit: commitEffort,
              t,
            }));

      const menu = open ? ReactDOM.createPortal(
        h('div', {
          ref: menuRef,
          id: `${menuId}-menu`,
          className: 'rgs-menu',
          role: pane === 'model' ? 'group' : 'menu',
          'aria-label': t('menu.aria'),
          style: menuPos === null ? MEASURE_STYLE : { left: menuPos.left, top: menuPos.top },
          onKeyDown,
          onBlur,
        },
        pane === 'root'
          ? h(React.Fragment, null,
              h('button', {
                type: 'button',
                role: 'menuitem',
                className: 'rgs-cell',
                onClick: () => { setQuery(''); setPane('model'); },
              },
              h('span', { className: 'rgs-cellLabel' }, t('menu.model')),
              h('span', { className: 'rgs-cellValue' }, currentChoice === undefined ? modelLabel : renderLabel(currentChoice.group, currentChoice.model, 'menu', true)),
              h(IconChevronRight, { className: 'rgs-cellChevron' })),
              reasoning === undefined
                ? null
                : h('button', {
                    type: 'button',
                    role: 'menuitem',
                    className: 'rgs-cell',
                    onClick: () => setPane('effort'),
                  },
                  h('span', { className: 'rgs-cellLabel' }, t('menu.effort')),
                  h('span', { className: 'rgs-cellValue' }, effortLabel),
                  h(IconChevronRight, { className: 'rgs-cellChevron' })))
          : pane === 'model'
            ? modelPane
            : effortPane),
        document.body)
        : null;

      return h('div', { ref: rootRef, className: 'rgs-root', onBlur, onKeyDown },
        h('button', {
          ref: triggerRef,
          type: 'button',
          className: 'rgs-trigger',
          'aria-label': triggerAria,
          'aria-haspopup': 'menu',
          'aria-expanded': open,
          'aria-controls': open ? `${menuId}-menu` : undefined,
          title: triggerText,
          disabled: locked,
          onClick: () => {
            if (open) close(true);
            else show();
          },
          onKeyDown: (event) => {
            if (!open || event.key !== 'Tab' || event.shiftKey) return;
            const first = menuRef.current?.querySelector('input, button');
            if (first) {
              event.preventDefault();
              first.focus();
            }
          },
        },
        h(IconData, { className: 'rgs-triggerIcon' }),
        h('span', { className: 'rgs-triggerLabel' },
          currentChoice === undefined ? modelLabel : renderLabel(currentChoice.group, currentChoice.model, 'trigger', true)),
        effortLabel === undefined
          ? null
          : h('span', {
              className: 'rgs-triggerEffort',
              style: { '--rgs-tint': `${effortTint}%` },
            }, effortLabel),
        pending !== null ? h('span', { className: 'rgs-spinner', 'aria-hidden': true }) : h(IconChevronDown, { className: open ? 'rgs-chevron rgs-chevronOpen' : 'rgs-chevron' })),
        menu,
      );
    }

    return {
      inject: ['slots', 'sessions', 'modelDirectories', 'locale'],
      apply(ctx) {
        ctx.effect(
          () =>
            ctx.locale.register(NS, {
              zh: {
                'provider.account': 'DeepSeek 账号',
                'trigger.fallback': '请选择模型',
                'trigger.loading': '正在加载模型…',
                'trigger.connecting': '正在连接模型服务…',
                'trigger.failed': '模型列表加载失败',
                'trigger.modelAria': '选择模型，当前 {model}',
                'trigger.aria': '选择模型，当前 {model}，推理等级 {effort}',
                'menu.aria': '模型与推理等级',
                'menu.model': '模型',
                'menu.effort': '推理等级',
                'effort.providerDefault': 'Default',
                'status.loading': '正在刷新模型列表…',
                'empty.models': '暂无可用模型',
                'empty.efforts': '当前模型未提供推理等级。',
                'hint.off': '超级省钱的大肥鱼，就是不太聪明',
                'hint.low': '智商稍有回归的大肥鱼',
                'hint.high': '聪明的大肥鱼',
                'hint.max': '超强大肥鱼，以最快的速度消耗你的午饭',
                'search.placeholder': '搜索模型…',
                'search.clear': '清除搜索',
                'search.empty': '没有匹配的模型。',
                'action.reload': '重新加载',
                'error.action': '模型操作失败：{message}',
                'warning.groupLoad': '{name} 加载失败：{message}',
                'error.sessionInUse': '当前会话已被占用，可能是其他正在运行的 DSH 导致的（如其他 dsh web、桌面端），请退出其他正在运行的 DSH 后重试。',
              },
              en: {
                'provider.account': 'DeepSeek Account',
                'trigger.fallback': 'Select model',
                'trigger.loading': 'Loading models…',
                'trigger.connecting': 'Connecting to the model service…',
                'trigger.failed': 'Model list failed to load',
                'trigger.modelAria': 'Select model, current {model}',
                'trigger.aria': 'Select model, current {model}, reasoning effort {effort}',
                'menu.aria': 'Model and reasoning effort',
                'menu.model': 'Model',
                'menu.effort': 'Effort',
                'effort.providerDefault': 'Default',
                'status.loading': 'Refreshing model list…',
                'empty.models': 'No models available.',
                'empty.efforts': 'This model provides no reasoning effort levels.',
                'hint.off': 'A super-thrifty big fat fish — just not very bright',
                'hint.low': 'The big fat fish with most of its wits back',
                'hint.high': 'The smart big fat fish',
                'hint.max': 'The mighty big fat fish, burning through your lunch at top speed',
                'search.placeholder': 'Search models…',
                'search.clear': 'Clear search',
                'search.empty': 'No matching models.',
                'action.reload': 'Reload',
                'error.action': 'Model operation failed: {message}',
                'warning.groupLoad': '{name} failed to load: {message}',
                'error.sessionInUse': 'This session is already in use, possibly by another running DSH instance (such as dsh web or the desktop app). Quit other running DSH instances and try again.',
              },
            }),
          'rheostat: locale',
        );

        const style = document.createElement('style');
        style.dataset.plugin = 'dsh-rheostat';
        style.textContent = CSS;
        document.head.append(style);
        ctx.effect(() => () => style.remove(), 'rheostat: styles');

        ctx.slots.inject(SLOT, () => ctx.slots.register({
          name: SLOT,
          locale: NS,
          // The shipped model seat registers at priority 0; the lowest
          // priority renders, so -1 shadows it and restoring it is just
          // unloading this plugin.
          priority: -1,
          inject: (sessionId) => {
            let available = true;
            try {
              const sessions = ctx.sessions;
              if (sessions && typeof sessions.subagentAddress === 'function') {
                available = sessions.subagentAddress(sessionId) === undefined;
              }
            } catch {
              available = true;
            }

            /* The service is read through the live context on every probe: a
               cached reference outlives a Host generation reset, the getter
               does not. */
            const serviceOf = () => {
              try {
                if (ctx.modelDirectories) return ctx.modelDirectories;
              } catch {
                // Fall through to the explicit lookup below.
              }
              try {
                return typeof ctx.get === 'function' ? ctx.get('modelDirectories') : undefined;
              } catch {
                return undefined;
              }
            };

            const currentDirectory = () => {
              const service = serviceOf();
              if (!service) return { directory: null, error: 'modelDirectories service unavailable' };
              try {
                return { directory: service.directoryFor(sessionId) || null, error: null };
              } catch (failure) {
                return {
                  directory: null,
                  error: failure instanceof Error ? failure.message : String(failure),
                };
              }
            };

            const resolve = () => {
              if (!available) return { store: null, error: 'session is not selectable' };
              const { directory, error } = currentDirectory();
              if (!directory) return { store: null, error: error ?? 'no directory for this session' };
              if (!directory.store) return { store: null, error: 'directory exposes no store' };
              return { store: directory.store, error: null };
            };

            return {
              available,
              directory: resolve().store,
              resolve,
              load: () => {
                if (!available) return;
                const { directory } = currentDirectory();
                if (!directory) return;
                Promise.resolve(directory.load()).catch(() => {});
              },
              select: (selection) => {
                if (!available) return Promise.resolve(undefined);
                const { directory } = currentDirectory();
                if (!directory) return Promise.resolve(undefined);
                try {
                  return directory.select(selection);
                } catch (failure) {
                  return Promise.reject(failure);
                }
              },
            };
          },
        }, ModelSeat));
      },
    };
  },
});
