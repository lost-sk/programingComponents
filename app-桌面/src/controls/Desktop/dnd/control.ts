import {
    deepCloneElementStyle
} from './util';

const createDndRef = (ref: HTMLElement) => {
    ref.style.visibility = 'hidden';
    const dndRef = document.createElement('div');
    let { top, left, width, height } = ref.getBoundingClientRect()!;
    top = top + document.documentElement.scrollTop;
    left = left + document.documentElement.scrollLeft;

    let refNextChild = ref;
    let cloneNextChild = ref.cloneNode(true) as HTMLElement;

    deepCloneElementStyle([refNextChild], [cloneNextChild])

    const marginTop = parseFloat(window.getComputedStyle(ref).marginTop) || 0;
    const marginLeft = parseFloat(window.getComputedStyle(ref).marginLeft) || 0;

    const originWidth = ref.offsetWidth;
    const originHeight = ref.offsetHeight;



    dndRef.style.position = 'absolute';
    dndRef.style.zIndex = '999';
    dndRef.style.left = `${left - (marginLeft || 0) * width / originWidth}px`;
    dndRef.style.top = `${top - (marginTop || 0) * height / originHeight}px`;
    dndRef.style.transformOrigin = 'left top';
    dndRef.style.transform = `scale(${width / originWidth},${height / originHeight})`;
    dndRef.style.cursor = 'pointer';
    dndRef.style.pointerEvents = 'none';
    dndRef.id = 'dnd-dom';
    dndRef.appendChild(cloneNextChild);
    document.body.appendChild(dndRef)
    return { dndRef, top, left, width, height };
}
const setDndRefStyle = (state: any, ref: HTMLElement) => {
    const {
        cEvent,
        sEvent,
        dndRef,
        boundary,
        left, top, width, height,
        timestamp
    } = state;
    // if (Date.now() - timestamp < 300) return;
    const startPageX = sEvent?.pageX!;
    const startPageY = sEvent?.pageY!;

    const currentPageX = cEvent?.pageX!;
    const currentPageY = cEvent?.pageY!;

    const dx = currentPageX - startPageX;
    const dy = currentPageY - startPageY;

    const originWidth = ref.offsetWidth;
    const originHeight = ref.offsetHeight;

    const xRadio = width / originWidth;
    const yRadio = height / originHeight;



    let translateX = dx;
    let translateY = dy;

    const boundaryElement = boundary && boundary.current ? boundary.current : document.documentElement

    let { left: x1, top: y1, width: boundaryWidth, height: boundaryHeight } = boundaryElement.getBoundingClientRect();

    x1 = x1 + document.documentElement.scrollLeft;
    y1 = y1 + document.documentElement.scrollTop;

    const x2 = x1 + boundaryWidth;
    const y2 = y1 + boundaryHeight;


    if (left + dx < x1) translateX = x1 - left;
    if (left + width + dx > x2) translateX = x2 - left - width;
    if (top + dy < y1) translateY = y1 - top;
    if (top + height + dy > y2) translateY = y2 - top - height;

    dndRef!.style.display = 'inherit'
    dndRef!.style.transform = `translate(${translateX}px,${translateY}px) scale(${xRadio},${yRadio})`
}

const cleanDndRefStyle = (dndRef: HTMLElement, ref: HTMLElement) => {
    setTimeout(() => {
        ref!.style.visibility = ''
        dndRef?.parentElement?.removeChild(dndRef);
    }, 0);

}


const setMoveRefStyle = (state: any, ref: HTMLElement) => {
    const {
        pageX,
        pageY,
        cEvent,
        lastTranslate = [0, 0]
    } = state;


    const offsetLeft = ref.offsetLeft;
    const offsetTop = ref.offsetTop;
    const offsetWidth = ref.offsetWidth;
    const offsetHeight = ref.offsetHeight;

    const dx = cEvent.pageX - pageX;
    const dy = cEvent.pageY - pageY;

    let translateX = lastTranslate[0] + dx;
    let translateY = lastTranslate[1] + dy;


    const x1 = 0;
    const y1 = 0;
    const x2 = document.documentElement.offsetWidth;
    const y2 = document.documentElement.offsetHeight;


    if (offsetLeft + translateX <= x1) translateX = -offsetLeft;
    if (offsetLeft + offsetWidth + translateX >= x2) translateX = x2 - offsetLeft - offsetWidth;
    if (offsetTop + translateY <= y1) translateY = -offsetTop;
    if (offsetTop + offsetHeight + translateY >= y2) translateY = y2 - offsetTop - offsetHeight;

    ref.style.transform = `translate(${translateX}px,${translateY}px)`

    return [translateX, translateY]

}

export {
    createDndRef,
    setDndRefStyle,
    cleanDndRefStyle,
    setMoveRefStyle
}