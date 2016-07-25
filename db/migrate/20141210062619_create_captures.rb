class CreateCaptures < ActiveRecord::Migration
  def change
    enable_extension 'uuid-ossp'

    create_table :captures, id: :uuid do |t|
      t.string  :title, limit: 500
      t.string  :description, limit: 1000
      t.string  :url, limit: 1000
      t.timestamps
    end
  end
end