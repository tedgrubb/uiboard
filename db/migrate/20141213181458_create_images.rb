class CreateImages < ActiveRecord::Migration
  def change
    enable_extension 'uuid-ossp'

    create_table :images, id: :uuid do |t|
      t.string :file_uid
      t.integer :index
      t.uuid :capture_id
      t.foreign_key :captures
      t.timestamps
    end
  end
end
