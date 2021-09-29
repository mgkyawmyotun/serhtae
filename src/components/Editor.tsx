import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import interact from 'interactjs';
import React, { FC, useEffect, useRef } from 'react';
import classes from '../scss/editor.module.scss';

function dragabbleText() {
  interact('.target_text').draggable({
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
      }),
    ],
    listeners: {
      start(event) {},
      end(event) {
        var textEl = event.target.querySelector('p');

        textEl &&
          (textEl.textContent =
            'moved a distance of ' +
            Math.sqrt(
              (Math.pow(event.pageX - event.x0, 2) +
                Math.pow(event.pageY - event.y0, 2)) |
                0
            ).toFixed(2) +
            'px');
      },
      move(event) {
        // call this listener on every dragmove
        var target = event.target;
        const width = target.offsetWidth;

        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.transform =
          'translate(' + (x + width) + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

        //   event.target.setAttribute('data-value', value.toFixed(2));
      },
    },
  });
}
function dragAndResizeableImage() {
  const node = document.querySelector('.target_image');
  if (node) {
    const parent = node.parentElement;
  }
  interact('.target_image').resizable({
    edges: { top: true, left: true, bottom: true, right: true },
    modifiers: [
      interact.modifiers.restrictSize({
        min: { width: 100, height: 100 },
        max: {
          width: node?.parentElement?.clientWidth || 500,
          height: node?.parentElement?.clientHeight || 500,
        },
      }),
    ],
    listeners: {
      move: function (event) {
        let { x, y } = event.target.dataset;

        x = (parseFloat(x) || 0) + event.deltaRect.left;
        y = (parseFloat(y) || 0) + event.deltaRect.top;

        Object.assign(event.target.style, {
          width: `${event.rect.width}px`,
          height: `${event.rect.height}px`,
          transform: `translate(${x}px, ${y}px)`,
        });

        Object.assign(event.target.dataset, { x, y });
      },
    },
  });
}
export const Editor: FC = () => {
  const editor_ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dragabbleText();
    dragAndResizeableImage();
  }, []);
  return (
    <div className={classes.editor}>
      <div className={classes.editor__main}>
        <div ref={editor_ref} className={classes.editor__frame}>
          <img
            src="https://source.unsplash.com/random/200x200"
            alt=""
            className="target_image"
          />
          <div className="target_text">Hell oWorld</div>
        </div>
      </div>

      <div className={classes.editor_pannel}>
        <button
          onClick={() => {
            if (editor_ref && editor_ref.current) {
              domtoimage.toBlob(editor_ref.current).then((value) => {
                saveAs(value);
              });
            }
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
};
