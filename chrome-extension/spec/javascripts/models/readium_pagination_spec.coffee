
describe "Readium.Models.ReadiumPagination", ->

	describe "defaults", ->

		beforeEach ->
			@epub = new Readium.Models.EPUB({"package_doc_path": "some/file/path"})
			@epubController = new Readium.Models.EPUBController({"epub" : @epub})
			@pagination = new Readium.Models.ReadiumPagination({"model" : @epubController})

		it 'correctly sets default attributes', ->
			expect(@pagination.get("num_pages")).toEqual(0)

	describe 'traversing pages', ->

		beforeEach ->
			@packageDocument = Factory.spy("package_document")
			spyOn(Readium.Models, "PackageDocument").andReturn(@packageDocument)
			@epub = new Readium.Models.EPUB({"package_doc_path": "some/file/path"})
			@epubController = new Readium.Models.EPUBController({"epub" : @epub})
			@pages = new Readium.Models.ReadiumPagination({"model" : @epubController})

		
		describe 'reflowable section in one up', ->

			beforeEach ->
				section =
					isFixedLayout: -> false
				@pages.set
					num_pages: 10
					current_page: [2]
				@epubController.set
					two_up: false
				spyOn(@epubController, "getCurrentSection").andReturn(section)

			
			describe "nextPage()", ->		

				it 'increments the page number if there are more pages', ->
					@pages.nextPage()
					expect(@pages.get("current_page")).toEqual([3])

				it 'calls goToNextSection if there are no more pages', ->
					@pages.set("num_pages", 1)
					spyOn(@epubController, "goToNextSection")
					@pages.nextPage()
					expect(@pages.get("current_page")).toEqual([1])
					expect(@epubController.goToNextSection).toHaveBeenCalled()

			
			describe "prevPage()", ->

				it 'decrements the page number if there are more pages', ->
					@pages.prevPage()
					expect(@pages.get("current_page")).toEqual([1])

				it 'calls goToPrevSection from page one', ->
					@pages.set("current_page", [1])
					spyOn(@epubController, "goToPrevSection")
					@pages.prevPage()
					expect(@pages.get("current_page")).toEqual([1])
					expect(@epubController.goToPrevSection).toHaveBeenCalled()

			describe "toggleTwoUp()", ->

				# TODO: Tests for toggling two_up
		
		describe "reflowable section in two up", ->

			beforeEach ->
				section =
					isFixedLayout: -> false
				@pages.set
					num_pages: 10
					current_page: [3,4]
				@epubController.set
					two_up: true
				spyOn(@epubController, "getCurrentSection").andReturn(section)

			
			describe "nextPage()", ->

				it 'increments both page numbers if there are more pages', ->
					@pages.nextPage()
					expect(@pages.get("current_page")).toEqual([5,6])

				it 'calls goToNextSection if there are no more pages', ->
					@pages.set("num_pages", 4)
					spyOn(@epubController, "goToNextSection")
					@pages.nextPage()
					expect(@epubController.goToNextSection).toHaveBeenCalled()

			describe "prevPage()", ->

				it 'decrements both page numbers if there are more pages', ->
					@pages.set("current_page", [3, 4])
					@pages.prevPage()
					expect(@pages.get("current_page")).toEqual([1,2])

				it 'calls goToPrevSection if at the beginning', ->
					@pages.set("current_page", [1,2])
					spyOn(@epubController, "goToPrevSection")
					@pages.prevPage()
					expect(@epubController.goToPrevSection).toHaveBeenCalled()
