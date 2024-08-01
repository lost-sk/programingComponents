export const BASE_URL = window.location.origin;
export const APP_ID = "App_a12a1b5333b19ee933cc257f2bfcdc74";
export const NAMESPACE = "supos_desktoplts";
export const OBJECT_NAME = "desktop";
export const ASSETS_UI_IMAGE_PATH = `/resource/${APP_ID}/assets/image/ui/`;
export const ASSETS_COMPONENT_IMAGE_PATH = `/resource/${APP_ID}/assets/image/component/`;
export const RUN_TIME_PAGE_BASE_URL =
  BASE_URL + "/#/runtime-fullscreen/runtime-fullscreen/";
export const SYSTEM_PAGE_BASE_URL = BASE_URL;
export const TOKEN = localStorage.getItem("ticket");
export const BACKGROUND_IMAGE_DEFAULT = `${ASSETS_UI_IMAGE_PATH}desktop_bg_01.webp`;
export const AVATAR_DEFAULT = `${ASSETS_UI_IMAGE_PATH}avatar.png`;
export const APP_COVER_DEFAULT = "/assets/fonts/fe9a844a.png";
export const version = "2.2.15";

export const BasePath = {
  OODM_SERVER: {
    v3: `/project/dam/supngin/api/dam/runtime/${NAMESPACE}/template/${OBJECT_NAME}/service/${NAMESPACE}`,
    v4: `/inter-api/oodm-gateway/runtime/${NAMESPACE}/template/${OBJECT_NAME}/service/${NAMESPACE}`,
    v2: "",
  },
  OODM_INNER_SERVER: {
    v3: `/project/dam/supngin/api/dam/runtime/${NAMESPACE}/template/${OBJECT_NAME}/service/system`,
    v4: `/inter-api/oodm-gateway/runtime/${NAMESPACE}/template/${OBJECT_NAME}/service/system`,
    v2: "",
  },
  DESIGN: {
    v3: "/design.html#/design/hellow",
    v4: "/#/design",
    v2: "",
  },
  PATH: {
    v3: "/",
    v4: "/main",
  },
};

export const desktopInfoKeys = [
  "background",
  "currentPlan",
  "iconSize",
  "layoutData",
  "ownAppList",
  "username",
];

export enum APP_ICON_SIZE {
  LARGE,
  NORMAL,
  SMALL,
}

export const sourceType = {
  AUTHORITY_APP: "AUTHORITY_APP",
  IN_FOLDER: "IN_FOLDER",
  SHOW_APP: "SHOW_APP",
  SHOW_FOLDER: "SHOW_FOLDER",
} as const;

export const targetType = {
  SHOW_APP: "SHOW_APP",
  SHOW_APP_LIST: "SHOW_APP_LIST",
  SHOW_FOLDER: "SHOW_FOLDER",
};

export const backgroundImages = new Array(4)
  .fill(0)
  .map((_, index) => `${ASSETS_UI_IMAGE_PATH}desktop_bg_0${index + 1}.webp`);

export interface IconSizeConfig {
  text: "大" | "中" | "小";
  type: APP_ICON_SIZE;
  style: "large" | "normal" | "small";
  radio?: number;
}

export const iconSizeConfig: Array<IconSizeConfig> = [
  {
    text: "大",
    type: APP_ICON_SIZE.LARGE,
    style: "large",
  },
  {
    text: "中",
    type: APP_ICON_SIZE.NORMAL,
    style: "normal",
  },
  {
    text: "小",
    type: APP_ICON_SIZE.SMALL,
    style: "small",
  },
];

export enum BLOCK_TYPE {
  LAYOUT,
  CONTAINER,
  ROW,
  COLUMN,
}

