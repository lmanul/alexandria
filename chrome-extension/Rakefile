# load in the config file
require './build/default_config.rb'
require 'coffee-script'

# load in custom config file if it exists
if File.exists? './build/custom_config.rb'
	require './build/custom_config.rb'
end

# stuff for jasmine
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

namespace :spec do
	desc "unhipsterify the *.coffee scripts into normal js scripts"
	task :compile do
		coffee_files = Dir.glob File.join(".", "spec", "javascripts", "**", "*.coffee")
		coffee_files.each do |coffee_path| 
			# this might not be the most robust way to do this, but think it does the job
			js_path = coffee_path.gsub ".coffee", ".js"
			puts "dehipsterifying #{coffee_path} => #{js_path}"
			File.open js_path, "w" do |f|
				f.puts CoffeeScript.compile File.read(coffee_path)
			end
		end
	end
end

task :spec => ["spec:compile", "jasmine"]

task :server do
	`thin -R static.ru start`
end

task :styles  do
	`sass --watch css/sass:css -r ./css/sass/bourbon/lib/bourbon.rb`
end

desc "generate annotated source code with docco"
task :docs do
	puts "docco-ing the docs"
	puts `docco scripts/**/*.js`
	puts "the docs have been docco-ed"
end

namespace :handlebars do

	desc "precompile all the handlebars templates"
	task :compile do
		puts "precompiling all .handlebars files in scripts/templates"
		`handlebars scripts/templates/*.handlebars -f scripts/templates.js`
	end

end

namespace :site do

	desc "pushes out the website using the contents of :publish dir via push to :gh-pages branch"
	task :deploy do
		# make sure we don't delete anything we didnt want to
		to_keep = [ ".", "..", ".git", ".gitignore" ]
		to_keep << @config[:publish_dir]
		to_keep = to_keep + @config[:web_keeps]

		# delete the local branch
		`git branch -D gh-pages`

		# checkout a fresh copy of the branch
		`git checkout -b gh-pages`

		# delete everything we haven't explicitly set to keep
		Dir.foreach(".") do |x| 
			unless to_keep.include? x
				FileUtils.rm_rf x
			end
		end

		# cp everything from the publish dir up one step
		Dir.foreach(@config[:publish_dir]) do |x| 
			current_path = File.join @config[:publish_dir], x
			FileUtils.cp_r current_path, x unless x == '.' ||  x == '..'
		end

		# delete the publish dir
		FileUtils.rm_rf @config[:publish_dir]

		# commit the state of the directory
		`git add .`
		`git add -u`
		`git commit -m 'deploying'`

		# destroy the remote branch
		`git push origin :gh-pages`

		# push up the new remote branch
		`git push origin gh-pages`

		# checkout the master branch
		`git checkout master`

		puts "The app has been deployed successfully!"
	end

end


load 'build/build.rake'

task :deploy => ["build", "docs", "site:deploy"]
