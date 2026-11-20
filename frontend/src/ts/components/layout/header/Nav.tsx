import { JSXElement } from "solid-js";
import { getRoutePage } from "../../../states/router";
import { restartTest } from "../../../test/test-logic";
import { Button } from "../../common/Button";

export function Nav(): JSXElement {
  const restartIfOnTest = (): void => {
    if (getRoutePage() === "test") void restartTest();
  };
  return (
    <nav class="relative z-20 flex shrink-0 items-center" aria-label="Main navigation">
      <div class="hidden items-center gap-2 md:flex">
        <Button variant="text" to="/" fa={{ icon: "fa-keyboard", fixedWidth: true }} balloon={{ text: "Typing Test" }} onClick={restartIfOnTest} />
        <Button variant="text" to="/about" fa={{ icon: "fa-info-circle", fixedWidth: true }} balloon={{ text: "About" }} />
        <Button variant="text" to="/settings" fa={{ icon: "fa-cog", fixedWidth: true }} balloon={{ text: "Settings" }} />
      </div>
      <details class="group relative md:hidden">
        <summary class="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg text-text focus-visible:outline-2" aria-label="Open navigation menu" title="Menu">
          <svg aria-hidden="true" viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </summary>
        <div class="absolute right-0 top-full z-50 mt-2 grid min-w-52 gap-1 rounded-xl border border-sub bg-bg p-2 shadow-lg">
          <Button variant="text" to="/" text="Home / Typing Test" fa={{ icon: "fa-home", fixedWidth: true }} class="w-full justify-start" onClick={restartIfOnTest} />
          <Button variant="text" to="/settings" text="Settings" fa={{ icon: "fa-cog", fixedWidth: true }} class="w-full justify-start" />
          <Button variant="text" to="/about" text="About" fa={{ icon: "fa-info-circle", fixedWidth: true }} class="w-full justify-start" />
        </div>
      </details>
    </nav>
  );
}
