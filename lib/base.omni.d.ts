/// <reference path="../typings/lib/window.d.ts" />
declare namespace VomnibarNS {
interface BaseFgOptions extends Pick<CmdOptions[kFgCmd.vomnibar], "s" | "t"> {
  // physical pixel size (if C<52) and devicePixelRatio
  w: number;
  h: number;
  z: number;
  p: "" | FgRes[kFgReq.parseSearchUrl];
}
interface FgOptions extends BaseFgOptions, Partial<GlobalOptions> {
  url?: string | null;
}
type MessageData = [id: "VimiumC", secret: string, options: FgOptions | null]
interface Msg<T extends (kCReq | kFReq) & number> { N: T }

const enum kCReq {
  activate, hide, focus,
  _mask = "",
}
const enum kFReq {
  hide, focus, style, iframeIsAlive,
  hud, evalJS, scroll, scrollGoing, scrollEnd, broken, unload,
  _mask = "",
}
interface CReq {
  [kCReq.activate]: FgOptions & Msg<kCReq.activate>;
  [kCReq.hide]: kCReq.hide;
  [kCReq.focus]: kCReq.focus;
}
interface FReq {
  [kFReq.hide]: {
  };
  [kFReq.scroll]: {
    /** key */ k: string;
    /** keybody */ b: kChar;
  };
  [kFReq.style]: {
    // unit: physical pixel (if C<52)
    h: number;
    m?: number;
  };
  [kFReq.hud]: { k: kTip };
  [kFReq.focus]: {
    /** lastKey */ l: kKeyCode;
  };
  [kFReq.evalJS]: {
    u: string;
  };
  [kFReq.broken]: {};
  [kFReq.scrollEnd]: {};
  [kFReq.scrollGoing]: {};
  [kFReq.unload]: {};
  [kFReq.iframeIsAlive]: { /** hasOptionsPassed */ o: BOOL };
}
interface IframePort {
  postMessage<K extends keyof FReq> (this: IframePort, msg: FReq[K] & Msg<K>): void | 1;
  onmessage (this: void, msg: { data: CReq[keyof CReq] }): void | 1;
}
type FgOptionsToFront = CReq[kCReq.activate];

interface ContentOptions extends GlobalOptions {}
}
