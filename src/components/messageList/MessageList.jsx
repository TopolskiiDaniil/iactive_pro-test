import styles from "./messageList.module.css";
import Message from "../message/Message";
import { memo, useLayoutEffect, useRef } from "react";

function MessageList({ items, onMove, onFavoriteButtonClick }) {
  const positions = useRef(new Map());
  const newIdsRef = useRef(new Set());
  const refs = useRef(new Map());

  useLayoutEffect(() => {
    const prevIds = new Set(positions.current.keys());
    const currentIds = new Set(items.map((i) => i.id));

    newIdsRef.current = new Set(
      [...currentIds].filter((id) => !prevIds.has(id)),
    );

    const newPositions = new Map();
    refs.current.forEach((el, id) => {
      if (el) newPositions.set(id, el.getBoundingClientRect());
    });
    positions.current = newPositions;
  }, [items]);

  useLayoutEffect(() => {
    refs.current.forEach((child, id) => {
      if (!child) return;

      if (newIdsRef.current.has(id)) {
        child.style.opacity = 0;
        child.style.transform = "scale(0.95)";
        requestAnimationFrame(() => {
          child.style.transition = "transform 300ms ease, opacity 300ms ease";
          child.style.opacity = 1;
          child.style.transform = "scale(1)";

          const onEnd = () => {
            child.style.transition = "";
            child.removeEventListener("transitionend", onEnd);
          };
          child.addEventListener("transitionend", onEnd);
        });
        return;
      }

      const prevRect = positions.current.get(id);
      if (!prevRect) return;

      const newRect = child.getBoundingClientRect();
      const dx = prevRect.left - newRect.left;
      const dy = prevRect.top - newRect.top;

      if (dx || dy) {
        child.style.transform = `translate(${dx}px, ${dy}px)`;
        child.style.transition = "none";

        requestAnimationFrame(() => {
          child.style.transition = "transform 300ms ease";
          child.style.transform = "none";
        });
      }
    });
  }, [items]);

  return (
    <ul className={styles.container}>
      {items.map((item) => (
        <Message
          key={item.id}
          item={item}
          onMove={onMove}
          onFavoriteButtonClick={onFavoriteButtonClick}
          innerRef={(el) => refs.current.set(item.id, el)}
        />
      ))}
    </ul>
  );
}

export default memo(MessageList);
