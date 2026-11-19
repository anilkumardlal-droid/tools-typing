import { format } from "date-fns/format";
import {
  createMemo,
  JSXElement,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
} from "solid-js";

import { getConfig } from "../../../../config/store";
import { useRefWithUtils } from "../../../../hooks/useRefWithUtils";
import { getAdBlock, getCookieBlocker } from "../../../../states/ads";
import { getIsScreenshotting } from "../../../../states/core";
import { getGlarsesMode } from "../../../../states/glarses-mode";
import { getFrozenLog, getLastResult } from "../../../../states/test";
import { restartTest } from "../../../../test/test-logic";
import { registerFade } from "../../../../test/test-page-bridge";
import { cn } from "../../../../utils/cn";
import {
  applyReducedMotion,
  scrollToCenterOrTop,
} from "../../../../utils/misc";
import { AdIcon } from "../../../common/AdIcon";
import { adSlotClass, adSlotRef } from "../../../common/Advertisement";
import { Button } from "../../../common/Button";
import { Fa } from "../../../common/Fa";
import { ResultButtons } from "./ResultButtons";
import { ResultChart } from "./ResultChart";
import { ResultMainStats } from "./ResultMainStats";
import { ResultReplay } from "./ResultReplay";
import { ResultSecondaryStats } from "./ResultSecondaryStats";
import { ResultWordsHistory } from "./ResultWordsHistory";

// clicks on these keep their own focus
const INTERACTIVE_SELECTOR =
  'a, button, input, select, textarea, label, [contenteditable], [tabindex]:not([tabindex="-1"])';

export function TestResult(): JSXElement {
  let prefocusRef: HTMLDivElement | undefined;

  onMount(() => prefocusRef?.focus({ preventScroll: true }));

  const lastTest = createMemo(() => {
    const result = getLastResult();
    const eventLog = getFrozenLog();
    return result !== null && eventLog !== null ? { result, eventLog } : null;
  });

  const [resultRef, resultEl] = useRefWithUtils<HTMLDivElement>();
  onMount(() => {
    const el = resultEl();
    if (el === undefined) return;

    void el.promiseAnimate({
      opacity: [0, 1],
      duration: applyReducedMotion(125),
    });
    scrollToCenterOrTop(el.native);
  });

  // restartTest fades it out
  const unregisterFade = registerFade("result", async (direction, duration) => {
    await resultEl()?.promiseAnimate({
      opacity: direction === "in" ? [0, 1] : 0,
      duration,
    });
  });
  onCleanup(unregisterFade);

  return (
    <div
      id="result"
      ref={resultRef}
      class={cn("content-grid full-width")}
      onClick={(e) => {
        // a click on plain content drops focus to the body, and Tab would
        // then skip the next test button: put focus back on the prefocus
        if (!(e.target instanceof Element)) return;
        if (e.target.closest(INTERACTIVE_SELECTOR) !== null) return;
        prefocusRef?.focus({ preventScroll: true });
      }}
    >
      <Show when={getGlarsesMode()}>
        <div class="col-span-full pb-8 text-center text-[2rem]">
          <Fa icon="fa-check" />
        </div>
      </Show>
      <Show
        when={lastTest()}
        fallback={
          <>
            <div class="mx-auto">Missing last test result data.</div>
            <Button
              class="mx-auto mt-4 w-max px-4 py-2"
              text="Restart"
              fa={{ icon: "fa-chevron-right" }}
              onClick={() => void restartTest()}
            />
          </>
        }
      >
        {(test) => (
          <div id="resultScreenshotTarget">
            <Show when={!getGlarsesMode()}>
              <div class={cn("mb-4 grid gap-4 md:grid-cols-[auto_1fr]")}>
                <ResultMainStats
                  result={test().result}
                  eventLog={test().eventLog}
                />
                <ResultChart
                  result={test().result}
                  eventLog={test().eventLog}
                />
              </div>
              <ResultSecondaryStats result={test().result} />
              <ResultWordsHistory eventLog={test().eventLog} />
              <ResultReplay />
            </Show>
            <div
              ref={(el) => (prefocusRef = el)}
              class="focus:outline-none focus-visible:outline-none"
              tabIndex="-1"
            ></div>
            <ResultButtons glarses={getGlarsesMode()} />

            <Watermark />
          </div>
        )}
      </Show>
      <ResultAds />
    </div>
  );
}

function Watermark(): JSXElement {
  return (
    <Show when={getIsScreenshotting()}>
      {(_) => {
        // created per screenshot so the date is current
        const date = format(new Date(), "dd MMM yyyy HH:mm");
        return (
          <div class="col-span-full flex flex-wrap justify-end gap-x-[1em] text-[1.25rem] text-sub [&_.fas]:ml-[0.33em]">
            <span>{date}</span>
            <span>|</span>
            <span>monkeytype.com</span>
          </div>
        );
      }}
    </Show>
  );
}

/**
 * Ad slots are filled by the ad controllers, so the markup must stay static.
 */
function ResultAds(): JSXElement {
  return (
    <div
      class={cn("full-width mt-4", {
        hidden: getIsScreenshotting() || getConfig.ads === "off",
      })}
    >
      <div
        id="ad-result-wrapper"
        ref={adSlotRef("ad-result-wrapper")}
        class={cn(adSlotClass("h"), "full-width mx-auto")}
      >
        <div class="grid grid-cols-[auto_1fr] items-center justify-center gap-4 justify-self-center">
          <AdIcon class="h-auto w-auto" />
          <div class="text-base text-sub">
            <Switch>
              <Match when={getAdBlock()}>
                Using an ad blocker? No worries
                <div class="text-[0.7rem]">
                  We understand ads can be annoying
                  <br />
                  You can <i>disable all ads</i> in the settings
                </div>
              </Match>
              <Match when={getCookieBlocker()}>
                Ads not working? Ooops
                <div class="text-[0.7rem]">
                  You may have a cookie popup blocker enabled - ads will not
                  show without your consent
                  <br />
                  You can also <i>disable all ads</i> in the settings if you
                  wish
                </div>
              </Match>
            </Switch>
          </div>
        </div>
        <div id="ad-result"></div>
      </div>
      <div
        id="ad-result-small-wrapper"
        ref={adSlotRef("ad-result-small-wrapper")}
        class={cn(adSlotClass("hs"), "mx-auto")}
      >
        <AdIcon small />
        <div id="ad-result-small"></div>
      </div>
    </div>
  );
}
