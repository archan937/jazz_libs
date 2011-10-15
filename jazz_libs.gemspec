# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "jazz_libs/version"

Gem::Specification.new do |s|
  s.name        = "jazz_libs"
  s.version     = JazzLibs::VERSION::STRING
  s.authors     = ["Paul Engel"]
  s.email       = ["paul.engel@holder.nl"]
  s.homepage    = "https://github.com/archan937/jazz_libs"
  s.summary     = %q{A small gem for rolling out JS libraries (includes repository, demo page and version release rake task)}
  s.description = %q{A small gem for rolling out JS libraries (includes repository, demo page and version release rake task)}

  s.rubyforge_project = "jazz_libs"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_dependency "rich_support", "~> 0.1.2"
  s.add_dependency "thor"        , "~> 0.14.6"
end