const LAYOUT_DESC_01 = {
  type: BLOCK_TYPE.LAYOUT,
  direction: BLOCK_TYPE.ROW,
  grow: 1,
  children: [
    {
      type: BLOCK_TYPE.LAYOUT,
      grow: 2,
      direction: BLOCK_TYPE.COLUMN, //横切
      children: [
        {
          type: BLOCK_TYPE.LAYOUT,
          grow: 1,
          direction: BLOCK_TYPE.ROW, //竖切
          children: [
            {
              sizeType: "C",
              type: BLOCK_TYPE.CONTAINER, //最小子元素
              grow: 1,
            },
            {
              type: BLOCK_TYPE.CONTAINER,
              sizeType: "C",
              grow: 1,
            },
          ],
        },
        {
          type: BLOCK_TYPE.LAYOUT,
          grow: 1,
          direction: BLOCK_TYPE.ROW,
          children: [
            {
              type: BLOCK_TYPE.CONTAINER,
              sizeType: "C",
              grow: 1,
            },
            {
              type: BLOCK_TYPE.CONTAINER,
              sizeType: "C",
              grow: 1,
            },
          ],
        },
      ],
    },
    {
      type: BLOCK_TYPE.LAYOUT,
      grow: 1,
      direction: BLOCK_TYPE.COLUMN,
      children: [
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
      ],
    },
  ],
};

const LAYOUT_DESC_02 = {
  type: BLOCK_TYPE.LAYOUT,
  direction: BLOCK_TYPE.ROW,
  grow: 1,
  children: [
    {
      sizeType: "A",
      type: BLOCK_TYPE.CONTAINER,
      grow: 2,
    },
    {
      type: BLOCK_TYPE.LAYOUT,
      grow: 1,
      direction: BLOCK_TYPE.COLUMN,
      children: [
        {
          sizeType: "D",
          type: BLOCK_TYPE.CONTAINER,
          grow: 1,
        },
        {
          sizeType: "D",
          type: BLOCK_TYPE.CONTAINER,
          grow: 1,
        },
        {
          sizeType: "D",
          type: BLOCK_TYPE.CONTAINER,
          grow: 1,
        },
      ],
    },
  ],
};

