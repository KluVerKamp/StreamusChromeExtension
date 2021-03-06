﻿import {LayoutView} from 'marionette';
import RepeatButtonState from 'common/enum/repeatButtonState';
import Tooltipable from 'foreground/view/behavior/tooltipable';
import repeatButtonTemplate from 'template/streamControlBar/repeatButton.hbs!';
import repeatIconTemplate from 'template/icon/repeatIcon_18.hbs!';
import repeatOneIconTemplate from 'template/icon/repeatOneIcon_18.hbs!';

var RepeatButtonView = LayoutView.extend({
  id: 'repeatButton',
  className: 'button button--icon button--icon--secondary button--medium',
  template: repeatButtonTemplate,

  templateHelpers: {
    repeatIcon: repeatIconTemplate,
    repeatOneIcon: repeatOneIconTemplate
  },

  attributes: {
    'data-ui': 'tooltipable'
  },

  ui: {
    repeatIcon: 'repeatIcon',
    repeatOneIcon: 'repeatOneIcon'
  },

  events: {
    'click': '_onClick'
  },

  modelEvents: {
    'change:state': '_onChangeState'
  },

  behaviors: {
    Tooltipable: {
      behaviorClass: Tooltipable
    }
  },

  onRender: function() {
    this._setState(this.model.get('state'), this.model.getStateMessage());
  },

  _onClick: function() {
    this.model.toggleRepeatState();
  },

  _onChangeState: function(model, state) {
    this._setState(state, model.getStateMessage());
  },

  _setState: function(state, stateMessage) {
    // The button is considered enabled if it is anything but off.
    var enabled = state !== RepeatButtonState.Off;

    this.$el.toggleClass('is-enabled', enabled).attr('data-tooltip-text', stateMessage);
    this.ui.repeatOneIcon.toggleClass('is-hidden', state !== RepeatButtonState.RepeatVideo);
    this.ui.repeatIcon.toggleClass('is-hidden', state === RepeatButtonState.RepeatVideo);
  }
});

export default RepeatButtonView;