
describe "Readium.Models.EPUB", ->

	
	describe "initialization", ->

		beforeEach ->
			stubFileSystem()

		describe "without passing a file path", ->

			it "throws an exeption", ->
				createWithNoPath = -> new Readium.Models.EPUB()
				expect(createWithNoPath).toThrow("This class cannot be synced without a file path")

		
		describe "with valid params", ->

			it "initializes the package document", ->
				epub = new Readium.Models.EPUB({"package_doc_path": "some/file/path"})
				expect(epub.getPackageDocument()).toBeDefined()

			it 'passes a reference to itself to the package document', ->
				packDoc = new Readium.Models.PackageDocument({book: {}, "file_path": "some/path"})
				spyOn(Readium.Models, "PackageDocument").andReturn(packDoc)
				epub = new Readium.Models.EPUB({"package_doc_path": "some/file/path"})
				args = Readium.Models.PackageDocument.mostRecentCall.args
				expect(args[0].book).toEqual(epub)
			
	
	describe "defaults", ->

		beforeEach ->
			@epub = new Readium.Models.EPUB({"package_doc_path": "some/file/path"})

		it 'correctly sets default attributes', ->
			expect(@epub.get("can_two_up")).toEqual(true)

	
	describe "toJSON", ->

		beforeEach ->
			@epub = new Readium.Models.EPUB({"package_doc_path": "some/file/path"})

		it 'does not serialize attributes that should not be persisted', ->
			json = @epub.toJSON()
			expect(json.apple_fixed).not.toBeDefined()
			expect(json.author).not.toBeDefined()
			expect(json.cover_href).not.toBeDefined()
			expect(json.create_at).not.toBeDefined()
			expect(json.description).not.toBeDefined()
			expect(json.epub_version).not.toBeDefined()
			expect(json.fixed_layout).not.toBeDefined()
			expect(json.id).not.toBeDefined()
			expect(json.key).not.toBeDefined()
			expect(json.language).not.toBeDefined()
			expect(json.layout).not.toBeDefined()
			expect(json.modified_date).not.toBeDefined()
			expect(json.ncx).not.toBeDefined()
			expect(json.open_to_spread).not.toBeDefined()
			expect(json.orientation).not.toBeDefined()
			expect(json.page_prog_dir).not.toBeDefined()
			expect(json.paginate_backwards).not.toBeDefined()
			expect(json.pubdate).not.toBeDefined()
			expect(json.publisher).not.toBeDefined()
			expect(json.rights).not.toBeDefined()
			expect(json.spread).not.toBeDefined()
			expect(json.src_url).not.toBeDefined()
			expect(json.title).not.toBeDefined()


