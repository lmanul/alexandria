Factory = {}

// Simple way to 
Factory.create = function(type) {

	if(type === "ebook") {
		return new Readium.Models.EPUBController({"package_doc_path": "something"});
	}

}

Factory.spy = function(type) {

	if(type === "package_document") {
		return {
			initialize: jasmine.createSpy(),
			fetch: jasmine.createSpy(),
		    onSpinePosChanged: jasmine.createSpy(),
			validate: jasmine.createSpy(),
			sync: jasmine.createSpy(),
			getManifestItemById: jasmine.createSpy(),
			getSpineItem: jasmine.createSpy(),
			spineLength: jasmine.createSpy(),
			goToNextSection: jasmine.createSpy(),
			goToPrevSection: jasmine.createSpy(),
			spineIndexFromHref: jasmine.createSpy(),
			goToHref: jasmine.createSpy(),
			getTocItem: jasmine.createSpy(),
			getMediaOverlayItem: jasmine.createSpy(),
			parse: jasmine.createSpy()
		};
	}

}
