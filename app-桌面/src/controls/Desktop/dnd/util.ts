

const cssKeys = {
    'display': 'display',
    'width': 'width',
    'height': 'height',
    "background": "background",
    "backgroundSize": "background-size",
    "border": "border",
    "textAlign": 'text-align',
    'position': 'position',
    'left': 'left',
    'right': 'right',
    'top': 'top',
    'bottom': 'bottom',
    'margin': 'margin',
    'padding': 'padding',
    'cursor': 'cursor',
    "color": 'color',
    'overflow': 'overflow',
    'textOverflow': 'text-overflow',
    'verticalAlign': 'vertical-align',
    'webkitLineClamp': '-webkit-line-clamp',
    "webkitBoxOrient": '-webkit-box-orient',
    'alignItems': 'align-items',
    'justifyContent': 'justify-content',
    'fontSize': 'font-size',
    'borderRadius': 'border-radius',
    'float':'float'
}

type CssKeys = keyof typeof cssKeys;
const cloneStyle = (source: HTMLElement, target: HTMLElement, first: boolean) => {
    let cssText = '';
    let keys = {} as Partial<typeof cssKeys>;

    for (let [key, value] of Object.entries(cssKeys)) {
        if (first
            && key === 'position'
            || key === 'left'
            || key === 'top'
            || key === "right"
            || key === "bottom") continue;
        keys[key as keyof typeof cssKeys] = value
    }

    const styles = window.getComputedStyle(source);
    Object.keys(keys).forEach((key) => {
        if (styles[key as CssKeys]) {
            cssText += `${keys[key as CssKeys]}:${styles[key as CssKeys]};`
        }
    });
    target.style.cssText = cssText;
}

const deepCloneElementStyle = (source: HTMLElement[], target: HTMLElement[], first = true) => {
    let sourceRef = { next: [...source] };
    let targetRef = { next: [...target] }
    if (!sourceRef.next.length) return;
    sourceRef.next.forEach((item, index) => {
        cloneStyle((sourceRef.next as any)[index], (targetRef.next as any)[index], first);
        deepCloneElementStyle((sourceRef.next as any)[index].children, (targetRef.next as any)[index].children, false);
    })

}

export {
    cloneStyle,
    deepCloneElementStyle
}