const LAYOUT_DESC_03 = {
  type: BLOCK_TYPE.LAYOUT,
  direction: BLOCK_TYPE.ROW,
  grow: 1,
  children: [
    {
      type: BLOCK_TYPE.LAYOUT,
      grow: 2,
      direction: BLOCK_TYPE.COLUMN, //横切
      children: [
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "B",
          grow: 1,
        },
        {
          type: BLOCK_TYPE.LAYOUT,
          grow: 1,
          direction: BLOCK_TYPE.COLUMN,
          children: [
            {
              type: BLOCK_TYPE.LAYOUT,
              grow: 1,
              direction: BLOCK_TYPE.ROW,
              children: [
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
              ],
            },
            {
              type: BLOCK_TYPE.LAYOUT,
              grow: 1,
              direction: BLOCK_TYPE.ROW,
              children: [
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: BLOCK_TYPE.LAYOUT,
      grow: 1,
      direction: BLOCK_TYPE.COLUMN,
      children: [
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
      ],
    },
  ],
};

const LAYOUT_DESC_04 = {
  type: BLOCK_TYPE.LAYOUT,
  direction: BLOCK_TYPE.ROW,
  grow: 1,
  children: [
    {
      type: BLOCK_TYPE.LAYOUT,
      grow: 2,
      direction: BLOCK_TYPE.COLUMN,
      children: [
        {
          type: BLOCK_TYPE.LAYOUT,
          direction: BLOCK_TYPE.ROW,
          grow: 1,
          children: [
            {
              type: BLOCK_TYPE.CONTAINER,
              sizeType: "C",
              grow: 1,
            },
            {
              type: BLOCK_TYPE.LAYOUT,
              direction: BLOCK_TYPE.COLUMN,
              grow: 1,
              children: [
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
              ],
            },
          ],
        },
        {
          type: BLOCK_TYPE.LAYOUT,
          grow: 1,
          direction: BLOCK_TYPE.COLUMN,
          children: [
            {
              type: BLOCK_TYPE.LAYOUT,
              direction: BLOCK_TYPE.ROW,
              grow: 1,
              children: [
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
              ],
            },
            {
              type: BLOCK_TYPE.CONTAINER,
              sizeType: "E",
              grow: 1,
            },
          ],
        },
      ],
    },
    {
      type: BLOCK_TYPE.LAYOUT,
      grow: 1,
      direction: BLOCK_TYPE.COLUMN,
      children: [
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
      ],
    },
  ],
};

const LAYOUT_DESC_05 = {
  type: BLOCK_TYPE.LAYOUT,
  direction: BLOCK_TYPE.ROW,
  grow: 1,
  children: [
    {
      type: BLOCK_TYPE.LAYOUT,
      direction: BLOCK_TYPE.ROW,
      grow: 2,
      children: [
        {
          type: BLOCK_TYPE.LAYOUT,
          direction: BLOCK_TYPE.COLUMN,
          grow: 1,
          children: [
            {
              type: BLOCK_TYPE.CONTAINER,
              sizeType: "C",
              grow: 1,
            },
            {
              type: BLOCK_TYPE.LAYOUT,
              direction: BLOCK_TYPE.COLUMN,
              grow: 1,
              children: [
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
              ],
            },
          ],
        },
        {
          type: BLOCK_TYPE.LAYOUT,
          direction: BLOCK_TYPE.COLUMN,
          grow: 1,
          children: [
            {
              type: BLOCK_TYPE.CONTAINER,
              sizeType: "C",
              grow: 1,
            },
            {
              type: BLOCK_TYPE.LAYOUT,
              direction: BLOCK_TYPE.COLUMN,
              grow: 1,
              children: [
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
                {
                  type: BLOCK_TYPE.CONTAINER,
                  sizeType: "F",
                  grow: 1,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: BLOCK_TYPE.LAYOUT,
      grow: 1,
      direction: BLOCK_TYPE.COLUMN,
      children: [
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
        {
          type: BLOCK_TYPE.CONTAINER,
          sizeType: "D",
          grow: 1,
        },
      ],
    },
  ],
};

const LAYOUT_DESC_06 = {
  type: BLOCK_TYPE.LAYOUT,
  direction: BLOCK_TYPE.ROW,
  grow: 1,
  children: [
    {
      type: BLOCK_TYPE.CONTAINER,
      sizeType: "A",
      grow: 1,
    },
  ],
};

export const layoutById = [
  "layout01",
  "layout02",
  "layout03",
  "layout04",
  "layout05",
  "layout06",
] as const;

export const layoutDescMap = {
  layout01: {
    id: "layout01",
    name: "布局一",
    schema: LAYOUT_DESC_01,
  },
  layout02: {
    id: "layout02",
    name: "布局二",
    schema: LAYOUT_DESC_02,
  },
  layout03: {
    id: "layout03",
    name: "布局三",
    schema: LAYOUT_DESC_03,
  },
  layout04: {
    id: "layout04",
    name: "布局四",
    schema: LAYOUT_DESC_04,
  },
  layout05: {
    id: "layout05",
    name: "布局五",
    schema: LAYOUT_DESC_05,
  },
  layout06: {
    id: "layout06",
    name: "布局六",
    schema: LAYOUT_DESC_06,
  },
};

export const planById = ["plan01", "plan02", "plan03"] as const;
export const plansMap = {
  plan01: {
    id: "plan01",
    text: "方案一",
  },
  plan02: {
    id: "plan02",
    text: "方案二",
  },
  plan03: {
    id: "plan03",
    text: "方案三",
  },
};

export const componentSize = [
  {
    name: "A",
    id: "A",
  },
  {
    name: "B",
    id: "B",
  },
  {
    name: "C",
    id: "C",
  },
  {
    name: "D",
    id: "D",
  },
  {
    name: "E",
    id: "E",
  },
  {
    name: "F",
    id: "F",
  },
  {
    name: "全部尺寸",
    id: "ALL",
  },
];

export enum LayoutMode {
  OWN = 0,
  DEPARTMENT = 1,
  COMPANY = 2,
}
