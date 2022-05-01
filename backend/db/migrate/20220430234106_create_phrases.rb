class CreatePhrases < ActiveRecord::Migration[6.1]
  def change
    create_table :phrases do |t|
      t.integer :user_id, null: false
      t.string :english, null: false
      t.string :japanese, null: false

      t.timestamps
    end
  end
end
