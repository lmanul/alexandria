Readium.Models.ReadiumOptions = Backbone.Model.extend({

  initialize: function() {
    this.set("id", "singleton");
  },

  defaults: {
    hijack_epub_urls: false,
    verbose_unpacking: true,
    paginate_everything: true
  },

  sync: Readium.Utils.LocalStorageAdaptor("READIUM_OPTIONS")
}, {
  getInstance: function() {
    var instance = new Readium.Models.ReadiumOptions();
    debugger;
    instance.fetch({
      error: function() {
        /* debugger;
        chrome.storage.local.set({"READIUM_OPTIONS": ""} /*, function() {
          debugger;
          instance.save();
        } ); */
      }
    });
    return instance;
  }
});
