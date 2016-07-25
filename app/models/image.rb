class Image < ActiveRecord::Base
  dragonfly_accessor :file

  belongs_to :capture
end