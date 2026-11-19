import { JSXElement } from "solid-js";

import { CommandlineModal } from "./CommandlineModal";
import { ContactModal } from "./ContactModal";
import { CookiesModal } from "./CookiesModal";
import { CustomTestDurationModal } from "./CustomTestDurationModal";
import { CustomTextModal } from "./CustomTextModal";
import { CustomWordAmountModal } from "./CustomWordAmountModal";
import { EditResultTagsModal } from "./EditResultTagsModal";
import { MobileTestConfigModal } from "./MobileTestConfigModal";
import { PbTablesModal } from "./PbTablesModal";
import { PractiseWordsModal } from "./PractiseWordsModal";
import { AddPresetModal } from "./preset/AddPresetModal";
import { EditPresetModal } from "./preset/EditPresetModal";
import { QuoteRateModal } from "./QuoteRateModal";
import { QuoteReportModal } from "./QuoteReportModal";
import { QuoteSearchModal } from "./QuoteSearchModal";
import { ShareTestSettings } from "./ShareTestSettings";
import { SimpleModal } from "./SimpleModal";
import { StreakHourOffsetModal } from "./StreakHourOffsetModal";
import { SupportModal } from "./SupportModal";
import { TheRestModal } from "./TheRestModal";
import { VersionHistoryModal } from "./VersionHistoryModal";

export function Modals(): JSXElement {
  return (
    <>
      <CommandlineModal />
      <VersionHistoryModal />
      <ContactModal />
      <SupportModal />
      <SimpleModal />
      <CustomTextModal />
      <QuoteRateModal />
      <QuoteReportModal />
      <QuoteSearchModal />
      <CustomTestDurationModal />
      <CustomWordAmountModal />
      <PbTablesModal />
      <PractiseWordsModal />
      <ShareTestSettings />
      <MobileTestConfigModal />
      <CookiesModal />
      <AddPresetModal />
      <EditPresetModal />
      <StreakHourOffsetModal />
      <EditResultTagsModal />
      <TheRestModal />
    </>
  );
}
