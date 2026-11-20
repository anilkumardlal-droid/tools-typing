import { JSXElement } from "solid-js";

import { getRoutePage } from "../../../states/router";
import { isFocusMode } from "../../../states/test";
import { restartTest } from "../../../test/test-logic";
import { cn } from "../../../utils/cn";
import { Button } from "../../common/Button";

/** Guest-only navigation. Account, login, alerts and online leaderboards are
 * deliberately omitted; typing, settings and about keep their original UI. */
export function Nav(): JSXElement {
  const buttonClass = () =>
    cn("whitespace-nowrap", {
      "opacity-(--nav-focus-opacity)": isFocusMode(),
    });

  return (
    <nav class="z-5 flex w-full flex-wrap items-center justify-end gap-1 md:gap-2">
      <Button
        variant="text"
        text="Typing Test"
        to="/"
        class={buttonClass()}
        dataset={{ "data-nav-item": "test" }}
        onClick={() => {
          if (getRoutePage() === "test") void restartTest();
        }}
      />
      <Button
        variant="text"
        text="About"
        to="/about"
        class={buttonClass()}
        dataset={{ "data-nav-item": "about" }}
      />
      <Button
        variant="text"
        text="Settings"
        to="/settings"
        class={buttonClass()}
        dataset={{ "data-nav-item": "settings" }}
      />
      <div class="grow" />
    </nav>
  );
}
