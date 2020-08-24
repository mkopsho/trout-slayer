class CreateMarkers < ActiveRecord::Migration[6.0]
  def change
    create_table :markers do |t|
      t.string :name
      t.string :description
      t.decimal :lat, {:precision=>10, :scale=>6} # https://developers.google.com/maps/documentation/javascript/mysql-to-maps
      t.decimal :long, {:precision=>10, :scale=>6}

      t.timestamps
    end
  end
end
