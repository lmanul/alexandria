(function() {

  describe("Readium.Models.PackageDocumentParser", function() {
    beforeEach(function() {
      var uri_object;
      this.xml_string = jasmine.getFixtures().read('package_document.xml');
      this.xml = new window.DOMParser().parseFromString(this.xml_string, 'text/xml');
      uri_object = new URI("http://google.com");
      return this.parser = new Readium.Models.PackageDocumentParser(uri_object);
    });
    describe("initialization", function() {
      it('exists in the proper namespace', function() {
        return expect(Readium.Models.PackageDocumentParser).toBeDefined();
      });
      it('can be initialized', function() {
        var parser;
        parser = new Readium.Models.PackageDocumentParser({});
        return expect(typeof parser).toEqual("object");
      });
      return it('assign the parameter as uri_obj', function() {
        var parser;
        parser = new Readium.Models.PackageDocumentParser("banana");
        return expect(parser.uri_obj).toEqual("banana");
      });
    });
    describe("parse", function() {
      it("returns a javascript object", function() {
        var type;
        this.result = this.parser.parse(this.xml);
        type = typeof this.result;
        return expect(type).toEqual("object");
      });
      it('parses the spine nodes', function() {
        this.result = this.parser.parse(this.xml);
        return expect(this.result.spine.length).toEqual(3);
      });
      it('parses the epub version number', function() {
        var res;
        res = this.parser.parse(this.xml);
        return expect(res.metadata.epub_version).toEqual("2.0");
      });
      it('parses the identifier', function() {
        var res;
        res = this.parser.parse(this.xml);
        return expect(res.metadata.id).toEqual("9782035862464");
      });
      it('parses the title', function() {
        var res;
        res = this.parser.parse(this.xml);
        return expect(res.metadata.title).toEqual("L'espagnol dans votre poche");
      });
      it('parses the manifest as a collection', function() {
        var res;
        res = this.parser.parse(this.xml);
        return expect(typeof res.manifest.reset).toEqual("function");
      });
      it("parses the bindings", function() {
        var res;
        res = this.parser.parse(this.xml);
        expect(res.bindings.length).toEqual(1);
        return expect(res.bindings[0].media_type).toEqual("application/x-epub-figure-gallery");
      });
      it("parses spine item properties", function() {
        var res;
        spyOn(this.parser, "parseSpineProperties");
        res = this.parser.parse(this.xml);
        return expect(this.parser.parseSpineProperties).toHaveBeenCalled();
      });
      it("parses the media-overlay attribute", function() {
        var res;
        res = this.parser.parse(this.xml);
        expect(res.manifest.at(3).media_overlay === "Page_4_MO");
        return expect(res.manifest.at(4).media_overlay === "");
      });
      it('creates a ManifestItems collection', function() {
        return expect(Readium.Collections.ManifestItems).toBeDefined();
      });
      return it("parses the media:active-class metadata", function() {
        var res;
        res = this.parser.parse(this.xml);
        return expect(res.metadata.active_class).toEqual("-epub-media-overlay-active");
      });
    });
    describe("parseSpineProperties", function() {
      beforeEach(function() {
        this.spine = [
          {
            idref: 'Page_1',
            properties: 'page-spread-right rendition:layout-pre-paginated'
          }, {
            idref: 'Page_2',
            properties: ''
          }, {
            idref: 'Page_3',
            properties: ''
          }
        ];
        return this.res = this.parser.parseSpineProperties(this.spine);
      });
      it("returns an array", function() {
        return expect(this.res.length).toBeDefined();
      });
      it("add properties to the spine item if they exist", function() {
        expect(this.res[0].page_spread).toEqual('right');
        return expect(this.res[0].fixed_flow).toEqual(true);
      });
      return it("leaves the properties string entact", function() {
        return expect(this.res[0].properties).toEqual('page-spread-right rendition:layout-pre-paginated');
      });
    });
    return describe("paginateBackwards()", function() {
      it("returns false the page-progression-direction attr is not present", function() {
        var result;
        result = this.parser.paginateBackwards(this.xml);
        return expect(result).toBeFalsy();
      });
      it("returns false if the page-progression-direction attr is ltr", function() {
        var result;
        $('spine', this.xml).attr('page-progression-direction', 'rtl');
        result = this.parser.paginateBackwards(this.xml);
        return expect(result).toBeFalsy();
      });
      return it("returns true if the page-progression-direction attr is rtl", function() {
        var result;
        $('spine', this.xml).attr('page-progression-direction', 'ltr');
        result = this.parser.paginateBackwards(this.xml);
        return expect(result).toBeTruthy();
      });
    });
  });

}).call(this);
