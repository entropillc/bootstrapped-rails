module Bootstrapped
  module Rails
    if ::Rails.version < "3.1"
      require "bootstrapped-rails/railtie"
    else
      require "bootstrapped-rails/engine"
    end
  end
end