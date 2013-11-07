stubFileSystem = function() {

	Readium.FileSystemApi = function(initCallback) {
		
		
		var api = {
			
			writeFile: function(path, content, successCallback, failureCallback) {
				successCallback({});
			},
			
			getFileSystem: function() {
				return {};
			},

			readEntry: function(entry, readCallback, errorCallback) {
				
				readCallback( "", {} );
			},
			
			readTextFile: function(path, readCallback, errorCallback) {
				readCallback( "", {} );
			},
	 		
			rmdir: function( path ) {
				
			},

			getFsUri: function(path, win, fail) {
				win("some/url")
			},
			
			// recursively create dirs from an array of dir names
			mkdir: function(rootDirEntry, folders) {

			},
			
			// TODO should be able to hide this function
			genericFsErrorHandler: function() {
				console.log("in the stubbed out error handler");
			}
		};


		return function ( callback ) {
			
			callback(api);
			return api;
			
		};
		
	};

}