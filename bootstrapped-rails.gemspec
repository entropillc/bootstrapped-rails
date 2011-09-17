# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "bootstrapped-rails/version"

Gem::Specification.new do |s|
  s.name        = "bootstrapped-rails"
  s.version     = Bootstrapped::Rails::VERSION
  s.authors     = ["Nicholas W. Watson"]
  s.email       = ["nick@entropi.co"]
  s.summary     = %q{Bootstrap, Generators, JQuery, Oh My!}
  s.description = %q{A gem containing Twitter's Bootstrap CSS Project, a JQuery Plugin to simply user interface interactivity, and generators to make scaffolds sexy.}

  s.rubyforge_project = "bootstrapped-rails"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  
  s.require_paths = Dir["{lib,features,vendor}/**/*", "[A-Z]*"]

  s.add_dependency "railties", "~> 3.1.0"
  s.add_dependency "jquery-rails", "~> 1.0.14"
  s.add_development_dependency 'rspec-rails', '~> 2.6.1'
  s.add_development_dependency 'cucumber', '~> 1.0.6'
  s.add_development_dependency 'rails', '~> 3.1.0'
  s.add_development_dependency 'mocha', '~> 0.10.0'
  s.add_development_dependency 'sqlite3-ruby', '~> 1.3.1'
  s.add_development_dependency "bundler", "~> 1.0.0"
  
end
