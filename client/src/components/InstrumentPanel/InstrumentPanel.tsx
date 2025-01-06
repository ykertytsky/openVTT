import React from "react";

import { Tile, Button } from "@carbon/react";
import { Cursor, Pen, Notebook, Ruler } from "@carbon/icons-react";

import './InstrumentPanel.scss'

const InstrumentPanel = () => {
  return (
    <Tile className="Instruments">
      <Ruler size={20}/>
    </Tile>
  );
}


export default InstrumentPanel