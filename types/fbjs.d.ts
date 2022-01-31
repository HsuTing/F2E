declare module 'fbjs/lib/getElementPosition' {
  function getElementPosition(dom: HTMLElement): {
    width: number;
    height: number;
    x: number;
    y: number;
  };

  export default getElementPosition;
}

declare module 'fbjs/lib/isEmpty' {
  function isEmpty(data: unknown): boolean;

  export default isEmpty;
}
