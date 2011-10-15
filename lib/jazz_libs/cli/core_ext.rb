Dir["#{File.dirname(__FILE__)}/core_ext/*.rb"].sort.each do |file|
  require file
end