import React, {
  memo,
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import S from "./componentGallery.module.scss";
import { useDrag } from "../dnd";

import { ComponentItem } from "../type";

import { componentSize } from "../config";

interface ItemProps {
  item: ComponentItem;
}

const Item: React.FC<ItemProps> = memo((props) => {
  const { item } = props;

  const [{ isDragging }, drag] = useDrag({
    type: "USER_COMPONENT",
    item: item,
  });

  return (
    <div className={S.componentSelectListItem} key={item.id}>
      <p
        className={S.componentCover}
        ref={drag}
        draggable={false}
        style={{
          backgroundImage: `url(${item.cover})`,
        }}
      />
      <div className={S.componentName}>{item.name}</div>
    </div>
  );
});

interface ComponentGalleryProps {
  userComponentsMap: { [key: string]: ComponentItem };
  userComponentsId: Array<string>;
}

const ComponentGallery: React.FC<ComponentGalleryProps> = (props) => {
  const { userComponentsMap, userComponentsId } = props;

  const [activeComponentTypeId, setActiveComponentTypeId] = useState("ALL");
  const [activeComponentSizeId, setActiveComponentSizeId] = useState("ALL");

  const boxRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [leftButtonVisible, setLeftButtonVisible] = useState<boolean>(false);
  const [rightButtonVisible, setRightButtonVisible] = useState<boolean>(false);
  const [xTranslate, setXTranslate] = useState<number>(0);
  const filterComponentList = useMemo(() => {
    let list = [] as Array<ComponentItem>;
    // 过滤组件类型,如果是ALL合并全部组件
    if (!activeComponentTypeId || !userComponentsMap[activeComponentTypeId])
      return list;
    if (activeComponentTypeId === "ALL") {
      list = userComponentsId
        .map((id) => userComponentsMap[id])
        .reduce(
          (list, item) => list.concat(item.children),
          [] as Array<ComponentItem>
        );
    } else {
      list = userComponentsMap[activeComponentTypeId].children;
    }

    // 过滤组件尺寸
    if (activeComponentSizeId !== "ALL") {
      list = list.filter((item) => item.sizeType === activeComponentSizeId);
    }
    return list;
  }, [
    userComponentsMap,
    userComponentsId,
    activeComponentTypeId,
    activeComponentSizeId,
  ]);

  const handleLeftClick = useCallback(() => {
    setXTranslate((translate) => Math.min(translate + 324, 0));
  }, []);

  const handleRightClick = useCallback(() => {
    setXTranslate((translate) =>
      Math.max(
        translate - 324,
        -(listRef.current!.offsetWidth - boxRef.current!.offsetWidth)
      )
    );
  }, []);

  useEffect(() => {
    if (xTranslate === 0) {
      setLeftButtonVisible(false);
    } else {
      setLeftButtonVisible(true);
    }

    if (
      boxRef.current &&
      listRef.current &&
      xTranslate <=
        -(filterComponentList.length * 324 - boxRef.current.offsetWidth)
    ) {
      setRightButtonVisible(false);
    } else {
      setRightButtonVisible(true);
    }
  }, [xTranslate, filterComponentList]);

  useEffect(() => {
    setXTranslate(0);
  }, [filterComponentList.length]);

  const handleTagChange = (id: string) => {
    setActiveComponentTypeId(id);
  };

  const handleSizeChange = (id: string) => {
    setActiveComponentSizeId(id);
  };

  return (
    <>
      <div className={S.componentGallery}>
        <h3 className={S.header}>组件</h3>
        <div className={S.componentTagList}>
          {userComponentsId
            .map((id) => userComponentsMap[id])
            .map((item) => (
              <div
                className={`${S.componentTagListItem} ${
                  activeComponentTypeId == item.id ? S.active : ""
                }`}
                key={item.id}
                onClick={() => handleTagChange(item.id)}
              >
                {item.name}
              </div>
            ))}
        </div>
        <h3 className={`${S.header} ${S.headerTitleRight}`}>尺寸</h3>
        <div className={S.componentTagList}>
          {componentSize.map((item) => (
            <div
              className={`${S.componentTagListItem} ${
                activeComponentSizeId == item.id ? S.active : ""
              }`}
              key={item.id}
              onClick={() => handleSizeChange(item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      <div className={S.componentsList}>
        {leftButtonVisible && (
          <div className={S.scrollLeft} onClick={handleLeftClick}></div>
        )}
        <div className={S.componentsListScrollWrapper} ref={boxRef}>
          <div
            className={S.componentSelectList}
            ref={listRef}
            style={{
              left: `${xTranslate}px`,
              width: `${filterComponentList.length * 324}px`,
            }}
          >
            {filterComponentList.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
          {!filterComponentList.length && (
            <div className={S.emptyComponentList}>暂无匹配组件</div>
          )}
        </div>

        {rightButtonVisible && (
          <div className={S.scrollRight} onClick={handleRightClick}></div>
        )}
      </div>
    </>
  );
};

export default memo(ComponentGallery);
