

import electron from 'electron';
import $ from 'jquery';
import 'proxy-observe';
import settings from '../../lib/settings/settings';

export default function watchZoomChanges() {
  updateZoom();
  
  Object.observe(settings.appearance, (changes) => {
    changes.forEach((change) => {if (change.name === 'zoom') updateZoom()});
  });

  $(document).on('keyup', (e) => {
    if (e.ctrlKey) {
      if (e.which === 107 || e.which === 187) zoomIn();
      if (e.which === 109 || e.which === 189) zoomOut();
    }
  });

  $(document).on('wheel', (e) => {
    if (e.ctrlKey) {
      if (e.originalEvent.deltaY > 0) zoomOut();
      else zoomIn();
    }
  });
}

function zoomIn() {
  if (settings.appearance.zoom < 175) {
    settings.appearance.zoom += 5;
  }
}

function zoomOut() {
  if (settings.appearance.zoom > 104) {
    settings.appearance.zoom -= 5;
  }
}

function updateZoom() {
  electron.webFrame.setZoomFactor(settings.appearance.zoom / 100);
}
