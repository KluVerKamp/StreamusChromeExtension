﻿import {LayoutView} from 'marionette';
import DialogContent from 'foreground/view/behavior/dialogContent';
import aboutStreamusTemplate from 'template/dialog/aboutStreamus.hbs!';

var AboutStreamusView = LayoutView.extend({
  id: 'aboutStreamus',
  template: aboutStreamusTemplate,

  templateHelpers: {
    applicationDetails: chrome.app.getDetails()
  },

  ui: {
    openHomepage: 'openHomepage',
    openPatchNotes: 'openPatchNotes'
  },

  events: {
    'click @ui.openHomepage': '_onClickOpenHomepage',
    'click @ui.openPatchNotes': '_onClickOpenPatchNotes'
  },

  behaviors: {
    DialogContent: {
      behaviorClass: DialogContent
    }
  },

  tabManager: null,

  initialize: function(options) {
    this.tabManager = options.tabManager;
  },

  _onClickOpenHomepage: function() {
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    var homepageUrl = chrome.app.getDetails().homepage_url;
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    this.tabManager.showWebsite(homepageUrl);
  },

  _onClickOpenPatchNotes: function() {
    this.tabManager.showWebsite('https://github.com/MeoMix/StreamusChromeExtension/releases');
  }
});

export default AboutStreamusView;