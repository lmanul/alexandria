(function() {

  describe("Readium.Models.IbookOptionsParser", function() {
    it('exists in the proper namespace', function() {
      return expect(Readium.Models.IbooksOptionsParser).toBeDefined();
    });
    describe("parseBool()", function() {
      beforeEach(function() {
        return this.parser = new Readium.Models.IbooksOptionsParser();
      });
      it('works', function() {
        expect(this.parser.parseBool("true")).toBeTruthy();
        return expect(this.parser.parseBool("false")).toBeFalsy();
      });
      it('handles white space padded strings', function() {
        return expect(this.parser.parseBool(" true ")).toBeTruthy();
      });
      return it('is case insensitive', function() {
        return expect(this.parser.parseBool(" TrUe ")).toBeTruthy();
      });
    });
    return describe("parsing a display options file", function() {
      beforeEach(function() {
        this.xml_string = jasmine.getFixtures().read('ibooks_display_options.xml');
        this.parser = new Readium.Models.IbooksOptionsParser();
        return this.result = this.parser.parse(this.xml_string);
      });
      it('parses the fixed layout property as apple-fixed', function() {
        return expect(this.result.apple_fixed).toBeTruthy();
      });
      it('parses the fixed layout property as fixedLayout', function() {
        return expect(this.result.fixedLayout).toBeTruthy();
      });
      return it('parses the open to spread property', function() {
        return expect(this.result.open_to_spread).toBeTruthy();
      });
    });
  });

}).call(this);
