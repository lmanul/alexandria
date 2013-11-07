(function() {

  describe("Readium.Models.EPUB", function() {
    describe("initialization", function() {
      beforeEach(function() {
        return stubFileSystem();
      });
      describe("without passing a file path", function() {
        return it("throws an exeption", function() {
          var createWithNoPath;
          createWithNoPath = function() {
            return new Readium.Models.EPUB();
          };
          return expect(createWithNoPath).toThrow("This class cannot be synced without a file path");
        });
      });
      return describe("with valid params", function() {
        it("initializes the package document", function() {
          var epub;
          epub = new Readium.Models.EPUB({
            "package_doc_path": "some/file/path"
          });
          return expect(epub.getPackageDocument()).toBeDefined();
        });
        return it('passes a reference to itself to the package document', function() {
          var args, epub, packDoc;
          packDoc = new Readium.Models.PackageDocument({
            book: {},
            "file_path": "some/path"
          });
          spyOn(Readium.Models, "PackageDocument").andReturn(packDoc);
          epub = new Readium.Models.EPUB({
            "package_doc_path": "some/file/path"
          });
          args = Readium.Models.PackageDocument.mostRecentCall.args;
          return expect(args[0].book).toEqual(epub);
        });
      });
    });
    describe("defaults", function() {
      beforeEach(function() {
        return this.epub = new Readium.Models.EPUB({
          "package_doc_path": "some/file/path"
        });
      });
      return it('correctly sets default attributes', function() {
        return expect(this.epub.get("can_two_up")).toEqual(true);
      });
    });
    return describe("toJSON", function() {
      beforeEach(function() {
        return this.epub = new Readium.Models.EPUB({
          "package_doc_path": "some/file/path"
        });
      });
      return it('does not serialize attributes that should not be persisted', function() {
        var json;
        json = this.epub.toJSON();
        expect(json.apple_fixed).not.toBeDefined();
        expect(json.author).not.toBeDefined();
        expect(json.cover_href).not.toBeDefined();
        expect(json.create_at).not.toBeDefined();
        expect(json.description).not.toBeDefined();
        expect(json.epub_version).not.toBeDefined();
        expect(json.fixed_layout).not.toBeDefined();
        expect(json.id).not.toBeDefined();
        expect(json.key).not.toBeDefined();
        expect(json.language).not.toBeDefined();
        expect(json.layout).not.toBeDefined();
        expect(json.modified_date).not.toBeDefined();
        expect(json.ncx).not.toBeDefined();
        expect(json.open_to_spread).not.toBeDefined();
        expect(json.orientation).not.toBeDefined();
        expect(json.page_prog_dir).not.toBeDefined();
        expect(json.paginate_backwards).not.toBeDefined();
        expect(json.pubdate).not.toBeDefined();
        expect(json.publisher).not.toBeDefined();
        expect(json.rights).not.toBeDefined();
        expect(json.spread).not.toBeDefined();
        expect(json.src_url).not.toBeDefined();
        return expect(json.title).not.toBeDefined();
      });
    });
  });

}).call(this);
