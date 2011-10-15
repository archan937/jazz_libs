require "thor/shell/basic"
require "fileutils"

module JazzLibs
  class CLI < Thor
    class Generator < Thor
      include Thor::Actions

      def self.source_root
        File.expand_path "../../../../templates", __FILE__
      end

      no_tasks do
        def run(repository)
          ask_for_locals :repository => repository, :now => Time.now
          create_lib_directory
          install_default_files
        end
      end

    private

      def ask_for_locals(defaults)
        @locals = defaults.dup

        @locals[:name] = ask "What is the (non-underscored) name of the Javascript library?"
        raise Error, "Invalid library name" if name.empty?

        @locals[:file_name]         = repository.gsub(/\.js$/, "") + ".js"
        @locals[:class_name]        = camelize repository.gsub(/\.js$/, "")

        @locals[:small_description] = ask    "Describe the Javascript library in one sentence:"
        @locals[:jquery]            = agree? "Do you want to include jQuery to your library?", :no
        @locals[:author]            = ask    "What is your full name?"
        @locals[:email]             = ask    "What is your email address?"
        @locals[:github]            = ask    "What is your Github name?"
        @locals[:twitter]           = ask    "What is your Twitter name? (press Enter to skip)"
        @locals[:company]           = ask    "What is your company name? (press Enter to skip)"

        @locals[:company_url] = begin
          company.empty? ? "" : ask("What is your company URL? (press Enter to skip)")
        end

        unless company_url.blank? || company_url.match(/^https?:\/\/\w+/)
          @locals[:company_url] = "http://#{company_url}"
        end
      end

      def create_lib_directory
        self.destination_root = File.expand_path "./#{repository}"

        if File.exists? self.destination_root
          if agree? "The directory '#{name}' already exists. Do you want to replace it?", :no
            FileUtils.rm_r self.destination_root, :force => true
          else
            raise Error, "Aborting..."
          end
        end

        FileUtils.mkdir self.destination_root
      end

      def install_default_files
        template  "CHANGELOG.rdoc"
        template  "MIT-LICENSE"
        template  "Rakefile"
        template  "README.textile"
        template  "VERSION"
        directory "demo"
        directory "lib"
        template  "demo/index.html", :force => true
        directory "src/jquery" if jquery
        template  "src/lib.js", File.expand_path("src/#{file_name}", self.destination_root)

        execute  "git init"
        template "gitignore", ".gitignore"
        execute  "git add -A"
      end

      def thor_shell
        @thor_shell ||= Thor::Shell::Basic.new
      end

      def is?(*args)
        thor_shell.send :is?, *args
      end

      def ask(question, opts = nil, default = nil)
        in_brackets = [opts, default].compact.first
        statement   = [question, ("[#{in_brackets}]" unless in_brackets.nil?)].compact.join " "
        answer      = thor_shell.ask statement.yellow
        answer.nil? || answer.empty? ? default.to_s : answer
      rescue Interrupt
        puts ""
        exit
      end

      def agree?(question, default = nil)
        opts   = %w(y n).collect{|x| !default.nil? && x =~ is?(default) ? x.upcase : x}
        answer = ask question, opts, default
        !!(answer =~ is?(:yes))
      end

      def execute(command)
        `cd #{self.destination_root} && #{command}`
      end

      def camelize(lower_case_and_underscored_word, first_letter_in_uppercase = true)
        if first_letter_in_uppercase
          lower_case_and_underscored_word.to_s.gsub(/\/(.?)/) { "::#{$1.upcase}" }.gsub(/(?:^|_)(.)/) { $1.upcase }
        else
          lower_case_and_underscored_word.to_s[0].chr.downcase + camelize(lower_case_and_underscored_word)[1..-1]
        end
      end

      def method_missing(method, *args)
        if @locals && @locals.include?(method.to_sym)
          @locals[method.to_sym]
        else
          puts caller
          super
        end
      end

    end
  end
end