"use client";

import { useEffect, useRef } from "react";
import { useEditor, DevicesProvider, WithEditor } from "@grapesjs/react";
import {
  MdOutlineVisibilityOff,
  MdInfoOutline,
  MdOutlineDesktopWindows,
} from "react-icons/md";
// import {
//   BsCodeSlash,
//   BsPalette,
//   BsGrid1X2,
//   BsTablet,
//   BsPhone,
// } from "react-icons/bs";
import { VscJson, VscPreview } from "react-icons/vsc";
import { BiUndo, BiRedo } from "react-icons/bi";
import { FiLayers } from "react-icons/fi";
import clsx from "clsx";

export default function Topbar({ className }) {
  return (
    <div className={clsx("gjs-top-sidebar", className)}>
      <DevicesProvider>
        {({ selected, select, devices }) =>
          devices.map((device) => (
            <div className="btn" value={device.id} key={device.id}>
              {device.getName()}
            </div>
          ))
        }
      </DevicesProvider>
      <WithEditor>
        {/* <TopbarButtons className="ml-auto px-2" /> */}
      </WithEditor>
    </div>
  );
}
