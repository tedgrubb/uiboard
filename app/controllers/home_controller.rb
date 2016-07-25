class HomeController < ApplicationController
  def index
    @captures = Capture.published
  end
end