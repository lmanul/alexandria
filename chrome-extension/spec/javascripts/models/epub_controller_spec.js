(function() {

  describe("Readium.Models.EPUBController", function() {
    describe("initialization", function() {
      beforeEach(function() {
        return stubFileSystem();
      });
      return describe("with valid params", function() {
        beforeEach(function() {
          return this.epub = new Readium.Models.EPUB({
            "package_doc_path": "some/file/path"
          });
        });
        it("initializes a pagination strategy selector", function() {
          var epub;
          epub = new Readium.Models.EPUBController({
            "epub": this.epub
          });
          return expect(epub.paginator).toBeDefined();
        });
        it("initializes a reference to the package document", function() {
          var epubController;
          epubController = new Readium.Models.EPUBController({
            "epub": this.epub
          });
          return expect(epubController.packageDocument).toBeDefined();
        });

        it("calls fetch on the package document", function() {
          
            var epub;
            var epubController;
            var packageDocument;

            packageDocument = Factory.spy("package_document");
            spyOn(Readium.Models, "PackageDocument").andReturn(packageDocument);            
            epub = new Readium.Models.EPUB({"package_doc_path": "some/file/path"});

            epubController = new Readium.Models.EPUBController({
                "epub": epub
            });
            expect(Readium.Models.PackageDocument).toHaveBeenCalled();
            return expect(packageDocument.fetch).toHaveBeenCalled();
        });

        return describe("sets up event handlers", function() {
          beforeEach(function() {
            this.epub = new Readium.Models.EPUB({
              "package_doc_path": "some/file/path"
            });
            return this.epubController = new Readium.Models.EPUBController({
              "epub": this.epub
            });
          });
        });
      });
    });
    describe("defaults", function() {
      beforeEach(function() {
        this.epub = new Readium.Models.EPUB({
          "package_doc_path": "some/file/path"
        });
        return this.epubController = new Readium.Models.EPUBController({
          "epub": this.epub
        });
      });
      return it('correctly sets default attributes', function() {
        expect(this.epubController.get("font_size")).toEqual(10);
        expect(this.epubController.get("two_up")).toEqual(false);
        expect(this.epubController.get("full_screen")).toEqual(false);
        expect(this.epubController.get("toolbar_visible")).toEqual(true);
        expect(this.epubController.get("toc_visible")).toEqual(false);
        expect(this.epubController.get("rendered_spine_items")).toEqual([]);
        expect(this.epubController.get("current_theme")).toEqual("default-theme");
        return expect(this.epubController.get("current_margin")).toEqual(3);
      });
    });
    return describe("toJSON", function() {
      beforeEach(function() {
        this.epub = new Readium.Models.EPUB({
          "package_doc_path": "some/file/path"
        });
        return this.epubController = new Readium.Models.EPUBController({
          "epub": this.epub
        });
      });
      it('does not serialize attributes that should not be presisted', function() {
        var json;
        this.epubController.set("rendered_spine_items", [1, 2, 3]);
        this.epubController.set("spine_index", [1]);
        json = this.epubController.toJSON();
        expect(json.rendered_spine_items).not.toBeDefined();
        return expect(json.spine_index).not.toBeDefined();
      });
      return it('serializes attributes that should be persisted', function() {
        var json;
        this.epubController.set("key", "alksjflkasd");
        this.epubController.set("updated_at", "alksdjfs");
        json = this.epubController.toJSON();
        expect(json.current_theme).toBeDefined();
        expect(json.updated_at).toBeDefined();
        expect(json.current_margin).toBeDefined();
        expect(json.font_size).toBeDefined();
        expect(json.two_up).toBeDefined();
        return expect(json.key).toBeDefined();
      });
    });
  });

}).call(this);
