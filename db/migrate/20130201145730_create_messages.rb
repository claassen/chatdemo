class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :to
      t.string :from
      t.string :message
      t.boolean :received

      t.timestamps
    end
  end
end
