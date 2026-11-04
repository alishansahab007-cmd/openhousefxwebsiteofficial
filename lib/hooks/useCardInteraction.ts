"use client";

import { useCallback, useState, type FocusEvent, type PointerEvent } from "react";

export interface CardInteractionBind {
  tabIndex: number;
  onPointerEnter: (event: PointerEvent) => void;
  onPointerLeave: (event: PointerEvent) => void;
  onPointerDown: (event: PointerEvent) => void;
  onFocus: (event: FocusEvent) => void;
  onBlur: (event: FocusEvent) => void;
}

export interface UseCardInteractionResult {
  active: boolean;
  bind: CardInteractionBind;
}

/**
 * Unifies mouse/pen hover, keyboard focus, and touch into one `active`
 * boolean so every service-card treatment (crossfade, video, pan/zoom, 3D
 * preview) reacts identically regardless of input device. Touch has no
 * hover state, so a tap toggles `active` instead of setting it — pointer
 * enter/leave are ignored for touch to avoid a phantom hover firing right
 * before the tap.
 *
 * `forceActive` lets an external controller (e.g. a selector button outside
 * the card) drive activation directly, ORed with the card's own hover/
 * focus/touch state — passing nothing preserves every existing caller's
 * behavior exactly.
 */
export function useCardInteraction(forceActive = false): UseCardInteractionResult {
  const [active, setActive] = useState(false);

  const onPointerEnter = useCallback((event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    setActive(true);
  }, []);

  const onPointerLeave = useCallback((event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    setActive(false);
  }, []);

  const onPointerDown = useCallback((event: PointerEvent) => {
    if (event.pointerType !== "touch") return;
    setActive((prev) => !prev);
  }, []);

  const onFocus = useCallback(() => setActive(true), []);
  const onBlur = useCallback(() => setActive(false), []);

  return {
    active: forceActive || active,
    bind: {
      tabIndex: 0,
      onPointerEnter,
      onPointerLeave,
      onPointerDown,
      onFocus,
      onBlur,
    },
  };
}
