import { useEffect, useRef, useState } from 'react';
import primsjs from 'prismjs';

import { events } from 'app';
import { Events } from 'types';

import { Tooltip } from 'components';

import { actions } from './actions';
import * as S from './styles';
import styles from "./styles.module.scss"

const ReadmeResult = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState('');

  const handleShowContent = (event: CustomEvent<string>) =>
    setContent(event.detail);

  useEffect(() => {
    primsjs.highlightAllUnder(containerRef.current!);
  }, [content]);

  useEffect(() => {
    events.on(Events.RESULT_SHOW_CONTENT, handleShowContent);

    return () => {
      events.off(Events.RESULT_SHOW_CONTENT, handleShowContent);
    };
  }, []);

  const [copied,setCopied] = useState(false);

  const onClickCopy = ()=>{
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <S.Container ref={containerRef}>
      <S.Actions>
        {actions.map(({ label, icon: Icon, action }, i) => (
          <Tooltip key={i} content={label} position="top">
            <div className={styles.copy_container} onClick={() => {
              action(content);
              onClickCopy();
              }}>
              <div className={styles.copy_container_child}>
              <S.Action className={styles.copy_button} >
                <Icon size={20}  />
              </S.Action>
              </div>
              <div className={styles.copy_container_child}>
               {
                copied ?  <h3 >Text Copied ! </h3> : null
               }
              </div>

            </div>
          </Tooltip>
        ))}
      </S.Actions>

      <pre className={`language-html`}>
        <code className={`language-html`}>{content}</code>
      </pre>
    </S.Container>
  );
};

export { ReadmeResult };
