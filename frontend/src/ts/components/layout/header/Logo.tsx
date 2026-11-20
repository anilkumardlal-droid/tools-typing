import { Link } from "@tanstack/solid-router";
import { JSXElement } from "solid-js";
import { getRoutePage } from "../../../states/router";
import { restartTest } from "../../../test/test-logic";

export function Logo(): JSXElement {
  return (
    <Link
      to="/"
      class="flex min-w-0 shrink items-center gap-2 rounded-lg text-text"
      aria-label="Typing Test Home"
      data-ui-element="logo"
      onClick={() => {
        if (getRoutePage() === "test") void restartTest();
      }}
    >
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-current text-lg font-bold sm:h-10 sm:w-10" aria-hidden="true">T</span>
      <span class="truncate text-lg font-bold tracking-tight sm:text-xl" data-ui-element="logoText">Typing Test</span>
    </Link>
  );
}
