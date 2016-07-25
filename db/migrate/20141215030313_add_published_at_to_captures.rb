class AddPublishedAtToCaptures < ActiveRecord::Migration
  def change
    add_column :captures, :published_at, :datetime
  end
end
