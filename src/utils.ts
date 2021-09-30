import interact from 'interactjs';
export function dragAndResizeableImage(selector: string) {
  interact(selector)
    .resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      listeners: {
        move(event) {
          var target = event.target;
          var x = parseFloat(target.getAttribute('data-x')) || 0;
          var y = parseFloat(target.getAttribute('data-y')) || 0;

          // update the element's style
          target.style.width = event.rect.width + 'px';
          target.style.height = event.rect.height + 'px';

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          target.textContent =
            Math.round(event.rect.width) +
            '\u00D7' +
            Math.round(event.rect.height);
        },
      },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: 'parent',
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 50, height: 50 },
        }),
      ],

      inertia: true,
    })
    .draggable({
      listeners: { move: dragMoveListener },
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
        }),
      ],
    });
}

export function dragabbleText(selector: string) {
  interact(selector).draggable({
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
function dragMoveListener(event: any) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}
