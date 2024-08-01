import React, { memo, useState, useEffect, Fragment, useRef, useMemo } from 'react';
import { Input } from 'antd';
import S from './style.module.scss';

import AuthorityAppItem from './AuthorityAppItem'

import { useMove } from './dnd';

import type {

  AuthorityAppInfo
} from './type'


interface AuthorityAppProps {
  authorityApps: Array<AuthorityAppInfo>
  clearModalType: () => void
  openApp: (id: number) => React.MouseEventHandler
}


const AuthorityApps: React.FC<AuthorityAppProps> = (props) => {
  const {
    authorityApps,
    clearModalType,
    openApp
  } = props;

  const scrollRef = useRef<HTMLDivElement>(null);

  const [filterAuthorityApps, setFilterAuthorityApps] = useState<Array<AuthorityAppInfo>>([])

  useEffect(() => {
    setFilterAuthorityApps(authorityApps)
  }, [authorityApps])

  const searchApp = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const { value } = e.target;
    const filterApps = authorityApps
      .filter(item => item.displayName.includes(value.trim()) || item.name.includes(value.trim()))
    setFilterAuthorityApps(filterApps);
  }

  useEffect(() => {
    const handle = (e: MouseEvent) => e.stopPropagation();
    scrollRef.current?.addEventListener('wheel', handle);
    return () => scrollRef.current?.removeEventListener('wheel', handle);
  }, [
    scrollRef
  ])

  const [move, moveView] = useMove();

  return (
    <div
      className={S.authorityAppsModal}
      id='appListModal'
      ref={moveView}
    >
      <div
        className={S.modalHeader}
        ref={move}
      >
        <div className={S.modalHeaderTitle}>应用</div>
        <div className={S.modalHeaderClose}
          onClick={clearModalType}
        />
      </div>
      <div
        className={S.authorityAppsWrapper}
        onClick={e => e.stopPropagation()}
        ref={scrollRef}
      >
        <div className={S.searchBar}>
          <Input
            onChange={searchApp}
            placeholder='请输入查询内容'
          />
        </div>
        <div
          className={S.authorityAppList}
        >
          {
            filterAuthorityApps.map((app) => (
              <AuthorityAppItem
                key={app.id}
                app={app}
                openApp={openApp}
              />
            ))
          }
          {
            !filterAuthorityApps.length && (
              <div className={S.emptySearchList}>没有匹配的App</div>
            )
          }
        </div>
      </div>
    </div>
  )
}


export default memo(AuthorityApps);