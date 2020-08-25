class CreateMarkers < ActiveRecord::Migration[6.0]
  def change
    create_table :markers do |t|
      t.string :title
      t.string :description
      t.string :fish_type
      t.string :weather_conditions
      t.string :lure_and_bait
      t.decimal :lat, {:precision=>10, :scale=>6} # https://developers.google.com/maps/documentation/javascript/mysql-to-maps
      t.decimal :long, {:precision=>10, :scale=>6}
      t.integer :user_id

      t.timestamps
    end
  end
end
