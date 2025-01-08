import React from "react";

import { Button } from "@carbon/react";
import { Cursor_2, Pen, Notebook, Ruler } from "@carbon/icons-react";

import './InstrumentPanel.scss'

const InstrumentPanel = () => {
  return (
    <div className="Instruments">
      <Button
        hasIconOnly={true}
        kind="secondary"
        tooltipPosition={"right"}
        tooltipAlignment={"center"}
        renderIcon={Cursor_2}
        iconDescription={"Cursor"}
      ></Button>
      <Button
        hasIconOnly={true}
        kind="secondary"
        tooltipPosition={"right"}
        tooltipAlignment={"center"}
        renderIcon={Pen}
        iconDescription={"Pen"}
      ></Button>
      <Button
        hasIconOnly={true}
        kind="secondary"
        renderIcon={Notebook}
        tooltipPosition={"right"}
        tooltipAlignment={"center"}
        iconDescription={"Notes"}
      ></Button>
      <Button
        hasIconOnly={true}
        kind="secondary"
        tooltipPosition={"right"}
        tooltipAlignment={"center"}
        renderIcon={Ruler}
        iconDescription={"Ruler"}
      ></Button>
    </div>
  );
}


export default InstrumentPanel