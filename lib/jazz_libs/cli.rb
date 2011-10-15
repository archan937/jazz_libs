require "thor"
require "rich/support/core/string/colorize"

require "jazz_libs/cli/core_ext"
require "jazz_libs/cli/generator"
require "jazz_libs/version"

module JazzLibs
  class CLI < Thor

    class Error < StandardError; end

    desc "new REPO", "Generate a Javascript library (specify the repository name)"
    method_options [:verbose, "-v"] => false
    def new(repository)
      Generator.new.run repository
    end

  private

    def method_missing(method, *args)
      raise Error, "Unrecognized command \"#{method}\". Please consult `jazz help`."
    end

  end
end