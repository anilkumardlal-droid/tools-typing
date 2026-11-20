import { Link } from "@tanstack/solid-router";
import { JSXElement } from "solid-js";
import { getRoutePage } from "../../../states/router";
import { isFocusMode } from "../../../states/test";
import { restartTest } from "../../../test/test-logic";
import { cn } from "../../../utils/cn";

export function Logo(): JSXElement {
  return (
    <Link
      to="/"
      class={cn("flex shrink-0 items-center rounded-lg text-base font-semibold text-text transition-colors", {
        "text-sub": isFocusMode(),
      })}
      aria-label="Typing Test Home"
      data-ui-element="logo"
      onClick={() => {
        if (getRoutePage() === "test") void restartTest();
      }}
    >
      <span data-ui-element="logoText">Typing Test</span>
    </Link>
  );
}
