
describe "Readium.Models.EPUBController", ->

	
	describe "initialization", ->

		beforeEach ->
			stubFileSystem()

		describe "with valid params", ->

			beforeEach ->
				@epub = new Readium.Models.EPUB({"package_doc_path": "some/file/path"})

			it "initializes a pagination strategy selector", ->
				epub = new Readium.Models.EPUBController({"epub" : @epub})
				expect(epub.paginator).toBeDefined()

			it "initializes a reference to the package document", ->
				epubController = new Readium.Models.EPUBController({"epub" : @epub})
				expect(epubController.packageDocument).toBeDefined()

			# TODO: This is still broken
			it "calls fetch on the package document", ->
				packDoc = new Readium.Models.PackageDocument({book: {}, "file_path": "some/path"})
				spyOn(Readium.Models, "PackageDocument").andReturn(packDoc)
				spyOn(packDoc, "fetch")
				epubController = new Readium.Models.EPUBController({"epub" : @epub})
				expect(Readium.Models.PackageDocument).toHaveBeenCalled()
				expect(packDoc.fetch).toHaveBeenCalled()

			
			describe "sets up event handlers", ->

				beforeEach ->
					@epub = new Readium.Models.EPUB({"package_doc_path": "some/file/path"})
					@epubController = new Readium.Models.EPUBController({"epub" : @epub})

				it 'savePosition and setMetaSize on change:spine_position', ->
					spyOn(@epubController.savePosition, "apply")
					spyOn(@epubController.setMetaSize, "apply")
					@epubController.trigger("change:spine_position")
					expect(@epubController.savePosition.apply).toHaveBeenCalled()
					expect(@epubController.setMetaSize.apply).toHaveBeenCalled()

	
	describe "defaults", ->

		beforeEach ->
			@epub = new Readium.Models.EPUB({"package_doc_path": "some/file/path"})
			@epubController = new Readium.Models.EPUBController({"epub" : @epub})

		it 'correctly sets default attributes', ->
			expect(@epubController.get("font_size")).toEqual(10)
			expect(@epubController.get("two_up")).toEqual(false)
			expect(@epubController.get("full_screen")).toEqual(false)
			expect(@epubController.get("toolbar_visible")).toEqual(true)
			expect(@epubController.get("toc_visible")).toEqual(false)
			expect(@epubController.get("rendered_spine_items")).toEqual([])
			expect(@epubController.get("current_theme")).toEqual("default-theme")
			expect(@epubController.get("current_margin")).toEqual(3)

	
	describe "toJSON", ->

		beforeEach ->
			@epub = new Readium.Models.EPUB({"package_doc_path": "some/file/path"})
			@epubController = new Readium.Models.EPUBController({"epub" : @epub})

		it 'does not serialize attributes that should not be presisted', ->
			@epubController.set("rendered_spine_items", [1, 2, 3])
			@epubController.set("spine_index", [1])
			json = @epubController.toJSON()
			expect(json.rendered_spine_items).not.toBeDefined()
			expect(json.spine_index).not.toBeDefined()

		it 'serializes attributes that should be persisted', ->
			@epubController.set("key", "alksjflkasd")
			@epubController.set("updated_at", "alksdjfs")
			json = @epubController.toJSON()
			expect(json.current_theme).toBeDefined()
			expect(json.updated_at).toBeDefined()
			expect(json.current_margin).toBeDefined()
			expect(json.font_size).toBeDefined()
			expect(json.two_up).toBeDefined()
			expect(json.key).toBeDefined()
