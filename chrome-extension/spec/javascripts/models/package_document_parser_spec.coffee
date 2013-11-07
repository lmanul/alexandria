describe "Readium.Models.PackageDocumentParser", ->

	beforeEach ->
		@xml_string = jasmine.getFixtures().read('package_document.xml')
		@xml = new window.DOMParser().parseFromString(@xml_string, 'text/xml')
		uri_object = new URI("http://google.com")
		@parser = new Readium.Models.PackageDocumentParser(uri_object)

	describe "initialization", ->

		it 'exists in the proper namespace', ->
			expect(Readium.Models.PackageDocumentParser).toBeDefined()

		it 'can be initialized', ->
			parser = new Readium.Models.PackageDocumentParser({})
			expect(typeof(parser)).toEqual("object")

		it 'assign the parameter as uri_obj', ->
			parser = new Readium.Models.PackageDocumentParser("banana")
			expect(parser.uri_obj).toEqual("banana")

	describe "parse", ->			

		it "returns a javascript object", ->
			@result = @parser.parse(@xml)
			type = typeof(@result)
			expect(type).toEqual("object")

		it 'parses the spine nodes', ->
			@result = @parser.parse(@xml)
			expect(@result.spine.length).toEqual(3)

		it 'parses the epub version number', ->
			res = @parser.parse(@xml)
			expect(res.metadata.epub_version).toEqual("2.0");

		it 'parses the identifier', ->
			res = @parser.parse(@xml)
			expect(res.metadata.id).toEqual("9782035862464");

		it 'parses the title', ->
			res = @parser.parse(@xml)
			expect(res.metadata.title).toEqual("L'espagnol dans votre poche");

		it 'parses the manifest as a collection', ->
			res = @parser.parse(@xml)
			expect(typeof res.manifest.reset).toEqual("function")

		it "parses the bindings", ->
			res = @parser.parse(@xml)
			expect(res.bindings.length).toEqual(1);
			expect(res.bindings[0].media_type).toEqual("application/x-epub-figure-gallery");

		it "parses spine item properties", ->
			spyOn(@parser, "parseSpineProperties")
			res = @parser.parse(@xml)
			expect(@parser.parseSpineProperties).toHaveBeenCalled()
    
		it "parses the media-overlay attribute", ->
			res = @parser.parse(@xml)
			expect(res.manifest.at(3).media_overlay == "Page_4_MO"); 
			expect(res.manifest.at(4).media_overlay == "");

		it 'creates a ManifestItems collection', ->
			expect(Readium.Collections.ManifestItems).toBeDefined();

		it "parses the media:active-class metadata", ->
            res = @parser.parse(@xml)
            expect(res.metadata.active_class).toEqual("-epub-media-overlay-active");


	describe "parseSpineProperties", ->

		beforeEach ->
			@spine = [ 
				{ idref : 'Page_1', properties : 'page-spread-right rendition:layout-pre-paginated' }, 
				{ idref : 'Page_2', properties : '' }, 
				{ idref : 'Page_3', properties : '' } 
			]
			@res = @parser.parseSpineProperties(@spine)

		it "returns an array", ->
			expect(@res.length).toBeDefined()

		it "add properties to the spine item if they exist", ->
			expect(@res[0].page_spread).toEqual('right');
			expect(@res[0].fixed_flow).toEqual(true);

		it "leaves the properties string entact", ->
			expect(@res[0].properties).toEqual('page-spread-right rendition:layout-pre-paginated');


	describe "paginateBackwards()", ->

		it "returns false the page-progression-direction attr is not present", ->
			result = @parser.paginateBackwards(@xml)
			expect(result).toBeFalsy()

		it "returns false if the page-progression-direction attr is ltr", ->
			$('spine', @xml).attr('page-progression-direction', 'rtl')
			result = @parser.paginateBackwards(@xml)
			expect(result).toBeFalsy()


		it "returns true if the page-progression-direction attr is rtl", ->
			$('spine', @xml).attr('page-progression-direction', 'ltr')
			result = @parser.paginateBackwards(@xml)
			expect(result).toBeTruthy()

			
			
