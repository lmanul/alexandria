describe "Readium.Models.IbookOptionsParser", ->

	it 'exists in the proper namespace', ->
		expect(Readium.Models.IbooksOptionsParser).toBeDefined()

	describe "parseBool()", ->

		beforeEach ->
			@parser = new Readium.Models.IbooksOptionsParser()

		it 'works', ->
			expect(@parser.parseBool("true")).toBeTruthy()
			expect(@parser.parseBool("false")).toBeFalsy()

		it 'handles white space padded strings', ->
			expect(@parser.parseBool(" true ")).toBeTruthy()

		it 'is case insensitive', ->
			expect(@parser.parseBool(" TrUe ")).toBeTruthy()
			


	describe "parsing a display options file", ->

		beforeEach ->
			@xml_string = jasmine.getFixtures().read('ibooks_display_options.xml')
			@parser = new Readium.Models.IbooksOptionsParser()
			@result = @parser.parse(@xml_string)

		it 'parses the fixed layout property as apple-fixed', ->
			expect(@result.apple_fixed).toBeTruthy()

		it 'parses the fixed layout property as fixedLayout', ->
			expect(@result.fixedLayout).toBeTruthy()

		it 'parses the open to spread property', ->
			expect(@result.open_to_spread).toBeTruthy()
			