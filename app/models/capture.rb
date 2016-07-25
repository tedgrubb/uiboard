class Capture < ActiveRecord::Base
  has_many :images, -> { order(:index) }
  accepts_nested_attributes_for :images

  default_scope { order("created_at") }
  scope :published, -> { where.not(published_at: nil).order('published_at DESC') }

  before_save :set_published_at

private

  def set_published_at
    return if self.new_record?
    self.published_at ||= Time.now
  end
end