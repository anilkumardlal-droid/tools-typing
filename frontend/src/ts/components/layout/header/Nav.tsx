import { JSXElement } from "solid-js";

import { getRoutePage } from "../../../states/router";
import { isFocusMode } from "../../../states/test";
import { restartTest } from "../../../test/test-logic";
import { cn } from "../../../utils/cn";
import { Button } from "../../common/Button";

/** Compact icon navigation on desktop; labeled, accessible menu on mobile. */
export function Nav(): JSXElement {
  const buttonClass = () =>
    cn("whitespace-nowrap", {
      "opacity-(--nav-focus-opacity)": isFocusMode(),
    });
  const restartIfOnTest = (): void => {
    if (getRoutePage() === "test") void restartTest();
  };

  return (
    <nav class="relative z-20 flex items-center" aria-label="Main navigation">
      <div class="hidden items-center gap-1 md:flex">
        <Button variant="text" to="/" fa={{ icon: "fa-keyboard", fixedWidth: true }} balloon={{ text: "Typing Test" }} class={buttonClass()} onClick={restartIfOnTest} />
        <Button variant="text" to="/about" fa={{ icon: "fa-info-circle", fixedWidth: true }} balloon={{ text: "About" }} class={buttonClass()} />
        <Button variant="text" to="/settings" fa={{ icon: "fa-cog", fixedWidth: true }} balloon={{ text: "Settings" }} class={buttonClass()} />
      </div>
      <details class="relative md:hidden">
        <summary class="flex cursor-pointer list-none items-center rounded p-2 text-text focus-visible:outline-2" aria-label="Open navigation menu" title="Menu">
          <span aria-hidden="true" class="text-xl leading-none">⋮</span>
        </summary>
        <div class="absolute right-0 top-full z-50 mt-2 grid min-w-44 gap-1 rounded-lg bg-sub-alt p-2 shadow-lg">
          <Button variant="text" to="/" text="Home / Typing Test" fa={{ icon: "fa-home", fixedWidth: true }} class="w-full justify-start" onClick={restartIfOnTest} />
          <Button variant="text" to="/settings" text="Settings" fa={{ icon: "fa-cog", fixedWidth: true }} class="w-full justify-start" />
          <Button variant="text" to="/about" text="About" fa={{ icon: "fa-info-circle", fixedWidth: true }} class="w-full justify-start" />
        </div>
      </details>
    </nav>
  );
}
